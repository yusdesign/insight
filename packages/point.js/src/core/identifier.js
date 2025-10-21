import compromise from 'compromise';
import { franc } from 'franc';
import { removeStopwords } from 'stopword';
import { stemmer } from 'stemmer';

export class PurposeIdentifier {
  constructor() {
    this.purposePatterns = this.initializePurposePatterns();
    this.keywordWeights = this.initializeKeywordWeights();
  }

  initializePurposePatterns() {
    return {
      validation: {
        keywords: ['validate', 'check', 'verify', 'test', 'assert', 'ensure'],
        patterns: [
          /if\s*\([^)]*\)\s*{/,
          /throw\s+new\s+Error/,
          /\.test\(/,
          /regex|pattern|match/i
        ],
        weight: 0.9
      },
      transformation: {
        keywords: ['transform', 'map', 'filter', 'reduce', 'convert', 'parse'],
        patterns: [
          /\.map\(/,
          /\.filter\(/,
          /\.reduce\(/,
          /JSON\.parse/,
          /JSON\.stringify/
        ],
        weight: 0.8
      },
      calculation: {
        keywords: ['calculate', 'compute', 'sum', 'total', 'count', 'average'],
        patterns: [
          /[\+\-\*\/]=/,
          /Math\./,
          /\b\d+\s*[\+\-\*\/]\s*\d+/,
          /for\s*\(.*\.length/
        ],
        weight: 0.7
      },
      communication: {
        keywords: ['fetch', 'api', 'http', 'request', 'ajax', 'endpoint'],
        patterns: [
          /fetch\(/,
          /axios\./,
          /\.get\(|\.post\(|\.put\(|\.delete\(/,
          /XMLHttpRequest/
        ],
        weight: 0.85
      },
      storage: {
        keywords: ['save', 'store', 'load', 'read', 'write', 'database'],
        patterns: [
          /localStorage/,
          /sessionStorage/,
          /\.setItem\(/,
          /\.getItem\(/,
          /database|db\./i
        ],
        weight: 0.75
      }
    };
  }

  initializeKeywordWeights() {
    return {
      'validate': 0.9, 'check': 0.8, 'verify': 0.85,
      'transform': 0.8, 'map': 0.7, 'filter': 0.6, 'reduce': 0.7,
      'calculate': 0.9, 'compute': 0.8, 'sum': 0.7,
      'fetch': 0.9, 'api': 0.8, 'request': 0.7,
      'save': 0.8, 'store': 0.7, 'load': 0.6
    };
  }

  async identify(code) {
    const features = this.extractFeatures(code);
    const textAnalysis = this.analyzeText(code);
    const purposeScores = this.calculatePurposeScores(features, textAnalysis);
    
    const primaryPurpose = this.determinePrimaryPurpose(purposeScores);
    const secondaryPurposes = this.findSecondaryPurposes(purposeScores);
    
    return {
      primaryPurpose: {
        purpose: primaryPurpose.type,
        description: primaryPurpose.description,
        confidence: primaryPurpose.confidence
      },
      purposes: secondaryPurposes,
      confidence: primaryPurpose.confidence,
      features: features,
      analysis: textAnalysis
    };
  }

  extractFeatures(code) {
    return {
      hasValidation: this.detectPattern(code, this.purposePatterns.validation.patterns),
      hasTransformation: this.detectPattern(code, this.purposePatterns.transformation.patterns),
      hasCalculation: this.detectPattern(code, this.purposePatterns.calculation.patterns),
      hasCommunication: this.detectPattern(code, this.purposePatterns.communication.patterns),
      hasStorage: this.detectPattern(code, this.purposePatterns.storage.patterns),
      lineCount: code.split('\n').length,
      functionCount: (code.match(/function\s*\w*\(/g) || []).length,
      methodCount: (code.match(/\.\w+\(/g) || []).length,
      commentDensity: this.calculateCommentDensity(code)
    };
  }

  analyzeText(code) {
    // Extract comments and string literals for better analysis
    const comments = this.extractComments(code);
    const cleanCode = this.removeCommentsAndStrings(code);
    
    // Use compromise for lightweight NLP
    const doc = compromise(comments.join(' '));
    const verbs = doc.verbs().out('array');
    const nouns = doc.nouns().out('array');
    
    // Simple keyword extraction
    const keywords = this.extractKeywords(cleanCode + ' ' + comments.join(' '));
    
    return {
      verbs,
      nouns,
      keywords,
      commentCount: comments.length,
      language: franc(comments.join(' ') || code.substring(0, 100))
    };
  }

  extractComments(code) {
    const comments = [];
    
    // Match single-line comments
    const singleLineComments = code.match(/\/\/[^\n]*/g) || [];
    comments.push(...singleLineComments);
    
    // Match multi-line comments
    const multiLineComments = code.match(/\/\*[\s\S]*?\*\//g) || [];
    comments.push(...multiLineComments);
    
    return comments.map(comment => 
      comment.replace(/\/\/|\/\*|\*\//g, '').trim()
    ).filter(comment => comment.length > 0);
  }

  removeCommentsAndStrings(code) {
    return code
      .replace(/\/\/[^\n]*/g, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/['"`][^'"`]*['"`]/g, ''); // Remove string literals
  }

  extractKeywords(text) {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    const withoutStopwords = removeStopwords(words);
    const stemmed = withoutStopwords.map(word => stemmer(word));
    
    // Count frequency
    const frequency = {};
    stemmed.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  }

  detectPattern(code, patterns) {
    return patterns.some(pattern => pattern.test(code));
  }

  calculatePurposeScores(features, textAnalysis) {
    const scores = {};
    
    for (const [purposeType, pattern] of Object.entries(this.purposePatterns)) {
      let score = 0;
      
      // Feature-based scoring
      const featureKey = `has${purposeType.charAt(0).toUpperCase() + purposeType.slice(1)}`;
      if (features[featureKey]) {
        score += pattern.weight * 0.6;
      }
      
      // Keyword-based scoring
      const keywordMatches = textAnalysis.keywords.filter(kw => 
        pattern.keywords.includes(kw.word)
      );
      if (keywordMatches.length > 0) {
        score += (keywordMatches.length * 0.1) * 0.4;
      }
      
      scores[purposeType] = Math.min(score, 1.0);
    }
    
    return scores;
  }

  determinePrimaryPurpose(scores) {
    let maxScore = 0;
    let primaryType = 'general';
    
    for (const [type, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        primaryType = type;
      }
    }
    
    const descriptions = {
      validation: 'Code that validates input data or conditions',
      transformation: 'Code that transforms data from one format to another',
      calculation: 'Code that performs mathematical calculations',
      communication: 'Code that communicates with external APIs or services',
      storage: 'Code that handles data storage and retrieval',
      general: 'General purpose code with no specific dominant pattern'
    };
    
    return {
      type: primaryType,
      description: descriptions[primaryType],
      confidence: maxScore > 0.3 ? maxScore : 0.3
    };
  }

  findSecondaryPurposes(scores) {
    return Object.entries(scores)
      .filter(([type, score]) => score > 0.3 && score < 1.0)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([type, score]) => ({
        purpose: type,
        confidence: score
      }));
  }

  calculateCommentDensity(code) {
    const lines = code.split('\n');
    const commentLines = lines.filter(line => 
      line.trim().startsWith('//') || line.includes('/*')
    ).length;
    
    return lines.length > 0 ? commentLines / lines.length : 0;
  }
}
