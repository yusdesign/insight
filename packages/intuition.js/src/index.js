import { PatternLearner } from './core/learner.js';
import { InsightPredictor } from './core/predictor.js';

export default class IntuitionJS {
  constructor(config = {}) {
    this.config = {
      learningRate: config.learningRate || 0.1,
      confidenceThreshold: config.confidenceThreshold || 0.7,
      debug: config.debug || false,
      enablePatternLearning: config.enablePatternLearning !== false,
      ...config
    };
    
    this.learner = new PatternLearner(this.config);
    this.predictor = new InsightPredictor(this.config);
    
    if (this.config.debug) {
      console.log('🔧 Intuition.js initialized with config:', this.config);
    }
  }

  /**
   * Learn patterns from code examples
   */
  async learnPatterns(codeSamples, labels = []) {
    try {
      const learningResult = await this.learner.learnFromSamples(codeSamples, labels);
      
      if (this.config.debug) {
        console.log('🎯 Pattern learning completed:', learningResult);
      }
      
      return learningResult;
    } catch (error) {
      console.error('❌ Pattern learning failed:', error);
      return this.getFallbackLearningResult();
    }
  }

  /**
   * Predict code purpose or issues based on learned patterns
   */
  async predict(code, context = {}) {
    try {
      const prediction = await this.predictor.predict(code, context);
      
      if (this.config.debug) {
        console.log('🎯 Prediction result:', prediction);
      }
      
      return prediction;
    } catch (error) {
      console.error('❌ Prediction failed:', error);
      return this.getFallbackPrediction();
    }
  }

  /**
   * Get similarity score between two code snippets
   */
  async getSimilarityScore(code1, code2) {
    try {
      const similarity = await this.predictor.calculateSimilarity(code1, code2);
      return {
        score: similarity,
        confidence: Math.min(similarity * 1.2, 0.95),
        interpretation: this.interpretSimilarity(similarity)
      };
    } catch (error) {
      console.error('❌ Similarity calculation failed:', error);
      return { score: 0.1, confidence: 0.1, interpretation: 'Unknown' };
    }
  }

  /**
   * Suggest improvements based on learned best practices
   */
  async suggestImprovements(code, category = 'general') {
    try {
      const suggestions = await this.predictor.generateSuggestions(code, category);
      
      return {
        suggestions,
        confidence: this.calculateSuggestionConfidence(suggestions),
        category
      };
    } catch (error) {
      console.error('❌ Suggestion generation failed:', error);
      return { suggestions: [], confidence: 0.1, category };
    }
  }

  /**
   * Extract insights from code patterns
   */
  async extractInsights(code, patterns = []) {
    try {
      const insights = await this.predictor.extractPatternInsights(code, patterns);
      
      return {
        insights,
        summary: this.generateInsightSummary(insights),
        confidence: insights.length > 0 ? 0.8 : 0.3
      };
    } catch (error) {
      console.error('❌ Insight extraction failed:', error);
      return { insights: [], summary: 'No insights available', confidence: 0.1 };
    }
  }

  interpretSimilarity(score) {
    if (score >= 0.9) return 'Very similar - likely same purpose';
    if (score >= 0.7) return 'Similar - related functionality';
    if (score >= 0.5) return 'Moderately similar - some common patterns';
    if (score >= 0.3) return 'Slightly similar - few common elements';
    return 'Very different - unrelated code';
  }

  calculateSuggestionConfidence(suggestions) {
    if (suggestions.length === 0) return 0.1;
    
    const avgConfidence = suggestions.reduce((sum, suggestion) => 
      sum + (suggestion.confidence || 0.5), 0
    ) / suggestions.length;
    
    return Math.min(avgConfidence * 1.1, 0.95);
  }

  generateInsightSummary(insights) {
    const categories = {};
    insights.forEach(insight => {
      categories[insight.category] = (categories[insight.category] || 0) + 1;
    });
    
    return {
      totalInsights: insights.length,
      byCategory: categories,
      primaryCategory: Object.keys(categories).reduce((a, b) => 
        categories[a] > categories[b] ? a : b, 'general'
      )
    };
  }

  getFallbackLearningResult() {
    return {
      patternsLearned: 0,
      confidence: 0.1,
      categories: [],
      message: 'Learning unavailable - using fallback'
    };
  }

  getFallbackPrediction() {
    return {
      prediction: 'unknown',
      confidence: 0.1,
      reasons: [],
      alternatives: []
    };
  }

  getVersion() {
    return '1.0.0';
  }
}

export { PatternLearner, InsightPredictor };
