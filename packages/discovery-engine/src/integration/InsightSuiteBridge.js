import ArchetypalDiscoveryEngine from '../index.js';
import PointJS from 'point.js';
import HunchJS from 'hunch.js';
import IntuitionJS from 'intuition.js';
import InsightJS from 'insight.js';

export class InsightSuiteBridge {
  constructor() {
    this.discoveryEngine = new ArchetypalDiscoveryEngine();
    this.point = new PointJS();
    this.hunch = new HunchJS();
    this.intuition = new IntuitionJS();
    this.insight = new InsightJS();
    
    this.integrationHistory = [];
  }

  async comprehensiveAnalysisWithDiscovery(code, context = {}) {
    console.log('🔗 RUNNING INTEGRATED ANALYSIS WITH ARCHETYPAL DISCOVERY\n');
    
    // Run all analyses in parallel
    const [purposeAnalysis, anomalyAnalysis, patternAnalysis, holisticAnalysis, discoveryAnalysis] = await Promise.all([
      this.point.identify(code),
      this.hunch.detectAnomalies(code),
      this.intuition.predict(code),
      this.insight.analyze(code),
      this.discoveryEngine.analyze(code, context)
    ]);

    // Synthesize all results
    const integratedResult = {
      timestamp: Date.now(),
      purpose: purposeAnalysis,
      quality: anomalyAnalysis,
      patterns: patternAnalysis,
      holistic: holisticAnalysis,
      archetypal: discoveryAnalysis,
      
      // Cross-analysis insights
      crossCorrelations: this.findCrossCorrelations(
        purposeAnalysis, anomalyAnalysis, patternAnalysis, discoveryAnalysis
      ),
      
      // Archetype-enhanced recommendations
      enhancedRecommendations: this.enhanceWithArchetypes(
        holisticAnalysis.recommendations,
        discoveryAnalysis
      )
    };

    // Store for collective learning
    this.integrationHistory.push(integratedResult);
    
    return integratedResult;
  }

  findCrossCorrelations(purpose, quality, patterns, discovery) {
    const correlations = [];
    
    // Check if purpose matches discovered patterns
    if (purpose.primaryPurpose && discovery.matches && discovery.matches.length > 0) {
      const purposeText = purpose.primaryPurpose.purpose.toLowerCase();
      discovery.matches.forEach(match => {
        if (purposeText.includes(match.pattern.toLowerCase())) {
          correlations.push({
            type: 'purpose-pattern-alignment',
            confidence: (purpose.confidence + match.confidence) / 2,
            message: `Purpose "${purpose.primaryPurpose.purpose}" aligns with ${match.pattern} pattern`
          });
        }
      });
    }
    
    // Check if anomalies relate to pattern mismatches
    if (quality.anomalies && quality.anomalies.length > 0 && discovery.matches.length === 0) {
      correlations.push({
        type: 'pattern-mismatch-anomalies',
        confidence: 0.7,
        message: 'Code anomalies may indicate architectural pattern violations'
      });
    }
    
    return correlations;
  }

  enhanceWithArchetypes(recommendations, discovery) {
    const enhanced = [...recommendations];
    
    if (discovery.matches && discovery.matches.length > 0) {
      // Add pattern-specific recommendations
      discovery.matches.forEach(match => {
        if (match.confidence > 0.6) {
          enhanced.push({
            type: 'pattern-optimization',
            pattern: match.pattern,
            confidence: match.confidence,
            message: `Optimize implementation of ${match.pattern} pattern`,
            priority: 'medium'
          });
        }
      });
    }
    
    if (discovery.novelPatterns && discovery.novelPatterns.length > 0) {
      enhanced.push({
        type: 'novel-pattern-discovery',
        confidence: 0.8,
        message: 'Novel patterns detected - consider formalizing as architectural patterns',
        priority: 'low'
      });
    }
    
    return enhanced;
  }

  getIntegratedSummary() {
    const discoverySummary = this.discoveryEngine.getDiscoverySummary();
    
    return {
      archetypalDiscovery: discoverySummary,
      integrationMetrics: {
        totalIntegratedAnalyses: this.integrationHistory.length,
        averageConfidence: this.calculateIntegratedConfidence(),
        crossAnalysisInsights: this.extractCrossAnalysisPatterns()
      },
      systemHealth: {
        discoveryEngine: discoverySummary.overallConfidence > 0.5 ? 'healthy' : 'learning',
        integrationBridge: this.integrationHistory.length > 0 ? 'active' : 'idle'
      }
    };
  }

  calculateIntegratedConfidence() {
    if (this.integrationHistory.length === 0) return 0;
    
    const total = this.integrationHistory.reduce((sum, analysis) => {
      return sum + (analysis.archetypal?.confidence || 0);
    }, 0);
    
    return total / this.integrationHistory.length;
  }

  extractCrossAnalysisPatterns() {
    // Analyze integration history to find meta-patterns
    const patterns = [];
    
    if (this.integrationHistory.length >= 2) {
      patterns.push({
        type: 'learning-progression',
        observation: 'Discovery confidence increasing with more analyses',
        evidence: this.integrationHistory.length
      });
    }
    
    return patterns;
  }
}
