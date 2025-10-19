// Import all cognitive layers
import PointJS from 'point.js';
import HunchJS from 'hunch.js'; 
import IntuitionJS from 'intuition.js';

/**
 * Insight.js - Holistic code understanding and synthesis
 * The complete Insight experience combining all cognitive layers
 */
class InsightJS {
  constructor(options = {}) {
    this.point = new PointJS(options.point || {});
    this.hunch = new HunchJS(options.hunch || {});
    this.intuition = new IntuitionJS(options.intuition || {});
    this.version = '0.1.0';
    
    this.weights = {
      purpose: options.weights?.purpose || 0.3,
      anomalies: options.weights?.anomalies || 0.3, 
      patterns: options.weights?.patterns || 0.2,
      relationships: options.weights?.relationships || 0.2
    };
  }

  /**
   * Complete holistic analysis of code
   * @param {string} code - The code to analyze
   * @param {object} context - Additional context
   * @returns {Promise<object>} Comprehensive insight analysis
   */
  async understand(code, context = {}) {
    console.log('🔍 Starting holistic code analysis...');
    
    // Run all cognitive layers in parallel
    const [purposeAnalysis, anomalyAnalysis, patternAnalysis] = await Promise.all([
      this.point.identify(code, context),
      this.hunch.detectAnomalies(code),
      this.intuition.recognizePatterns(code)
    ]);

    // Synthesize insights from all layers
    const synthesis = this.synthesizeInsights({
      purpose: purposeAnalysis,
      anomalies: anomalyAnalysis, 
      patterns: patternAnalysis
    }, code);

    return {
      synthesis,
      layers: {
        point: purposeAnalysis,
        hunch: anomalyAnalysis,
        intuition: patternAnalysis
      },
      overallScore: this.calculateOverallScore(synthesis),
      recommendations: this.generateRecommendations(synthesis),
      confidence: synthesis.confidence
    };
  }

  /**
   * Synthesize insights from all cognitive layers
   */
  synthesizeInsights(layerResults, code) {
    const synthesis = {
      purpose: layerResults.purpose.primaryPurpose?.purpose || 'unknown',
      purposeConfidence: layerResults.purpose.confidence || 0,
      
      anomalyCount: layerResults.anomalies.anomalies.length,
      criticalAnomalies: layerResults.anomalies.anomalies.filter(a => a.severity === 'high'),
      anomalyConfidence: layerResults.anomalies.confidence || 0,
      
      patternCount: layerResults.patterns.recognizedPatterns.length,
      primaryPattern: layerResults.patterns.recognizedPatterns[0] || null,
      patternConfidence: layerResults.patterns.confidence || 0,
      
      codeComplexity: this.estimateComplexity(code),
      clarityScore: this.estimateClarity(layerResults),
      maintainability: this.estimateMaintainability(layerResults),
      
      confidence: 0
    };

    // Calculate overall confidence
    synthesis.confidence = (
      synthesis.purposeConfidence * this.weights.purpose +
      synthesis.anomalyConfidence * this.weights.anomalies + 
      synthesis.patternConfidence * this.weights.patterns
    );

    return synthesis;
  }

  /**
   * Calculate overall code quality score
   */
  calculateOverallScore(synthesis) {
    let score = 100;

    // Deduct for anomalies
    score -= synthesis.anomalyCount * 5;
    score -= synthesis.criticalAnomalies.length * 15;

    // Boost for clear purpose
    score += synthesis.purposeConfidence * 10;

    // Adjust for complexity
    score -= synthesis.codeComplexity * 2;

    // Boost for recognized patterns (indicates good practices)
    score += synthesis.patternCount * 3;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate actionable recommendations
   */
  generateRecommendations(synthesis) {
    const recommendations = [];

    if (synthesis.purposeConfidence < 0.5) {
      recommendations.push({
        priority: 'high',
        category: 'purpose',
        message: 'Code purpose is unclear - consider adding comments or refactoring for clarity',
        action: 'Improve code documentation and naming'
      });
    }

    if (synthesis.criticalAnomalies.length > 0) {
      recommendations.push({
        priority: 'high', 
        category: 'quality',
        message: `Found ${synthesis.criticalAnomalies.length} critical code smells that need immediate attention`,
        action: 'Address high-severity anomalies identified by hunch.js'
      });
    }

    if (synthesis.codeComplexity > 10) {
      recommendations.push({
        priority: 'medium',
        category: 'complexity', 
        message: 'Code is highly complex - consider breaking into smaller functions',
        action: 'Refactor to reduce cyclomatic complexity'
      });
    }

    if (synthesis.overallScore < 60) {
      recommendations.push({
        priority: 'medium',
        category: 'overall',
        message: 'Overall code quality needs improvement',
        action: 'Review and address recommendations above'
      });
    }

    // Positive reinforcement for good code
    if (synthesis.overallScore > 80) {
      recommendations.push({
        priority: 'low',
        category: 'positive',
        message: 'Code quality is excellent!',
        action: 'Maintain current standards'
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  /**
   * Estimate code complexity
   */
  estimateComplexity(code) {
    let complexity = 0;
    complexity += (code.match(/if|else|switch/g) || []).length;
    complexity += (code.match(/for|while|do/g) || []).length; 
    complexity += (code.match(/&&|\|\|/g) || []).length;
    complexity += (code.match(/try|catch/g) || []).length;
    return complexity;
  }

  /**
   * Estimate code clarity based on analysis results
   */
  estimateClarity(layerResults) {
    let clarity = 100;
    
    // Purpose clarity
    clarity *= layerResults.purpose.confidence || 0.5;
    
    // Anomaly impact
    clarity -= layerResults.anomalies.anomalies.length * 10;
    
    return Math.max(0, clarity);
  }

  /**
   * Estimate maintainability score
   */
  estimateMaintainability(layerResults) {
    let maintainability = 100;
    
    // High anomalies reduce maintainability
    maintainability -= layerResults.anomalies.anomalies.filter(a => 
      a.severity === 'high'
    ).length * 20;
    
    // Medium anomalies have moderate impact
    maintainability -= layerResults.anomalies.anomalies.filter(a =>
      a.severity === 'medium'  
    ).length * 10;

    // Clear purpose improves maintainability
    maintainability += (layerResults.purpose.confidence || 0) * 10;

    return Math.max(0, Math.min(100, maintainability));
  }

  /**
   * Get detailed breakdown for advanced analysis
   */
  async analyzeDeep(code, context = {}) {
    const basicAnalysis = await this.understand(code, context);
    
    // Additional deep analysis
    const relationships = await this.intuition.findRelationships([code]);
    const intuitionScore = await this.hunch.getIntuitionScore(code);

    return {
      ...basicAnalysis,
      deepAnalysis: {
        relationships,
        intuitionScore,
        cognitiveBalance: this.analyzeCognitiveBalance(basicAnalysis.layers)
      }
    };
  }

  /**
   * Analyze balance between cognitive layers
   */
  analyzeCognitiveBalance(layers) {
    return {
      purposeStrength: layers.point.confidence,
      anomalyAwareness: layers.hunch.confidence, 
      patternRecognition: layers.intuition.confidence,
      balanced: layers.point.confidence > 0.5 && 
                layers.hunch.confidence > 0.5 && 
                layers.intuition.confidence > 0.5
    };
  }

  getVersion() {
    return this.version;
  }

  /**
   * Get suite information
   */
  getSuiteInfo() {
    return {
      suite: 'Insight Cognitive Code Analysis Suite',
      version: this.version,
      layers: {
        point: this.point.getVersion(),
        hunch: this.hunch.getVersion(), 
        intuition: this.intuition.getVersion()
      },
      cognitiveStack: ['Purpose Detection', 'Anomaly Detection', 'Pattern Learning', 'Holistic Synthesis']
    };
  }
}

export default InsightJS;
