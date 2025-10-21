export class PatternMatcher {
  constructor(config = {}) {
    this.config = config;
    this.patterns = this.initializePatterns();
    console.log('🔧 PatternMatcher initialized (Lightweight Mode)');
  }

  initializePatterns() {
    return {
      'factory-pattern': {
        pattern: /function\s+create\w+\([^)]*\)\s*{[\s\S]*?return\s+{[^}]*}[\s\S]*?}/,
        description: 'Factory function pattern detected',
        confidence: 0.8
      },
      'singleton-pattern': {
        pattern: /const\s+\w+\s*=\s*\(function\(\)[^}]*return[^}]*}\)\(\)/,
        description: 'Singleton pattern detected',
        confidence: 0.7
      },
      'observer-pattern': {
        pattern: /\.on\(|\.addEventListener\(|\.subscribe\(|\.emit\(/,
        description: 'Observer/Event emitter pattern',
        confidence: 0.6
      },
      'builder-pattern': {
        pattern: /\.set\w+\([^)]*\)\.set\w+\([^)]*\)/,
        description: 'Builder pattern method chaining',
        confidence: 0.7
      },
      'module-pattern': {
        pattern: /\(function\([^)]*\)\s*{[\s\S]*return[^}]*}\)\(\)/,
        description: 'Module pattern detected',
        confidence: 0.8
      }
    };
  }

  async matchPatterns(code, patternTypes = []) {
    const matches = [];
    
    const patternsToCheck = patternTypes.length > 0 
      ? patternTypes.filter(type => this.patterns[type])
      : Object.keys(this.patterns);
    
    for (const patternType of patternsToCheck) {
      const patternConfig = this.patterns[patternType];
      const patternMatches = this.detectPattern(code, patternConfig.pattern);
      
      if (patternMatches.length > 0) {
        matches.push({
          type: patternType,
          description: patternConfig.description,
          confidence: patternConfig.confidence,
          matches: patternMatches.length,
          locations: this.findPatternLocations(code, patternConfig.pattern),
          examples: patternMatches.slice(0, 3)
        });
      }
    }
    
    // Enhanced pattern detection without ML
    const enhancedPatterns = this.detectEnhancedPatterns(code);
    matches.push(...enhancedPatterns);
    
    return {
      patterns: matches,
      confidence: this.calculatePatternConfidence(matches),
      totalMatches: matches.reduce((sum, match) => sum + match.matches, 0)
    };
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

  findPatternLocations(code, pattern) {
    const locations = [];
    let match;
    const regex = new RegExp(pattern, 'g');
    
    while ((match = regex.exec(code)) !== null) {
      const lineNumber = code.substring(0, match.index).split('\n').length;
      locations.push({
        line: lineNumber,
        snippet: match[0].substring(0, 150) + '...'
      });
    }
    
    return locations.slice(0, 3);
  }

  detectEnhancedPatterns(code) {
    const patterns = [];
    
    // Detect promise chains
    const promiseChains = this.detectPromiseChains(code);
    if (promiseChains.length > 0) {
      patterns.push({
        type: 'promise-chain',
        description: 'Promise chain pattern detected',
        confidence: 0.7,
        matches: promiseChains.length,
        locations: [],
        examples: promiseChains.slice(0, 2)
      });
    }
    
    // Detect async/await patterns
    const asyncPatterns = this.detectAsyncPatterns(code);
    if (asyncPatterns.length > 0) {
      patterns.push({
        type: 'async-await',
        description: 'Async/await pattern detected',
        confidence: 0.6,
        matches: asyncPatterns.length,
        locations: [],
        examples: asyncPatterns.slice(0, 2)
      });
    }
    
    // Detect callback patterns
    const callbackPatterns = this.detectCallbackPatterns(code);
    if (callbackPatterns.length > 0) {
      patterns.push({
        type: 'callback-pattern',
        description: 'Callback function pattern detected',
        confidence: 0.5,
        matches: callbackPatterns.length,
        locations: [],
        examples: callbackPatterns.slice(0, 2)
      });
    }
    
    return patterns;
  }

  detectPromiseChains(code) {
    const promisePattern = /\.then\([^)]*\)(\.catch\([^)]*\))?(\.finally\([^)]*\))?/g;
    return code.match(promisePattern) || [];
  }

  detectAsyncPatterns(code) {
    const asyncPattern = /async\s+function|\basync\s+\(|await\s+[^(]/g;
    return code.match(asyncPattern) || [];
  }

  detectCallbackPatterns(code) {
    const callbackPattern = /function\s*\([^)]*\)\s*\{[^}]*\}(?=\s*\))|\([^)]*\)\s*=>/g;
    return code.match(callbackPattern) || [];
  }

  calculatePatternConfidence(matches) {
    if (matches.length === 0) return 0.1;
    
    const totalConfidence = matches.reduce((sum, match) => sum + match.confidence, 0);
    return totalConfidence / matches.length;
  }
}
