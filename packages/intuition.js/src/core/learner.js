/**
 * PatternLearner - Learns and recognizes code patterns
 */
export class PatternLearner {
  constructor(options = {}) {
    this.patterns = new Map();
    this.learningRate = options.learningRate || 0.1;
    this.confidenceThreshold = options.confidenceThreshold || 0.7;
  }

  async train(examples, labels = {}) {
    const results = {
      learnedPatterns: 0,
      patterns: [],
      confidence: 0
    };

    examples.forEach((example, index) => {
      const pattern = this.extractPattern(example);
      const label = labels[index] || this.inferLabel(example);
      
      if (pattern && label) {
        this.patterns.set(label, {
          pattern,
          examples: [...(this.patterns.get(label)?.examples || []), example],
          confidence: this.updateConfidence(label, pattern),
          lastTrained: new Date()
        });
        results.learnedPatterns++;
        results.patterns.push({ 
          label, 
          pattern: JSON.stringify(pattern).slice(0, 50) + '...' 
        });
      }
    });

    results.confidence = this.calculateOverallConfidence();
    return results;
  }

  async recognize(code, context = {}) {
    const analysis = {
      recognizedPatterns: [],
      confidence: 0,
      suggestions: []
    };

    const codePattern = this.extractPattern(code);
    
    for (const [label, patternData] of this.patterns.entries()) {
      const similarity = this.calculatePatternSimilarity(codePattern, patternData.pattern);
      
      if (similarity >= this.confidenceThreshold) {
        analysis.recognizedPatterns.push({
          label,
          confidence: similarity,
          pattern: JSON.stringify(patternData.pattern).slice(0, 50) + '...',
          examples: patternData.examples.length
        });
      }
    }

    analysis.recognizedPatterns.sort((a, b) => b.confidence - a.confidence);
    analysis.confidence = analysis.recognizedPatterns.length > 0 
      ? analysis.recognizedPatterns[0].confidence 
      : 0;

    analysis.suggestions = this.generateSuggestions(code, analysis.recognizedPatterns);
    return analysis;
  }

  extractPattern(code) {
    // Extract structural pattern from code
    return {
      structure: this.extractStructure(code),
      keywords: this.extractKeywords(code),
      complexity: this.calculateComplexity(code),
      length: code.length
    };
  }

  extractStructure(code) {
    // Simplified structure extraction
    const structures = [];
    
    if (code.includes('function')) structures.push('function');
    if (code.includes('class')) structures.push('class');
    if (code.includes('=>')) structures.push('arrow-function');
    if (code.includes('import') || code.includes('require')) structures.push('module');
    if (code.includes('if') || code.includes('switch')) structures.push('conditional');
    if (code.includes('for') || code.includes('while')) structures.push('loop');
    
    return structures;
  }

  extractKeywords(code) {
    const keywords = code.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const stopWords = new Set(['function', 'const', 'let', 'var', 'return', 'if', 'else']);
    return [...new Set(keywords.filter(word => !stopWords.has(word)))].slice(0, 10);
  }

  calculateComplexity(code) {
    let complexity = 0;
    complexity += (code.match(/if|else|switch/g) || []).length;
    complexity += (code.match(/for|while|do/g) || []).length;
    complexity += (code.match(/&&|\|\|/g) || []).length;
    return complexity;
  }

  inferLabel(code) {
    const keywords = this.extractKeywords(code);
    return keywords.length > 0 ? keywords[0] + '-pattern' : 'unknown-pattern';
  }

  calculatePatternSimilarity(pattern1, pattern2) {
    let score = 0;
    
    // Structure similarity
    const structureOverlap = pattern1.structure.filter(s => 
      pattern2.structure.includes(s)
    ).length;
    score += (structureOverlap / Math.max(pattern1.structure.length, pattern2.structure.length, 1)) * 0.4;

    // Keyword similarity
    const keywordOverlap = pattern1.keywords.filter(k => 
      pattern2.keywords.includes(k)
    ).length;
    score += (keywordOverlap / Math.max(pattern1.keywords.length, pattern2.keywords.length, 1)) * 0.4;

    // Complexity similarity (normalized)
    const complexityDiff = Math.abs(pattern1.complexity - pattern2.complexity);
    score += (1 - Math.min(complexityDiff / 10, 1)) * 0.2;

    return Math.min(score, 1.0);
  }

  updateConfidence(label, pattern) {
    const existing = this.patterns.get(label);
    if (!existing) return 0.5;
    
    return Math.min(existing.confidence + this.learningRate, 1.0);
  }

  calculateOverallConfidence() {
    if (this.patterns.size === 0) return 0;
    
    let totalConfidence = 0;
    for (const pattern of this.patterns.values()) {
      totalConfidence += pattern.confidence;
    }
    
    return totalConfidence / this.patterns.size;
  }

  generateSuggestions(code, recognizedPatterns) {
    const suggestions = [];
    
    if (recognizedPatterns.length > 0) {
      suggestions.push(`This code resembles "${recognizedPatterns[0].label}" pattern`);
    }
    
    if (this.calculateComplexity(code) > 5) {
      suggestions.push('Consider simplifying complex logic');
    }
    
    return suggestions;
  }

  async suggestRefactoring(code) {
    const recognition = await this.recognize(code);
    
    return {
      originalCode: code.slice(0, 100) + '...',
      suggestions: recognition.suggestions,
      patterns: recognition.recognizedPatterns,
      refactoringConfidence: recognition.confidence
    };
  }

  getLearnedPatterns() {
    return Array.from(this.patterns.entries()).map(([label, data]) => ({
      label,
      examples: data.examples.length,
      confidence: data.confidence,
      lastTrained: data.lastTrained
    }));
  }
}
