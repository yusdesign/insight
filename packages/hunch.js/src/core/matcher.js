/**
 * PatternMatcher - Identifies code patterns and architectures
 */
export class PatternMatcher {
  constructor(options = {}) {
    this.patterns = this.loadPatterns();
    this.confidenceThreshold = options.confidenceThreshold || 0.5;
  }

  loadPatterns() {
    return {
      'singleton': {
        pattern: /(?:getInstance|instance|_instance)\s*\([^)]*\)\s*\{[^}]*if\s*\(\s*!?\s*\w*[Ii]nstance[^}]*return[^}]*\}/,
        description: 'Singleton pattern implementation',
        category: 'creational'
      },
      'factory': {
        pattern: /(?:Factory|create\w+)\s*\([^)]*\)\s*\{[^}]*return\s+new\s+\w+\([^}]*\}/,
        description: 'Factory pattern implementation',
        category: 'creational'
      },
      'observer': {
        pattern: /\.(?:addEventListener|on|subscribe|listen)\(|\.(?:emit|publish|trigger|fire)\(/,
        description: 'Observer pattern implementation',
        category: 'behavioral'
      },
      'module': {
        pattern: /\(function\s*\([^)]*\)\s*\{[^}]*return[^}]*\}\s*\)\s*\([^)]*\)|export\s+default|module\.exports/,
        description: 'Module pattern implementation',
        category: 'structural'
      },
      'callback-hell': {
        pattern: /\)\s*\{[^}]*\}\s*\)\s*\{[^}]*\}\s*\)\s*\{[^}]*\}/,
        description: 'Callback hell (deep nesting of callbacks)',
        category: 'anti-pattern'
      }
    };
  }

  async matchPatterns(code, patternTypes = []) {
    if (!code) {
      return { patterns: [], confidence: 0, categories: {} };
    }

    const analysis = {
      patterns: [],
      confidence: 0,
      categories: {}
    };

    const patternsToCheck = patternTypes.length > 0 
      ? Object.entries(this.patterns).filter(([type]) => patternTypes.includes(type))
      : Object.entries(this.patterns);

    for (const [patternType, pattern] of patternsToCheck) {
      const matches = this.findPatternMatches(code, pattern.pattern);
      if (matches.length > 0) {
        analysis.patterns.push({
          type: patternType,
          description: pattern.description,
          category: pattern.category,
          matches: matches.length,
          confidence: this.calculatePatternConfidence(matches.length),
          examples: matches.slice(0, 2)
        });
      }
    }

    // Group by category
    analysis.patterns.forEach(pattern => {
      if (!analysis.categories[pattern.category]) {
        analysis.categories[pattern.category] = [];
      }
      analysis.categories[pattern.category].push(pattern);
    });

    analysis.confidence = this.calculateOverallPatternConfidence(analysis);
    return analysis;
  }

  findPatternMatches(code, pattern) {
    const matches = [];
    let match;
    
    try {
      const regex = new RegExp(pattern, 'g');
      while ((match = regex.exec(code)) !== null) {
        matches.push({
          index: match.index,
          context: code.substring(
            Math.max(0, match.index - 20),
            Math.min(code.length, match.index + 30)
          )
        });
      }
    } catch (e) {
      // If regex fails, use string includes as fallback
      if (typeof pattern === 'string' && code.includes(pattern)) {
        matches.push({
          index: code.indexOf(pattern),
          context: pattern
        });
      }
    }
    
    return matches;
  }

  calculatePatternConfidence(matchCount) {
    return Math.min(matchCount * 0.4, 1.0);
  }

  calculateOverallPatternConfidence(analysis) {
    if (analysis.patterns.length === 0) return 0;
    
    const totalConfidence = analysis.patterns.reduce(
      (sum, pattern) => sum + pattern.confidence, 0
    );
    
    return totalConfidence / analysis.patterns.length;
  }
}
