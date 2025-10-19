import { PatternLearner } from './core/learner.js';
import { RelationshipFinder } from './core/relationships.js';

/**
 * Intuition.js - Pattern recognition for your codebase
 * A library for learning and recognizing complex code patterns
 */
class IntuitionJS {
  constructor(options = {}) {
    this.learner = new PatternLearner(options);
    this.relationships = new RelationshipFinder(options);
    this.version = '0.1.0';
  }

  /**
   * Learn patterns from code examples
   * @param {Array} examples - Code examples to learn from
   * @param {object} labels - Associated labels or categories
   * @returns {Promise<object>} Learning results
   */
  async learnPatterns(examples, labels = {}) {
    return await this.learner.train(examples, labels);
  }

  /**
   * Recognize patterns in new code
   * @param {string} code - Code to analyze
   * @param {object} context - Additional context
   * @returns {Promise<object>} Pattern recognition results
   */
  async recognizePatterns(code, context = {}) {
    return await this.learner.recognize(code, context);
  }

  /**
   * Find relationships between code elements
   * @param {Array} codeSnippets - Multiple code snippets to analyze
   * @returns {Promise<object>} Relationship analysis
   */
  async findRelationships(codeSnippets) {
    return await this.relationships.analyze(codeSnippets);
  }

  /**
   * Get pattern similarity score
   * @param {string} code1 - First code snippet
   * @param {string} code2 - Second code snippet  
   * @returns {Promise<number>} Similarity score 0-1
   */
  async getSimilarity(code1, code2) {
    return await this.relationships.calculateSimilarity(code1, code2);
  }

  /**
   * Suggest refactoring based on learned patterns
   * @param {string} code - Code to refactor
   * @returns {Promise<object>} Refactoring suggestions
   */
  async suggestRefactoring(code) {
    return await this.learner.suggestRefactoring(code);
  }

  getVersion() {
    return this.version;
  }
}

export default IntuitionJS;
export { PatternLearner, RelationshipFinder };

