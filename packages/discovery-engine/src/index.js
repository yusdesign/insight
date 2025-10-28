import { ArchetypeDiscoverer } from './ArchetypeDiscoverer.js';
import { KnowledgeCollective } from './KnowledgeCollective.js';
import { PatternFragment } from './PatternFragment.js';

export class ArchetypalDiscoveryEngine {
  constructor() {
    this.discoverer = new ArchetypeDiscoverer();
    this.collective = new KnowledgeCollective();
    this.isLearning = true;
  }

  async analyze(code, context = {}) {
    try {
      const analysis = await this.discoverer.analyzeCode(code, context);
      
      if (analysis.success && this.isLearning) {
        const fragment = PatternFragment.createFromCode(code, context);
        this.collective.addFragment(fragment, analysis);
      }

      return {
        ...analysis,
        collectiveInsights: this.collective.getCollectiveInsights()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        collectiveInsights: this.collective.getCollectiveInsights()
      };
    }
  }

  getDiscoverySummary() {
    const discovererSummary = this.discoverer.getDiscoverySummary();
    const collectiveInsights = this.collective.getCollectiveInsights();

    return {
      ...discovererSummary,
      collective: collectiveInsights,
      overallConfidence: collectiveInsights.confidenceMetrics.averageConfidence
    };
  }

  enableLearning() {
    this.isLearning = true;
    return 'Learning enabled - engine will accumulate knowledge';
  }

  disableLearning() {
    this.isLearning = false;
    return 'Learning disabled - engine will only analyze';
  }
}

// Default export
export default ArchetypalDiscoveryEngine;
