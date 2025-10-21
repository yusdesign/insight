import { stemmer } from 'stemmer';

export class InsightPredictor {
  constructor(config = {}) {
    this.config = config;
    this.similarityCache = new Map();
  }

  async predict(code, context = {}) {
    try {
      const features = this.extractPredictionFeatures(code);
      const patterns = this.extractPredictionPatterns(code);
      
      // Analyze code structure and content
      const analysis = this.analyzeCodeStructure(code);
      const purposePrediction = this.predictPurpose(features, patterns);
      const issuePrediction = this.predictPotentialIssues(features, analysis);
      
      // Ensure confidence is always defined
      const confidence = this.calculatePredictionConfidence(
        purposePrediction.confidence || 0.1, 
        issuePrediction.confidence || 0.1
      );
      
      return {
        prediction: purposePrediction.category || 'unknown',
        confidence: confidence,
        purpose: purposePrediction,
        potentialIssues: issuePrediction.issues || [],
        alternativePredictions: this.generateAlternatives(purposePrediction, features) || [],
        reasons: this.generatePredictionReasons(features, patterns) || ['Analysis completed'],
        analysis: analysis
      };
    } catch (error) {
      console.error('Prediction error:', error);
      // Return a safe fallback
      return {
        prediction: 'unknown',
        confidence: 0.1,
        purpose: { category: 'unknown', confidence: 0.1 },
        potentialIssues: [],
        alternativePredictions: [],
        reasons: ['Analysis failed'],
        analysis: {}
      };
    }
  }

  extractPredictionFeatures(code) {
    return {
      structure: {
        hasImports: /import|require/.test(code),
        hasExports: /export|module\.exports/.test(code),
        hasClasses: /class|constructor/.test(code),
        hasAsync: /async|await/.test(code),
        hasErrorHandling: /try|catch/.test(code)
      },
      metrics: {
        lineCount: code.split('\n').length,
        functionCount: (code.match(/function|=>/g) || []).length,
        commentDensity: this.calculateCommentDensity(code),
        complexity: this.calculateSimpleComplexity(code)
      },
      content: {
        hasDOM: /document|window|getElement/.test(code),
        hasNetwork: /fetch|axios|http/.test(code),
        hasStorage: /localStorage|sessionStorage|database/.test(code),
        hasCalculations: /[\+\-\*\/]=|Math\./.test(code)
      }
    };
  }

  extractPredictionPatterns(code) {
    const patterns = [];
    
    // Detect common programming patterns
    if (/function\s+factory|create\w+\(/.test(code)) {
      patterns.push({ type: 'factory-pattern', confidence: 0.8 });
    }
    
    if (/\.then\(.*\.catch\(|async.*await/.test(code)) {
      patterns.push({ type: 'async-pattern', confidence: 0.7 });
    }
    
    if (/addEventListener|\.on\(|\.emit\(/.test(code)) {
      patterns.push({ type: 'event-pattern', confidence: 0.6 });
    }
    
    if (/class.*{.*constructor/.test(code)) {
      patterns.push({ type: 'class-pattern', confidence: 0.9 });
    }
    
    if (/map\(.*=>|filter\(.*=>|reduce\(/.test(code)) {
      patterns.push({ type: 'functional-pattern', confidence: 0.7 });
    }
    
    return patterns;
  }
  
  calculatePurposeConfidence(primaryPurpose, patterns) {
    let confidence = primaryPurpose.confidence;
    
    // Boost confidence if we have supporting patterns
    if (patterns.length > 0) {
      const patternConfidence = patterns.reduce((sum, pattern) => 
        sum + pattern.confidence, 0
      ) / patterns.length;
      confidence = (confidence + patternConfidence) / 2;
    }
    
    return Math.min(confidence, 0.95);
  }
  
  predictPurpose(features, patterns) {
    const purposeScores = {
      'data-processing': 0.3,  // Base scores to ensure minimum confidence
      'ui-rendering': 0.3,
      'api-communication': 0.3,
      'utility': 0.3,
      'validation': 0.3,
      'transformation': 0.3
    };
    
    // Score based on features - boost these significantly
    if (features.content.hasDOM) purposeScores['ui-rendering'] += 0.5;
    if (features.content.hasNetwork) purposeScores['api-communication'] += 0.6;
    if (features.content.hasCalculations) purposeScores['data-processing'] += 0.4;
    if (features.content.hasStorage) purposeScores['data-processing'] += 0.3;
    if (features.content.hasValidation) purposeScores['validation'] += 0.5;
    if (features.content.hasTransformation) purposeScores['transformation'] += 0.4;
    
    // Score based on patterns
    patterns.forEach(pattern => {
      if (pattern.type === 'async-pattern') purposeScores['api-communication'] += 0.4;
      if (pattern.type === 'functional-pattern') purposeScores['data-processing'] += 0.3;
      if (pattern.type === 'creation') purposeScores['data-processing'] += 0.2;
    });
    
    // Find highest scoring purpose
    let maxScore = 0;
    let primaryPurpose = 'utility';
    
    for (const [purpose, score] of Object.entries(purposeScores)) {
      if (score > maxScore) {
        maxScore = score;
        primaryPurpose = purpose;
      }
    }
    
    return {
      category: primaryPurpose,
      confidence: Math.min(maxScore, 0.95),
      scores: purposeScores
    };
  }

  predictPotentialIssues(features, analysis) {
    const issues = [];
    
    if (analysis.complexity > 0.7) {
      issues.push({
        type: 'high-complexity',
        description: 'Code may be overly complex',
        severity: 'medium',
        confidence: 0.7
      });
    }
    
    if (features.metrics.lineCount > 100) {
      issues.push({
        type: 'long-file',
        description: 'File is quite long, consider splitting',
        severity: 'low',
        confidence: 0.6
      });
    }
    
    if (analysis.nestingDepth > 4) {
      issues.push({
        type: 'deep-nesting',
        description: 'Deep nesting makes code hard to read',
        severity: 'medium',
        confidence: 0.8
      });
    }
    
    return {
      issues,
      hasIssues: issues.length > 0,
      severity: issues.length > 0 ? 
        Math.max(...issues.map(i => i.severity === 'high' ? 1 : i.severity === 'medium' ? 0.7 : 0.4)) : 0
    };
  }

  async calculateSimilarity(code1, code2) {
    const cacheKey = `${this.simpleHash(code1)}:${this.simpleHash(code2)}`;
    
    if (this.similarityCache.has(cacheKey)) {
      return this.similarityCache.get(cacheKey);
    }
    
    const features1 = this.extractSimilarityFeatures(code1);
    const features2 = this.extractSimilarityFeatures(code2);
    
    const structuralSimilarity = this.calculateStructuralSimilarity(code1, code2);
    const featureSimilarity = this.calculateFeatureSetSimilarity(features1, features2);
    const patternSimilarity = this.calculatePatternSimilarity(code1, code2);
    
    const overallSimilarity = (structuralSimilarity + featureSimilarity + patternSimilarity) / 3;
    
    this.similarityCache.set(cacheKey, overallSimilarity);
    
    return overallSimilarity;
  }

  async generateSuggestions(code, category) {
    const suggestions = [];
    const analysis = this.analyzeCodeStructure(code);
    
    // General suggestions based on code analysis
    if (analysis.complexity > 0.8) {
      suggestions.push({
        type: 'simplify',
        description: 'Consider breaking down complex logic into smaller functions',
        confidence: 0.8,
        priority: 'high'
      });
    }
    
    if (analysis.nestingDepth > 3) {
      suggestions.push({
        type: 'reduce-nesting',
        description: 'Reduce nested conditions for better readability',
        confidence: 0.7,
        priority: 'medium'
      });
    }
    
    if (analysis.commentDensity < 0.1) {
      suggestions.push({
        type: 'add-comments',
        description: 'Add comments to explain complex logic',
        confidence: 0.6,
        priority: 'low'
      });
    }
    
    // Category-specific suggestions
    if (category === 'api-communication') {
      suggestions.push({
        type: 'error-handling',
        description: 'Add error handling for API calls',
        confidence: 0.9,
        priority: 'high'
      });
    }
    
    if (category === 'data-processing') {
      suggestions.push({
        type: 'validation',
        description: 'Add input validation for data processing',
        confidence: 0.7,
        priority: 'medium'
      });
    }
    
    return suggestions.slice(0, 5); // Return top 5 suggestions
  }

  async extractPatternInsights(code, patterns = []) {
    const insights = [];
    const features = this.extractPredictionFeatures(code);
    
    // Structural insights
    if (features.metrics.lineCount > 50) {
      insights.push({
        category: 'structure',
        type: 'file-size',
        insight: 'This is a substantial piece of code with multiple responsibilities',
        confidence: 0.7,
        impact: 'medium'
      });
    }
    
    if (features.structure.hasAsync) {
      insights.push({
        category: 'performance',
        type: 'async-operations',
        insight: 'Uses asynchronous operations, consider error handling',
        confidence: 0.8,
        impact: 'high'
      });
    }
    
    // Pattern-based insights
    patterns.forEach(pattern => {
      if (pattern.type === 'factory-pattern') {
        insights.push({
          category: 'design',
          type: 'creation-pattern',
          insight: 'Uses factory pattern for object creation',
          confidence: 0.9,
          impact: 'medium'
        });
      }
    });
    
    return insights;
  }

  // Helper methods
  calculateCommentDensity(code) {
    const lines = code.split('\n');
    const commentLines = lines.filter(line => 
      line.trim().startsWith('//') || line.includes('/*')
    ).length;
    return lines.length > 0 ? commentLines / lines.length : 0;
  }

  calculateSimpleComplexity(code) {
    const decisionPoints = (code.match(/(if|else|case|\?|&&|\|\|)/g) || []).length;
    const loops = (code.match(/(for|while|forEach)/g) || []).length;
    return Math.min((decisionPoints + loops) / 10, 1.0);
  }

  analyzeCodeStructure(code) {
    return {
      complexity: this.calculateSimpleComplexity(code),
      nestingDepth: this.calculateNestingDepth(code),
      commentDensity: this.calculateCommentDensity(code),
      lineCount: code.split('\n').length
    };
  }

  calculateNestingDepth(code) {
    let maxDepth = 0;
    let currentDepth = 0;
    for (const char of code) {
      if (char === '{') {
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);
      } else if (char === '}') {
        currentDepth--;
      }
    }
    return maxDepth;
  }

  calculatePredictionConfidence(...confidences) {
    const avg = confidences.reduce((a, b) => a + b, 0) / confidences.length;
    return Math.min(avg * 1.1, 0.95);
  }

  generateAlternatives(primaryPrediction, features) {
    const alternatives = [];
    const { scores } = primaryPrediction;
    
    for (const [purpose, score] of Object.entries(scores)) {
      if (purpose !== primaryPrediction.category && score > 0.3) {
        alternatives.push({
          purpose,
          confidence: score,
          reason: `Shares characteristics with ${purpose} code`
        });
      }
    }
    
    return alternatives.slice(0, 3);
  }

  generatePredictionReasons(features, patterns) {
    const reasons = [];
    
    if (features.content.hasNetwork) {
      reasons.push('Contains network communication patterns');
    }
    
    if (features.content.hasDOM) {
      reasons.push('Interacts with DOM elements');
    }
    
    if (patterns.some(p => p.type === 'functional-pattern')) {
      reasons.push('Uses functional programming patterns');
    }
    
    return reasons.length > 0 ? reasons : ['General utility code patterns detected'];
  }

  extractSimilarityFeatures(code) {
    const clean = code.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '');
    const words = clean.toLowerCase().split(/\W+/).filter(w => w.length > 2);
    return {
      wordSet: new Set(words),
      structure: this.extractPredictionFeatures(code),
      length: code.length
    };
  }

  calculateStructuralSimilarity(code1, code2) {
    const lines1 = code1.split('\n');
    const lines2 = code2.split('\n');
    
    const commonLines = lines1.filter(line => 
      lines2.some(l2 => this.normalizeLine(line) === this.normalizeLine(l2))
    ).length;
    
    return commonLines / Math.max(lines1.length, lines2.length);
  }

  calculateFeatureSetSimilarity(features1, features2) {
    const intersection = [...features1.wordSet].filter(x => features2.wordSet.has(x)).length;
    const union = new Set([...features1.wordSet, ...features2.wordSet]).size;
    return union > 0 ? intersection / union : 0;
  }

  calculatePatternSimilarity(code1, code2) {
    const patterns1 = this.extractPredictionPatterns(code1);
    const patterns2 = this.extractPredictionPatterns(code2);
    
    const commonPatterns = patterns1.filter(p1 => 
      patterns2.some(p2 => p1.type === p2.type)
    ).length;
    
    return commonPatterns / Math.max(patterns1.length, patterns2.length, 1);
  }

  normalizeLine(line) {
    return line.trim().replace(/\s+/g, ' ').toLowerCase();
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }
}
