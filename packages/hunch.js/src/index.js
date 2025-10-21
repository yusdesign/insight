import { AnomalyDetector } from './core/detector.js';
import { PatternMatcher } from './core/matcher.js';

export default class HunchJS {
  constructor(config = {}) {
    this.config = {
      confidenceThreshold: config.confidenceThreshold || 0.7,
      debug: config.debug || false,
      enableML: config.enableML !== false, // Enable ML by default
      ...config
    };
    
    this.detector = new AnomalyDetector(this.config);
    this.matcher = new PatternMatcher(this.config);
    
    if (this.config.debug) {
      console.log('🔧 Hunch.js initialized with config:', this.config);
    }
  }

  async detectAnomalies(code, context = {}) {
    try {
      const analysis = await this.detector.detectAnomalies(code, context);
      
      if (this.config.debug) {
        console.log('🎯 Anomaly detection result:', analysis);
      }
      
      return analysis;
    } catch (error) {
      console.error('❌ Anomaly detection failed:', error);
      return this.getFallbackAnomalyAnalysis();
    }
  }

  async detectSmells(code, smellTypes = []) {
    try {
      // If specific smell types requested, filter the analysis
      const fullAnalysis = await this.detector.detectAnomalies(code);
      
      if (smellTypes.length === 0) {
        return fullAnalysis;
      }
      
      const filteredAnomalies = fullAnalysis.anomalies.filter(anomaly => 
        smellTypes.includes(anomaly.type)
      );
      
      return {
        ...fullAnalysis,
        anomalies: filteredAnomalies,
        summary: this.generateSummary(filteredAnomalies)
      };
    } catch (error) {
      console.error('❌ Smell detection failed:', error);
      return this.getFallbackAnomalyAnalysis();
    }
  }

  async findPatterns(code, patternTypes = []) {
    try {
      const patterns = await this.matcher.matchPatterns(code, patternTypes);
      
      if (this.config.debug) {
        console.log('🎯 Pattern matching result:', patterns);
      }
      
      return patterns;
    } catch (error) {
      console.error('❌ Pattern matching failed:', error);
      return this.getFallbackPatternAnalysis();
    }
  }

  async getIntuitionScore(code) {
    try {
      const [anomalies, patterns] = await Promise.all([
        this.detectAnomalies(code),
        this.findPatterns(code)
      ]);
      
      // Enhanced scoring with weights
      const anomalyScore = anomalies.confidence * this.calculateAnomalyWeight(anomalies);
      const patternScore = patterns.confidence * 0.3;
      const complexityScore = this.calculateComplexityScore(anomalies.complexity);
      
      const finalScore = (anomalyScore + patternScore + complexityScore) / 3;
      
      return Math.min(Math.max(finalScore, 0), 1); // Clamp between 0-1
    } catch (error) {
      console.error('❌ Intuition score calculation failed:', error);
      return 0.1;
    }
  }

  calculateAnomalyWeight(anomalies) {
    if (!anomalies.anomalies || anomalies.anomalies.length === 0) return 0.7;
    
    const highSeverityCount = anomalies.anomalies.filter(a => a.severity === 'high').length;
    const mediumSeverityCount = anomalies.anomalies.filter(a => a.severity === 'medium').length;
    
    return 0.3 + (highSeverityCount * 0.3) + (mediumSeverityCount * 0.1);
  }

  calculateComplexityScore(complexity) {
    if (!complexity) return 0.5;
    
    let score = 0.5;
    
    // Penalize high complexity
    if (complexity.cyclomatic > 15) score -= 0.3;
    if (complexity.cognitive > 20) score -= 0.2;
    if (complexity.maxNesting > 5) score -= 0.2;
    
    return Math.max(score, 0.1);
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
    
    // Count by type
    anomalies.forEach(anomaly => {
      summary.byType[anomaly.type] = (summary.byType[anomaly.type] || 0) + 1;
    });
    
    return summary;
  }

  getFallbackAnomalyAnalysis() {
    return {
      anomalies: [],
      summary: { total: 0, bySeverity: { high: 0, medium: 0, low: 0 }, byType: {} },
      confidence: 0.1,
      complexity: { cyclomatic: 0, cognitive: 0, lineCount: 0, maxNesting: 0 }
    };
  }

  getFallbackPatternAnalysis() {
    return {
      patterns: [],
      confidence: 0.1,
      matches: []
    };
  }

  getVersion() {
    return '1.0.0';
  }
}

export { AnomalyDetector, PatternMatcher };
