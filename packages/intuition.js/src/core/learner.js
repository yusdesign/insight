import { removeStopwords } from 'stopword';
import { stemmer } from 'stemmer';

export class PatternLearner {
  constructor(config = {}) {
    this.config = config;
    this.patterns = new Map();
    this.categories = new Set();
    this.learningStats = {
      samplesProcessed: 0,
      patternsLearned: 0,
      categoriesLearned: 0
    };
  }

  async learnFromSamples(codeSamples, labels = []) {
    try {
      const learningResults = [];
      
      for (let i = 0; i < codeSamples.length; i++) {
        const code = codeSamples[i];
        const label = labels[i] || 'general';
        
        const learned = this.learnFromSample(code, label);
        learningResults.push(learned);
        
        this.learningStats.samplesProcessed++;
      }
      
      return {
        success: true,
        patternsLearned: this.learningStats.patternsLearned,
        categoriesLearned: this.categories.size,
        samplesProcessed: this.learningStats.samplesProcessed,
        patterns: Array.from(this.patterns.entries()),
        categories: Array.from(this.categories)
      };
    } catch (error) {
      console.error('Learning error:', error);
      return {
        success: false,
        error: error.message,
        patternsLearned: this.learningStats.patternsLearned,
        categoriesLearned: this.categories.size
      };
    }
  }

  learnFromSample(code, category) {
    // Extract features from code
    const features = this.extractFeatures(code);
    const patterns = this.extractPatterns(code);
    const keywords = this.extractKeywords(code);
    
    // Store learned patterns
    const patternKey = `${category}:${this.generatePatternHash(patterns)}`;
    
    if (!this.patterns.has(patternKey)) {
      this.patterns.set(patternKey, {
        category,
        patterns,
        features,
        keywords,
        frequency: 1,
        confidence: 0.7,
        examples: [code.substring(0, 200)] // Store code snippet
      });
      this.learningStats.patternsLearned++;
    } else {
      // Update existing pattern
      const existing = this.patterns.get(patternKey);
      existing.frequency++;
      existing.confidence = Math.min(existing.confidence + 0.1, 0.95);
    }
    
    this.categories.add(category);
    
    return {
      category,
      patternsFound: patterns.length,
      features: Object.keys(features).length,
      keywords: keywords.length
    };
  }

  extractFeatures(code) {
    return {
      hasLoops: /(for|while|forEach|map)/i.test(code),
      hasConditionals: /(if|else|switch|case)/i.test(code),
      hasFunctions: /function|=>|\(\)\s*=>/.test(code),
      hasAsync: /async|await|Promise/.test(code),
      hasErrorHandling: /try|catch|finally|throw/.test(code),
      hasClasses: /class|constructor|this\./.test(code),
      lineCount: code.split('\n').length,
      complexity: this.calculateComplexity(code)
    };
  }

  extractPatterns(code) {
    const patterns = [];
    
    // Common code patterns
    const patternDefinitions = {
      'function-definition': /(function\s+\w+|const\s+\w+\s*=\s*\([^)]*\)\s*=>|async\s+function)/g,
      'method-call': /\.\w+\([^)]*\)/g,
      'variable-declaration': /(const|let|var)\s+\w+/g,
      'conditional-statement': /(if|else if|switch)\s*\([^)]*\)/g,
      'loop-statement': /(for|while)\s*\([^)]*\)/g,
      'error-handling': /(try|catch)\s*\{/g
    };
    
    for (const [patternName, regex] of Object.entries(patternDefinitions)) {
      const matches = code.match(regex);
      if (matches) {
        patterns.push({
          type: patternName,
          count: matches.length,
          examples: matches.slice(0, 3) // First 3 examples
        });
      }
    }
    
    return patterns;
  }

  extractKeywords(code) {
    // Remove comments and strings for cleaner keyword extraction
    const cleanCode = code
      .replace(/\/\/[^\n]*/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/['"`][^'"`]*['"`]/g, '');
    
    const words = cleanCode
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && word.length < 20);
    
    const withoutStopwords = removeStopwords(words);
    const stemmed = withoutStopwords.map(word => stemmer(word));
    
    // Count frequency and return top keywords
    const frequency = {};
    stemmed.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15)
      .map(([word, count]) => ({ word, count, weight: count / stemmed.length }));
  }

  calculateComplexity(code) {
    const lines = code.split('\n').length;
    const nesting = this.calculateNestingDepth(code);
    const decisionPoints = (code.match(/(if|else|case|default|\?|&&|\|\|)/g) || []).length;
    
    return {
      cyclomatic: decisionPoints + 1,
      nestingDepth: nesting,
      lineCount: lines,
      score: Math.min((decisionPoints + nesting) / 10, 1.0)
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

  generatePatternHash(patterns) {
    const patternString = patterns.map(p => `${p.type}:${p.count}`).join('|');
    return this.simpleHash(patternString);
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  }

  getLearnedPatterns(category = null) {
    if (category) {
      return Array.from(this.patterns.entries())
        .filter(([, pattern]) => pattern.category === category)
        .map(([key, pattern]) => pattern);
    }
    return Array.from(this.patterns.values());
  }

  getPatternConfidence(category, features) {
    const categoryPatterns = this.getLearnedPatterns(category);
    if (categoryPatterns.length === 0) return 0.1;
    
    let totalSimilarity = 0;
    
    for (const pattern of categoryPatterns) {
      const similarity = this.calculateFeatureSimilarity(features, pattern.features);
      totalSimilarity += similarity * pattern.confidence;
    }
    
    return Math.min(totalSimilarity / categoryPatterns.length, 0.95);
  }

  calculateFeatureSimilarity(features1, features2) {
    const keys = new Set([...Object.keys(features1), ...Object.keys(features2)]);
    let matches = 0;
    let total = 0;
    
    for (const key of keys) {
      if (features1[key] !== undefined && features2[key] !== undefined) {
        if (typeof features1[key] === 'boolean' && typeof features2[key] === 'boolean') {
          if (features1[key] === features2[key]) matches++;
        } else if (typeof features1[key] === 'number' && typeof features2[key] === 'number') {
          const diff = Math.abs(features1[key] - features2[key]);
          const max = Math.max(features1[key], features2[key]);
          if (max > 0) matches += 1 - (diff / max);
        }
        total++;
      }
    }
    
    return total > 0 ? matches / total : 0;
  }
}
