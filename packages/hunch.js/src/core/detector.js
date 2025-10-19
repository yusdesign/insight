/**
 * AnomalyDetector - Finds code anomalies and smells
 */
export class AnomalyDetector {
  constructor(options = {}) {
    this.smellPatterns = this.loadSmellPatterns();
    this.confidenceThreshold = options.confidenceThreshold || 0.6;
  }

  loadSmellPatterns() {
    return {
      'long-method': {
        pattern: /function\s+\w+\([^)]*\)\s*\{[^}]*(?:\n[^}]*){20,}\}/,
        description: 'Method is too long and complex',
        severity: 'medium'
      },
      'deep-nesting': {
        pattern: /(\{([^{}]|(\{[^{}]*\}))*\}){5,}/,
        description: 'Code is nested too deeply',
        severity: 'high'
      },
      'magic-numbers': {
        pattern: /(?:[^\.]\b\d{3,}\b|\\b[0-9]{2,}\\b(?!\.))/,
        description: 'Magic numbers without explanation',
        severity: 'low'
      },
      'duplicate-code': {
        pattern: /(.+)(?:\r?\n|\r).*\1/,
        description: 'Potential code duplication',
        severity: 'medium'
      },
      'complex-condition': {
        pattern: /if\s*\([^)]{50,}\)/,
        description: 'Overly complex conditional logic',
        severity: 'medium'
      }
    };
  }

  async analyze(code, context = {}) {
    if (!code) {
      return { anomalies: [], confidence: 0, summary: {} };
    }

    const analysis = {
      anomalies: [],
      confidence: 0,
      summary: {
        totalAnomalies: 0,
        bySeverity: { high: 0, medium: 0, low: 0 }
      }
    };

    for (const [smellType, pattern] of Object.entries(this.smellPatterns)) {
      const matches = this.findMatches(code, pattern.pattern);
      if (matches.length > 0) {
        analysis.anomalies.push({
          type: smellType,
          description: pattern.description,
          severity: pattern.severity,
          matches: matches.length,
          confidence: this.calculateConfidence(matches.length, pattern.severity),
          examples: matches.slice(0, 3) // Show first 3 examples
        });
      }
    }

    analysis.summary.totalAnomalies = analysis.anomalies.length;
    analysis.anomalies.forEach(anomaly => {
      analysis.summary.bySeverity[anomaly.severity]++;
    });

    analysis.confidence = this.calculateOverallConfidence(analysis);
    return analysis;
  }

  async findSmells(code, smellTypes = []) {
    const analysis = await this.analyze(code);
    
    if (smellTypes.length > 0) {
      analysis.anomalies = analysis.anomalies.filter(anomaly => 
        smellTypes.includes(anomaly.type)
      );
    }

    return analysis;
  }

  findMatches(code, pattern) {
    const matches = [];
    let match;
    const regex = new RegExp(pattern, 'g');
    
    while ((match = regex.exec(code)) !== null) {
      matches.push({
        index: match.index,
        context: code.substring(
          Math.max(0, match.index - 30),
          Math.min(code.length, match.index + 50)
        )
      });
    }
    
    return matches;
  }

  calculateConfidence(matchCount, severity) {
    let baseConfidence = Math.min(matchCount * 0.3, 1.0);
    
    // Adjust by severity
    const severityMultipliers = { high: 1.2, medium: 1.0, low: 0.8 };
    return Math.min(baseConfidence * severityMultipliers[severity], 1.0);
  }

  calculateOverallConfidence(analysis) {
    if (analysis.anomalies.length === 0) return 0;
    
    const totalConfidence = analysis.anomalies.reduce(
      (sum, anomaly) => sum + anomaly.confidence, 0
    );
    
    return totalConfidence / analysis.anomalies.length;
  }
}
