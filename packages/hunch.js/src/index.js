import { AnomalyDetector } from './core/detector.js';
import { PatternMatcher } from './core/matcher.js';

/**
 * Hunch.js - Trust your code's gut feelings
 * A library for detecting anomalies and patterns in code
 */
class HunchJS {
  constructor(options = {}) {
    this.detector = new AnomalyDetector(options);
    this.matcher = new PatternMatcher(options);
    this.version = '0.1.0';
  }

  /**
   * Detect anomalies in code
   * @param {string} code - The code to analyze
   * @param {object} context - Additional context
   * @returns {Promise<object>} Anomaly detection results
   */
  async detectAnomalies(code, context = {}) {
    return await this.detector.analyze(code, context);
  }

  /**
   * Check for code smells
   * @param {string} code - The code to analyze
   * @param {Array} smellTypes - Specific smell types to check for
   * @returns {Promise<object>} Code smell analysis
   */
  async detectSmells(code, smellTypes = []) {
    return await this.detector.findSmells(code, smellTypes);
  }

  /**
   * Find patterns in codebase
   * @param {string} code - The code to analyze
   * @param {Array} patternTypes - Pattern types to look for
   * @returns {Promise<object>} Pattern matching results
   */
  async findPatterns(code, patternTypes = []) {
    return await this.matcher.matchPatterns(code, patternTypes);
  }

  /**
   * Get intuition score (gut feeling strength)
   * @param {string} code - The code to analyze
   * @returns {Promise<number>} Intuition score 0-1
   */
  async getIntuitionScore(code) {
    const anomalies = await this.detectAnomalies(code);
    const patterns = await this.findPatterns(code);
    
    // Calculate combined intuition score
    const anomalyScore = anomalies.confidence || 0;
    const patternScore = patterns.confidence || 0;
    
    return (anomalyScore + patternScore) / 2;
  }

  getVersion() {
    return this.version;
  }
}

export default HunchJS;
export { AnomalyDetector, PatternMatcher };

