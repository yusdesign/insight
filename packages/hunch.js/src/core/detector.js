export class AnomalyDetector {
  constructor(config = {}) {
    this.config = config;
    this.smellPatterns = this.initializeSmellPatterns();
    this.complexityThresholds = {
      cyclomatic: config.cyclomaticThreshold || 10,
      cognitive: config.cognitiveThreshold || 15,
      maxNesting: config.nestingThreshold || 4,
      maxLines: config.lineThreshold || 50
    };
    
    console.log('🔧 AnomalyDetector initialized (Lightweight Mode)');
  }

  initializeSmellPatterns() {
    return {
      'long-method': {
        pattern: /function\s+\w+\([^)]*\)\s*{[\s\S]{300,}?}/,
        description: 'Function is too long and complex',
        severity: 'medium',
        weight: 0.8
      },
      'deep-nesting': {
        pattern: /(\{[\s\S]*?\{[\s\S]*?\{[\s\S]*?\{[\s\S]*?\})/,
        description: 'Code has too many nested levels',
        severity: 'high',
        weight: 0.9
      },
      'magic-numbers': {
        pattern: /\b(\d{3,}|0x[0-9a-fA-F]{3,})\b/,
        description: 'Magic numbers without explanation',
        severity: 'low',
        weight: 0.5
      },
      'duplicate-code': {
        pattern: /(.{30,}?)\1/,
        description: 'Potential code duplication',
        severity: 'medium',
        weight: 0.7
      },
      'complex-condition': {
        pattern: /(if|while)\s*\([^)]{100,}\)/,
        description: 'Overly complex conditional logic',
        severity: 'medium',
        weight: 0.6
      },
      'too-many-params': {
        pattern: /function\s+\w+\([^)]{50,}\)/,
        description: 'Function has too many parameters',
        severity: 'low',
        weight: 0.4
      }
    };
  }

  async detectAnomalies(code, context = {}) {
    const anomalies = [];
    
    // Check for code smells using patterns
    const smellAnomalies = this.detectSmellPatterns(code);
    anomalies.push(...smellAnomalies);

    // Analyze complexity
    const complexity = this.analyzeComplexity(code);
    const complexityAnomalies = this.detectComplexityIssues(complexity);
    anomalies.push(...complexityAnomalies);

    return {
      anomalies: anomalies,
      summary: this.generateSummary(anomalies),
      confidence: this.calculateOverallConfidence(anomalies),
      complexity: complexity
    };
  }

  detectSmellPatterns(code) {
    const anomalies = [];
    
    for (const [smellType, patternConfig] of Object.entries(this.smellPatterns)) {
      const matches = this.detectPattern(code, patternConfig.pattern);
      if (matches.length > 0) {
        anomalies.push({
          type: smellType,
          description: patternConfig.description,
          severity: patternConfig.severity,
          confidence: this.calculateSmellConfidence(matches.length, code.length),
          matches: matches.length,
          locations: this.findLocations(code, patternConfig.pattern),
          weight: patternConfig.weight
        });
      }
    }
    
    return anomalies;
  }

  detectComplexityIssues(complexity) {
    const anomalies = [];
    
    if (complexity.cyclomatic > this.complexityThresholds.cyclomatic) {
      anomalies.push({
        type: 'high-complexity',
        description: `Cyclomatic complexity too high: ${complexity.cyclomatic}`,
        severity: 'high',
        confidence: 0.8,
        matches: 1,
        weight: 0.9
      });
    }
    
    if (complexity.cognitive > this.complexityThresholds.cognitive) {
      anomalies.push({
        type: 'high-cognitive',
        description: `Cognitive complexity too high: ${complexity.cognitive}`,
        severity: 'medium',
        confidence: 0.7,
        matches: 1,
        weight: 0.7
      });
    }
    
    if (complexity.maxNesting > this.complexityThresholds.maxNesting) {
      anomalies.push({
        type: 'deep-nesting',
        description: `Nesting depth too deep: ${complexity.maxNesting}`,
        severity: 'medium',
        confidence: 0.6,
        matches: 1,
        weight: 0.6
      });
    }
    
    return anomalies;
  }

  analyzeComplexity(code) {
    const lines = code.split('\n').length;
    const nesting = this.calculateNestingDepth(code);
    const decisionPoints = (code.match(/(if|else|case|default|\?|&&|\|\|)/g) || []).length;
    
    return {
      cyclomatic: decisionPoints + 1,
      cognitive: nesting * 2 + decisionPoints,
      lineCount: lines,
      maxNesting: nesting
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

  detectPattern(code, pattern) {
    const matches = [];
    let match;
    const regex = new RegExp(pattern, 'g');
    
    while ((match = regex.exec(code)) !== null) {
      matches.push(match[0]);
    }
    
    return matches;
  }

  findLocations(code, pattern) {
    const locations = [];
    let match;
    const regex = new RegExp(pattern, 'g');
    
    while ((match = regex.exec(code)) !== null) {
      const lineNumber = code.substring(0, match.index).split('\n').length;
      locations.push({
        line: lineNumber,
        snippet: match[0].substring(0, 100) + '...'
      });
    }
    
    return locations.slice(0, 5);
  }

  calculateSmellConfidence(matchCount, codeLength) {
    const density = matchCount / (codeLength / 1000);
    return Math.min(density * 0.1, 0.95);
  }

  generateSummary(anomalies) {
    const summary = {
      total: anomalies.length,
      bySeverity: {
        high: anomalies.filter(a => a.severity === 'high').length,
        medium: anomalies.filter(a => a.severity === 'medium').length,
        low: anomalies.filter(a => a.severity === 'low').length
      },
      byType: {}
    };
    
    anomalies.forEach(anomaly => {
      summary.byType[anomaly.type] = (summary.byType[anomaly.type] || 0) + 1;
    });
    
    return summary;
  }

  calculateOverallConfidence(anomalies) {
    if (anomalies.length === 0) return 0.9;
    
    const weightedConfidence = anomalies.reduce((sum, anomaly) => {
      return sum + (anomaly.confidence * (anomaly.weight || 0.5));
    }, 0);
    
    const averageConfidence = weightedConfidence / anomalies.length;
    return Math.min(averageConfidence, 0.95);
  }
}
