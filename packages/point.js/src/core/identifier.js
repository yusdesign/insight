export class PurposeIdentifier {
  constructor(options = {}) {
    this.patterns = this.loadPatterns();
    this.confidenceThreshold = options.confidenceThreshold || 0.3; // Lower threshold for now
  }

  loadPatterns() {
    return {
      'data-validation': {
        indicators: ['validate', 'check', 'verify', 'test', 'assert', 'regex'],
        patterns: [/if.*===/, /if.*!==/, /regex/i, /test\(/, /throw/],
        description: 'Validates data format or constraints'
      },
      'data-transformation': {
        indicators: ['map', 'filter', 'reduce', 'transform', 'convert'],
        patterns: [/\.map\(/, /\.filter\(/, /\.reduce\(/, /=>/],
        description: 'Transforms data between formats'
      },
      'api-communication': {
        indicators: ['fetch', 'api', 'request', 'http', 'axios'],
        patterns: [/fetch\(/, /\.get\(/, /\.post\(/, /await/],
        description: 'Handles API communication'
      },
      'error-handling': {
        indicators: ['catch', 'error', 'try', 'exception', 'throw'],
        patterns: [/try\{/, /catch\(/, /throw new/, /Error\(/],
        description: 'Handles errors and exceptions'
      }
    };
  }

  async analyze(code, context = {}) {
    if (!code || typeof code !== 'string') {
      return { purposes: [], primaryPurpose: null, confidence: 0 };
    }

    const analysis = {
      purposes: [],
      primaryPurpose: null,
      confidence: 0
    };

    for (const [purpose, pattern] of Object.entries(this.patterns)) {
      const score = this.calculatePurposeScore(code, pattern);
      if (score >= this.confidenceThreshold) {
        analysis.purposes.push({
          purpose,
          confidence: parseFloat(score.toFixed(2)),
          description: pattern.description
        });
      }
    }

    analysis.purposes.sort((a, b) => b.confidence - a.confidence);
    analysis.primaryPurpose = analysis.purposes[0] || null;
    analysis.confidence = analysis.primaryPurpose ? analysis.primaryPurpose.confidence : 0;

    return analysis;
  }

  calculatePurposeScore(code, pattern) {
    let score = 0;
    const normalizedCode = code.toLowerCase();
    
    // Check for indicator words
    const indicatorMatches = pattern.indicators.filter(indicator => 
      normalizedCode.includes(indicator.toLowerCase())
    );
    score += (indicatorMatches.length / pattern.indicators.length) * 0.5;

    // Check for code patterns
    const patternMatches = pattern.patterns.filter(regex => regex.test(code));
    score += (patternMatches.length / pattern.patterns.length) * 0.5;

    return Math.min(score, 1.0);
  }

  async suggest(code, hints = []) {
    const analysis = await this.analyze(code);
    
    if (hints.length > 0) {
      analysis.purposes.forEach(p => {
        if (hints.some(hint => hint.toLowerCase().includes(p.purpose))) {
          p.confidence = Math.min(p.confidence * 1.3, 1.0);
        }
      });
      analysis.purposes.sort((a, b) => b.confidence - a.confidence);
      analysis.primaryPurpose = analysis.purposes[0];
    }

    return analysis;
  }
}

