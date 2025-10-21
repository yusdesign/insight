import { PurposeIdentifier } from './core/identifier.js';
import { GoalAligner } from './core/aligner.js';

export default class PointJS {
  constructor(config = {}) {
    this.config = {
      confidenceThreshold: config.confidenceThreshold || 0.6,
      debug: config.debug || false,
      ...config
    };
    
    this.identifier = new PurposeIdentifier();
    this.aligner = new GoalAligner();
    
    if (this.config.debug) {
      console.log('🔧 Point.js initialized with config:', this.config);
    }
  }

  async identify(code, context = {}) {
    try {
      const analysis = await this.identifier.identify(code);
      
      if (this.config.debug) {
        console.log('🎯 Purpose identification result:', analysis);
      }
      
      return analysis;
    } catch (error) {
      console.error('❌ Purpose identification failed:', error);
      return this.getFallbackAnalysis();
    }
  }

  async isAligned(goal, code) {
    try {
      const alignment = await this.aligner.checkAlignment(goal, code);
      
      if (this.config.debug) {
        console.log('🎯 Goal alignment result:', alignment);
      }
      
      return alignment;
    } catch (error) {
      console.error('❌ Goal alignment check failed:', error);
      return this.getFallbackAlignment();
    }
  }

  extractGoals(code) {
    const goalRegex = /\/\/\s*(TODO|FIXME|NOTE|OPTIMIZE|HACK|BUG):\s*(.*)/gi;
    const goals = [];
    let match;
    
    while ((match = goalRegex.exec(code)) !== null) {
      goals.push({
        type: match[1].toLowerCase(),
        goal: match[2].trim(),
        priority: this.getGoalPriority(match[1])
      });
    }
    
    return goals;
  }

  getGoalPriority(type) {
    const priorities = {
      'FIXME': 'high',
      'BUG': 'high', 
      'TODO': 'medium',
      'OPTIMIZE': 'medium',
      'HACK': 'low',
      'NOTE': 'low'
    };
    
    return priorities[type] || 'medium';
  }

  getFallbackAnalysis() {
    return {
      primaryPurpose: {
        purpose: 'unknown',
        description: 'Analysis unavailable',
        confidence: 0.1
      },
      purposes: [],
      confidence: 0.1
    };
  }

  getFallbackAlignment() {
    return {
      aligned: false,
      score: 0.1,
      matches: []
    };
  }

  getVersion() {
    return '1.0.0';
  }
}

export { PurposeIdentifier, GoalAligner };
