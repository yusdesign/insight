import { HolisticAnalyzer } from './core/analyzer.js';
import { CorrelationEngine } from './core/correlator.js';

export default class InsightJS {
  constructor(config = {}) {
    this.config = {
      depth: config.depth || 'medium', // 'quick', 'medium', 'deep'
      includeSuggestions: config.includeSuggestions !== false,
      debug: config.debug || false,
      crossPackageAnalysis: config.crossPackageAnalysis || true,
      ...config
    };
    
    this.analyzer = new HolisticAnalyzer(this.config);
    this.correlator = new CorrelationEngine(this.config);
    
    if (this.config.debug) {
      console.log('🔧 Insight.js initialized with config:', this.config);
    }
  }

  /**
   * Perform holistic analysis of code
   */
  async analyze(code, context = {}) {
    try {
      const analysis = await this.analyzer.comprehensiveAnalysis(code, context);
      
      if (this.config.debug) {
        console.log('🎯 Holistic analysis completed:', analysis.summary);
      }
      
      return analysis;
    } catch (error) {
      console.error('❌ Holistic analysis failed:', error);
      return this.getFallbackAnalysis();
    }
  }

  /**
   * Analyze code relationships and dependencies
   */
  async analyzeRelationships(codeSnippets, options = {}) {
    try {
      const relationships = await this.correlator.findRelationships(codeSnippets, options);
      
      return {
        relationships,
        insights: this.extractRelationshipInsights(relationships),
        confidence: this.calculateRelationshipConfidence(relationships)
      };
    } catch (error) {
      console.error('❌ Relationship analysis failed:', error);
      return { relationships: [], insights: [], confidence: 0.1 };
    }
  }

  /**
   * Generate comprehensive insights report
   */
  async generateReport(code, context = {}) {
    try {
      const analysis = await this.analyze(code, context);
      const insights = await this.extractKeyInsights(analysis);
      
      return {
        summary: this.generateExecutiveSummary(insights),
        keyFindings: insights.keyFindings,
        recommendations: insights.recommendations,
        metrics: analysis.metrics,
        confidence: analysis.confidence
      };
    } catch (error) {
      console.error('❌ Report generation failed:', error);
      return this.getFallbackReport();
    }
  }

  /**
   * Compare multiple code versions or approaches
   */
  async compareVersions(versions, criteria = ['quality', 'maintainability', 'performance']) {
    try {
      const comparisons = await this.analyzer.compareCodeVersions(versions, criteria);
      
      return {
        comparisons,
        bestVersion: this.determineBestVersion(comparisons),
        differences: this.analyzeDifferences(comparisons),
        confidence: Math.min(comparisons.confidence * 1.1, 0.95)
      };
    } catch (error) {
      console.error('❌ Version comparison failed:', error);
      return { comparisons: [], bestVersion: null, differences: [], confidence: 0.1 };
    }
  }

  /**
   * Detect architectural patterns and anti-patterns
   */
  async detectPatterns(code, patternTypes = []) {
    try {
      const patterns = await this.analyzer.detectArchitecturalPatterns(code, patternTypes);
      
      return {
        patterns: patterns.detected,
        antiPatterns: patterns.antiPatterns,
        recommendations: patterns.recommendations,
        confidence: patterns.confidence
      };
    } catch (error) {
      console.error('❌ Pattern detection failed:', error);
      return { patterns: [], antiPatterns: [], recommendations: [], confidence: 0.1 };
    }
  }

  /**
   * Extract key insights from analysis results
   */
  async extractKeyInsights(analysis) {
    const keyFindings = [];
    const recommendations = [];

    // Extract purpose insights
    if (analysis.purpose) {
      keyFindings.push({
        category: 'purpose',
        insight: `Primary purpose: ${analysis.purpose.primaryPurpose.purpose}`,
        confidence: analysis.purpose.confidence,
        impact: 'high'
      });
    }

    // Extract quality insights
    if (analysis.quality && analysis.quality.anomalies.length > 0) {
      const highSeverityIssues = analysis.quality.anomalies.filter(a => a.severity === 'high');
      if (highSeverityIssues.length > 0) {
        keyFindings.push({
          category: 'quality',
          insight: `${highSeverityIssues.length} high-severity issues detected`,
          confidence: analysis.quality.confidence,
          impact: 'critical'
        });
        
        recommendations.push({
          type: 'quality',
          action: 'Address high-severity issues immediately',
          priority: 'high',
          issues: highSeverityIssues.map(issue => issue.description)
        });
      }
    }

    // Extract maintainability insights
    if (analysis.maintainability) {
      if (analysis.maintainability.score < 0.5) {
        keyFindings.push({
          category: 'maintainability',
          insight: 'Code maintainability needs improvement',
          confidence: 0.8,
          impact: 'medium'
        });
        
        recommendations.push({
          type: 'maintainability',
          action: 'Refactor to improve readability and structure',
          priority: 'medium'
        });
      }
    }

    // Extract performance insights
    if (analysis.performance && analysis.performance.considerations.length > 0) {
      keyFindings.push({
        category: 'performance',
        insight: `${analysis.performance.considerations.length} performance considerations`,
        confidence: analysis.performance.confidence,
        impact: 'medium'
      });
    }

    return { keyFindings, recommendations };
  }

  /**
   * Generate executive summary
   */
  generateExecutiveSummary(insights) {
    const criticalCount = insights.keyFindings.filter(f => f.impact === 'critical').length;
    const highCount = insights.keyFindings.filter(f => f.impact === 'high').length;
    
    let overallStatus = 'good';
    if (criticalCount > 0) overallStatus = 'critical';
    else if (highCount > 0) overallStatus = 'needs_attention';
    else if (insights.keyFindings.length > 0) overallStatus = 'satisfactory';
    
    return {
      status: overallStatus,
      totalFindings: insights.keyFindings.length,
      criticalIssues: criticalCount,
      highPriorityIssues: highCount,
      recommendations: insights.recommendations.length,
      summary: this.generateStatusSummary(overallStatus, insights)
    };
  }

  generateStatusSummary(status, insights) {
    const summaries = {
      critical: 'Critical issues detected that require immediate attention',
      needs_attention: 'Code needs attention to address important issues',
      satisfactory: 'Code is in satisfactory condition with minor improvements possible',
      good: 'Code is well-structured and follows good practices'
    };
    
    return summaries[status] || 'Analysis complete';
  }

  determineBestVersion(comparisons) {
    if (!comparisons.versions || comparisons.versions.length === 0) return null;
    
    return comparisons.versions.reduce((best, current) => {
      const bestScore = this.calculateOverallScore(best.scores);
      const currentScore = this.calculateOverallScore(current.scores);
      return currentScore > bestScore ? current : best;
    });
  }

  calculateOverallScore(scores) {
    const weights = {
      quality: 0.4,
      maintainability: 0.3,
      performance: 0.2,
      readability: 0.1
    };
    
    return Object.entries(scores).reduce((total, [category, score]) => {
      return total + (score * (weights[category] || 0.1));
    }, 0);
  }

  analyzeDifferences(comparisons) {
    if (!comparisons.versions || comparisons.versions.length < 2) return [];
    
    const differences = [];
    const versions = comparisons.versions;
    
    for (let i = 0; i < versions.length - 1; i++) {
      for (let j = i + 1; j < versions.length; j++) {
        const diff = this.compareTwoVersions(versions[i], versions[j]);
        differences.push(diff);
      }
    }
    
    return differences;
  }

  compareTwoVersions(version1, version2) {
    const score1 = this.calculateOverallScore(version1.scores);
    const score2 = this.calculateOverallScore(version2.scores);
    
    return {
      versions: [version1.name, version2.name],
      scoreDifference: Math.abs(score1 - score2),
      betterVersion: score1 > score2 ? version1.name : version2.name,
      keyDifferences: this.findKeyDifferences(version1, version2)
    };
  }

  findKeyDifferences(version1, version2) {
    const differences = [];
    
    const categories = ['quality', 'maintainability', 'performance', 'readability'];
    categories.forEach(category => {
      const diff = Math.abs(version1.scores[category] - version2.scores[category]);
      if (diff > 0.2) {
        differences.push({
          category,
          difference: diff,
          better: version1.scores[category] > version2.scores[category] ? version1.name : version2.name
        });
      }
    });
    
    return differences;
  }

  extractRelationshipInsights(relationships) {
    const insights = [];
    
    if (relationships.strongConnections > 5) {
      insights.push({
        type: 'high-coupling',
        insight: 'High coupling detected between code segments',
        recommendation: 'Consider decoupling tightly connected components',
        severity: 'medium'
      });
    }
    
    if (relationships.isolatedComponents > 3) {
      insights.push({
        type: 'low-cohesion',
        insight: 'Multiple isolated components with little interaction',
        recommendation: 'Review component relationships for better integration',
        severity: 'low'
      });
    }
    
    return insights;
  }

  calculateRelationshipConfidence(relationships) {
    if (!relationships.connections || relationships.connections.length === 0) {
      return 0.3;
    }
    
    const avgConfidence = relationships.connections.reduce((sum, conn) => 
      sum + conn.confidence, 0
    ) / relationships.connections.length;
    
    return Math.min(avgConfidence * 1.1, 0.95);
  }

  getFallbackAnalysis() {
    return {
      purpose: { primaryPurpose: { purpose: 'unknown', confidence: 0.1 } },
      quality: { anomalies: [], confidence: 0.1 },
      maintainability: { score: 0.1, confidence: 0.1 },
      performance: { considerations: [], confidence: 0.1 },
      metrics: {},
      confidence: 0.1,
      summary: { status: 'unknown', totalFindings: 0 }
    };
  }

  getFallbackReport() {
    return {
      summary: { status: 'analysis_failed', totalFindings: 0 },
      keyFindings: [],
      recommendations: [],
      metrics: {},
      confidence: 0.1
    };
  }

  getVersion() {
    return '1.0.0';
  }
}

export { HolisticAnalyzer, CorrelationEngine };
