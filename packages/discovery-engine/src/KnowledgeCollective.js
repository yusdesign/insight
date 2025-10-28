export class KnowledgeCollective {
  constructor() {
    this.fragments = new Map();
    this.patterns = new Map();
    this.analysisHistory = [];
    this.startTime = Date.now();
  }

  addFragment(fragment, analysisResult) {
    this.fragments.set(fragment.id, {
      fragment: fragment.toJSON(),
      analysis: analysisResult,
      addedAt: Date.now()
    });

    this.analysisHistory.push({
      timestamp: Date.now(),
      fragmentId: fragment.id,
      matches: analysisResult.matches,
      novelPatterns: analysisResult.novelPatterns,
      confidence: analysisResult.confidence
    });

    // Keep only recent history for memory management
    if (this.analysisHistory.length > 1000) {
      this.analysisHistory = this.analysisHistory.slice(-500);
    }
  }

  getPatternConfidence(patternName) {
    const occurrences = this.analysisHistory.filter(entry => 
      entry.matches.some(match => match.pattern === patternName) ||
      entry.novelPatterns.some(novel => novel.pattern === patternName)
    ).length;

    const totalAnalyses = this.analysisHistory.length;
    return totalAnalyses > 0 ? occurrences / totalAnalyses : 0;
  }

  getEmergingPatterns() {
    const patternCounts = new Map();
    
    this.analysisHistory.forEach(entry => {
      entry.novelPatterns.forEach(novel => {
        const count = patternCounts.get(novel.pattern) || 0;
        patternCounts.set(novel.pattern, count + 1);
      });
    });

    return Array.from(patternCounts.entries())
      .filter(([_, count]) => count >= 2) // At least 2 occurrences
      .sort((a, b) => b[1] - a[1])
      .map(([pattern, count]) => ({
        pattern,
        occurrences: count,
        confidence: Math.min(0.8, count * 0.2)
      }));
  }

  getCollectiveInsights() {
    const uptime = Date.now() - this.startTime;
    const hoursRunning = uptime / (1000 * 60 * 60);

    return {
      runtime: {
        hours: Math.round(hoursRunning * 100) / 100,
        totalFragments: this.fragments.size,
        totalAnalyses: this.analysisHistory.length
      },
      patterns: {
        known: Array.from(this.patterns.keys()),
        emerging: this.getEmergingPatterns()
      },
      confidenceMetrics: {
        averageConfidence: this.calculateAverageConfidence(),
        reliabilityScore: this.calculateReliabilityScore()
      }
    };
  }

  calculateAverageConfidence() {
    if (this.analysisHistory.length === 0) return 0;
    
    const totalConfidence = this.analysisHistory.reduce((sum, entry) => 
      sum + entry.confidence, 0
    );
    
    return totalConfidence / this.analysisHistory.length;
  }

  calculateReliabilityScore() {
    const analysesWithMatches = this.analysisHistory.filter(
      entry => entry.matches.length > 0 || entry.novelPatterns.length > 0
    ).length;

    return this.analysisHistory.length > 0 
      ? analysesWithMatches / this.analysisHistory.length 
      : 0;
  }
}
