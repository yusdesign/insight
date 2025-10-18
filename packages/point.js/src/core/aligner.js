export class GoalAligner {
  constructor(options = {}) {
    this.similarityThreshold = options.similarityThreshold || 0.7;
  }

  async checkAlignment(goal, code, options = {}) {
    if (!goal || !code) {
      throw new Error('Goal and code are required');
    }

    const goalKeywords = this.extractKeywords(goal);
    const codeAnalysis = this.analyzeCodeForAlignment(code);
    
    const alignmentScore = this.calculateAlignment(goalKeywords, codeAnalysis);
    const aligned = alignmentScore >= this.similarityThreshold;
    
    return {
      aligned,
      score: alignmentScore,
      matches: this.findMatches(goalKeywords, codeAnalysis),
      mismatches: this.findMismatches(goalKeywords, codeAnalysis),
      goalKeywords,
      codeAnalysis
    };
  }

  extractKeywords(goal) {
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at']);
    
    return goal.toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 2 && !stopWords.has(word));
  }

  analyzeCodeForAlignment(code) {
    return {
      functionNames: this.extractFunctionNames(code),
      variables: this.extractVariableNames(code),
      comments: this.extractComments(code)
    };
  }

  calculateAlignment(goalKeywords, codeAnalysis) {
    if (goalKeywords.length === 0) return 0;

    let matches = 0;
    const allCodeTerms = [
      ...codeAnalysis.functionNames,
      ...codeAnalysis.variables,
      ...this.extractKeywords(codeAnalysis.comments.join(' '))
    ];

    goalKeywords.forEach(keyword => {
      if (allCodeTerms.some(term => this.similarity(term, keyword) > 0.6)) {
        matches++;
      }
    });

    return matches / goalKeywords.length;
  }

  similarity(term1, term2) {
    if (term1 === term2) return 1.0;
    if (term1.includes(term2) || term2.includes(term1)) return 0.7;
    return 0;
  }

  parseComments(comments) {
    if (!comments) return [];
    
    const goals = [];
    const commentText = Array.isArray(comments) ? comments.join('\n') : comments;

    const todoMatch = commentText.match(/TODO:\s*(.+)/i);
    if (todoMatch) {
      goals.push({ type: 'todo', goal: todoMatch[1].trim() });
    }

    const fixmeMatch = commentText.match(/FIXME:\s*(.+)/i);
    if (fixmeMatch) {
      goals.push({ type: 'fixme', goal: fixmeMatch[1].trim() });
    }

    return goals;
  }

  async measureDrift(requirements, currentCode) {
    const driftAnalysis = [];
    
    for (const requirement of requirements) {
      const description = typeof requirement === 'string' ? requirement : requirement.description;
      const alignment = await this.checkAlignment(description, currentCode);
      
      if (!alignment.aligned) {
        driftAnalysis.push({
          requirement: description,
          alignmentScore: alignment.score
        });
      }
    }

    return {
      totalRequirements: requirements.length,
      misaligned: driftAnalysis.length,
      driftScore: 1 - (driftAnalysis.length / requirements.length),
      details: driftAnalysis
    };
  }

  extractFunctionNames(code) {
    const names = new Set();
    const functionPattern = /(?:function|const|let|var)\s+(\w+)/g;
    let match;
    
    while ((match = functionPattern.exec(code)) !== null) {
      names.add(match[1].toLowerCase());
    }
    
    return Array.from(names);
  }

  extractVariableNames(code) {
    const names = new Set();
    const variablePattern = /(?:const|let|var)\s+(\w+)/g;
    let match;
    
    while ((match = variablePattern.exec(code)) !== null) {
      names.add(match[1].toLowerCase());
    }
    
    return Array.from(names);
  }

  extractComments(code) {
    const comments = [];
    const commentPattern = /\/\/([^\n]*)$|\/\*([\s\S]*?)\*\//gm;
    let match;
    
    while ((match = commentPattern.exec(code)) !== null) {
      const comment = (match[1] || match[2] || '').trim();
      if (comment) comments.push(comment);
    }
    
    return comments;
  }

  findMatches(goalKeywords, codeAnalysis) {
    const matches = [];
    const allTerms = [
      ...codeAnalysis.functionNames,
      ...codeAnalysis.variables
    ];

    goalKeywords.forEach(keyword => {
      allTerms.forEach(term => {
        if (this.similarity(term, keyword) > 0.6) {
          matches.push({ goalKeyword: keyword, codeTerm: term });
        }
      });
    });

    return matches;
  }

  findMismatches(goalKeywords, codeAnalysis) {
    return goalKeywords.filter(keyword => 
      !codeAnalysis.functionNames.some(term => this.similarity(term, keyword) > 0.6) &&
      !codeAnalysis.variables.some(term => this.similarity(term, keyword) > 0.6)
    );
  }
}

