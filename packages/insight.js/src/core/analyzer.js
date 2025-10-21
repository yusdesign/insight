import { removeStopwords } from 'stopword';
import { stemmer } from 'stemmer';

export class HolisticAnalyzer {
  constructor(config = {}) {
    this.config = config;
    this.analysisCache = new Map();
  }

  async comprehensiveAnalysis(code, context = {}) {
    const cacheKey = this.generateCacheKey(code, context);
    
    if (this.analysisCache.has(cacheKey)) {
      return this.analysisCache.get(cacheKey);
    }

    // Perform multi-faceted analysis
    const purposeAnalysis = await this.analyzePurpose(code);
    const qualityAnalysis = await this.analyzeQuality(code);
    const maintainabilityAnalysis = await this.analyzeMaintainability(code);
    const performanceAnalysis = await this.analyzePerformance(code);
    const architecturalAnalysis = await this.analyzeArchitecture(code);

    const analysis = {
      purpose: purposeAnalysis,
      quality: qualityAnalysis,
      maintainability: maintainabilityAnalysis,
      performance: performanceAnalysis,
      architecture: architecturalAnalysis,
      metrics: this.calculateOverallMetrics(code),
      confidence: this.calculateOverallConfidence([
        purposeAnalysis.confidence,
        qualityAnalysis.confidence,
        maintainabilityAnalysis.confidence,
        performanceAnalysis.confidence
      ]),
      timestamp: new Date().toISOString()
    };

    this.analysisCache.set(cacheKey, analysis);
    return analysis;
  }

  async analyzePurpose(code) {
    const features = this.extractPurposeFeatures(code);
    const patterns = this.detectPurposePatterns(code);
    
    const primaryPurpose = this.determinePrimaryPurpose(features, patterns);
    const secondaryPurposes = this.findSecondaryPurposes(features, patterns);
    
    return {
      primaryPurpose,
      secondaryPurposes,
      features,
      patterns,
      confidence: this.calculatePurposeConfidence(primaryPurpose, patterns)
    };
  }

  async analyzeQuality(code) {
    const anomalies = this.detectQualityAnomalies(code);
    const smells = this.detectCodeSmells(code);
    const metrics = this.calculateQualityMetrics(code);
    
    return {
      anomalies,
      smells,
      metrics,
      score: this.calculateQualityScore(anomalies, smells, metrics),
      confidence: this.calculateQualityConfidence(anomalies, smells)
    };
  }

  async analyzeMaintainability(code) {
    const complexity = this.analyzeComplexity(code);
    const readability = this.analyzeReadability(code);
    const testability = this.analyzeTestability(code);
    
    return {
      complexity,
      readability,
      testability,
      score: this.calculateMaintainabilityScore(complexity, readability, testability),
      confidence: 0.8
    };
  }

  async analyzePerformance(code) {
    const considerations = this.identifyPerformanceConsiderations(code);
    const patterns = this.detectPerformancePatterns(code);
    const optimizations = this.suggestPerformanceOptimizations(code);
    
    return {
      considerations,
      patterns,
      optimizations,
      score: this.calculatePerformanceScore(considerations, patterns),
      confidence: 0.7
    };
  }

  async analyzeArchitecture(code) {
    const patterns = this.detectArchitecturalPatterns(code);
    const structure = this.analyzeCodeStructure(code);
    const dependencies = this.analyzeDependencies(code);
    
    return {
      patterns,
      structure,
      dependencies,
      score: this.calculateArchitectureScore(patterns, structure),
      confidence: 0.75
    };
  }

  async compareCodeVersions(versions, criteria) {
    const comparisons = [];
    
    for (const version of versions) {
      const analysis = await this.comprehensiveAnalysis(version.code);
      const scores = this.calculateVersionScores(analysis, criteria);
      
      comparisons.push({
        name: version.name,
        scores,
        analysis: this.summarizeAnalysis(analysis),
        confidence: analysis.confidence
      });
    }
    
    return {
      versions: comparisons,
      criteria,
      confidence: this.calculateComparisonConfidence(comparisons)
    };
  }

  async detectArchitecturalPatterns(code, specificPatterns = []) {
    const patterns = [];
    const antiPatterns = [];
    const recommendations = [];
    
    // Detect MVC pattern
    if (this.detectMVCPattern(code)) {
      patterns.push({
        type: 'mvc',
        confidence: 0.8,
        description: 'Model-View-Controller architecture detected'
      });
    }
    
    // Detect layered architecture
    if (this.detectLayeredArchitecture(code)) {
      patterns.push({
        type: 'layered',
        confidence: 0.7,
        description: 'Layered architecture pattern detected'
      });
    }
    
    // Detect microservices patterns
    if (this.detectMicroservicePatterns(code)) {
      patterns.push({
        type: 'microservice',
        confidence: 0.6,
        description: 'Microservice architecture characteristics detected'
      });
    }
    
    // Detect anti-patterns
    if (this.detectGodObject(code)) {
      antiPatterns.push({
        type: 'god-object',
        confidence: 0.8,
        description: 'God object anti-pattern detected - class has too many responsibilities',
        impact: 'high'
      });
      
      recommendations.push({
        type: 'refactor',
        action: 'Break down god object into smaller, focused classes',
        priority: 'high'
      });
    }
    
    if (this.detectSpaghettiCode(code)) {
      antiPatterns.push({
        type: 'spaghetti-code',
        confidence: 0.7,
        description: 'Spaghetti code structure detected - high coupling and low cohesion',
        impact: 'medium'
      });
    }
    
    return {
      detected: patterns,
      antiPatterns,
      recommendations,
      confidence: this.calculatePatternConfidence(patterns, antiPatterns)
    };
  }

  // Helper methods for pattern detection
  detectMVCPattern(code) {
    const modelIndicators = /class.*Model|interface.*Data|type.*State/i;
    const viewIndicators = /render\(|\.innerHTML|createElement|JSX/i;
    const controllerIndicators = /handle|controller|update.*State|dispatch/i;
    
    return modelIndicators.test(code) && 
           (viewIndicators.test(code) || controllerIndicators.test(code));
  }

  detectLayeredArchitecture(code) {
    const layerIndicators = [
      /service.*layer|business.*logic/i,
      /data.*access|repository|dao/i,
      /presentation|view|controller/i
    ];
    
    return layerIndicators.filter(indicator => indicator.test(code)).length >= 2;
  }

  detectMicroservicePatterns(code) {
    const microserviceIndicators = [
      /module\.exports|exports\./,
      /http.*server|express|fastify/i,
      /api.*endpoint|route.*handler/i,
      /service.*discovery|load.*balancer/i
    ];
    
    return microserviceIndicators.filter(indicator => indicator.test(code)).length >= 2;
  }

  detectGodObject(code) {
    const largeClass = /class\s+\w+\s*{[\s\S]{500,}}/;
    const manyMethods = (code.match(/\w+\([^)]*\)\s*{/g) || []).length > 10;
    const mixedResponsibilities = /DOM.*update|render.*data|calculate.*style/i;
    
    return largeClass.test(code) && manyMethods && mixedResponsibilities.test(code);
  }

  detectSpaghettiCode(code) {
    const highNesting = this.calculateNestingDepth(code) > 5;
    const longMethods = /function\s+\w+\([^)]*\)\s*{[\s\S]{200,}}/g.test(code);
    const globalVariables = /var\s+\w+\s*=/g.test(code);
    
    return highNesting && longMethods && globalVariables;
  }

  // Additional helper methods
  extractPurposeFeatures(code) {
    return {
      hasDOM: /document|window|getElement/.test(code),
      hasNetwork: /fetch|axios|http/.test(code),
      hasStorage: /localStorage|sessionStorage|database/.test(code),
      hasCalculations: /[\+\-\*\/]=|Math\./.test(code),
      hasValidation: /if.*===|throw|Error|validate/.test(code),
      hasTransformation: /map\(|filter\(|reduce\(|JSON\./.test(code)
    };
  }

  detectPurposePatterns(code) {
    const patterns = [];
    
    if (/function\s+create|factory|builder/i.test(code)) {
      patterns.push({ type: 'creation', confidence: 0.8 });
    }
    
    if (/addEventListener|\.on\(|\.subscribe\(/i.test(code)) {
      patterns.push({ type: 'event-handling', confidence: 0.7 });
    }
    
    if (/async|await|Promise|\.then\(/i.test(code)) {
      patterns.push({ type: 'async-processing', confidence: 0.9 });
    }
    
    if (/class|constructor|this\./i.test(code)) {
      patterns.push({ type: 'object-oriented', confidence: 0.8 });
    }
    
    return patterns;
  }

  determinePrimaryPurpose(features, patterns) {
    const scores = {
      'ui-rendering': features.hasDOM ? 0.9 : 0,
      'api-communication': features.hasNetwork ? 0.8 : 0,
      'data-processing': (features.hasCalculations || features.hasTransformation) ? 0.7 : 0,
      'validation': features.hasValidation ? 0.6 : 0,
      'utility': 0.3
    };
    
    // Adjust scores based on patterns
    patterns.forEach(pattern => {
      if (pattern.type === 'async-processing') scores['api-communication'] += 0.2;
      if (pattern.type === 'creation') scores['data-processing'] += 0.2;
    });
    
    let maxScore = 0;
    let primaryPurpose = 'utility';
    
    for (const [purpose, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        primaryPurpose = purpose;
      }
    }
    
    return {
      purpose: primaryPurpose,
      confidence: Math.min(maxScore, 0.95),
      description: this.getPurposeDescription(primaryPurpose)
    };
  }

  getPurposeDescription(purpose) {
    const descriptions = {
      'ui-rendering': 'Renders user interface elements',
      'api-communication': 'Handles API calls and network communication',
      'data-processing': 'Processes and transforms data',
      'validation': 'Validates input and business rules',
      'utility': 'General utility functions'
    };
    
    return descriptions[purpose] || 'General purpose code';
  }

  findSecondaryPurposes(features, patterns) {
    const purposes = [];
    
    if (features.hasStorage && !features.hasNetwork) {
      purposes.push({ purpose: 'data-storage', confidence: 0.6 });
    }
    
    if (patterns.some(p => p.type === 'event-handling')) {
      purposes.push({ purpose: 'event-management', confidence: 0.7 });
    }
    
    return purposes.slice(0, 3);
  }

  // ... Additional helper methods for quality, maintainability, performance analysis

  calculateOverallConfidence(confidences) {
    const avg = confidences.reduce((a, b) => a + b, 0) / confidences.length;
    return Math.min(avg * 1.1, 0.95);
  }

  generateCacheKey(code, context) {
    const contextString = JSON.stringify(context);
    return `${this.simpleHash(code)}:${this.simpleHash(contextString)}`;
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  // Placeholder implementations for other analysis methods

  calculatePurposeConfidence(primaryPurpose, patterns) {
    let baseConfidence = primaryPurpose.confidence;
    
    // Boost confidence based on pattern matches
    if (patterns.length > 2) baseConfidence += 0.1;
    if (patterns.some(p => p.confidence > 0.8)) baseConfidence += 0.15;
    
    return Math.min(baseConfidence, 0.95);
  }

  detectQualityAnomalies(code) {
    const anomalies = [];
    
    // Check for long functions
    const longFunctions = code.match(/function\s+\w+\([^)]*\)\s*{[\s\S]{200,}?}/g);
    if (longFunctions) {
      anomalies.push({
        type: 'long-function',
        description: 'Function is too long',
        severity: 'medium',
        confidence: 0.7
      });
    }
    
    // Check for deep nesting
    if (this.calculateNestingDepth(code) > 4) {
      anomalies.push({
        type: 'deep-nesting',
        description: 'Code has too many nested levels',
        severity: 'medium',
        confidence: 0.6
      });
    }
    
    return anomalies;
  }

  detectCodeSmells(code) {
    const smells = [];
    
    // Magic numbers
    const magicNumbers = code.match(/\b\d{3,}\b/g);
    if (magicNumbers && magicNumbers.length > 2) {
      smells.push({
        type: 'magic-numbers',
        description: 'Multiple magic numbers detected',
        severity: 'low',
        confidence: 0.5
      });
    }
    
    // Complex conditions
    const complexConditions = code.match(/if\s*\([^)]{50,}\)/g);
    if (complexConditions) {
      smells.push({
        type: 'complex-condition',
        description: 'Overly complex conditional logic',
        severity: 'medium',
        confidence: 0.6
      });
    }
    
    return smells;
  }

  calculateQualityMetrics(code) {
    const lines = code.split('\n').length;
    const functions = (code.match(/function\s+\w+\(/g) || []).length;
    const complexity = this.calculateSimpleComplexity(code);
    
    return {
      lineCount: lines,
      functionCount: functions,
      complexityScore: complexity,
      commentDensity: this.calculateCommentDensity(code)
    };
  }

  calculateQualityScore(anomalies, smells, metrics) {
    let score = 0.8; // Base score
    
    // Deduct for anomalies
    score -= anomalies.length * 0.1;
    score -= smells.length * 0.05;
    
    // Deduct for high complexity
    if (metrics.complexityScore > 0.7) score -= 0.2;
    
    return Math.max(score, 0.1);
  }

  calculateQualityConfidence(anomalies, smells) {
    const evidenceCount = anomalies.length + smells.length;
    if (evidenceCount === 0) return 0.9;
    
    return Math.min(0.3 + (evidenceCount * 0.1), 0.95);
  }

  analyzeComplexity(code) {
    const nesting = this.calculateNestingDepth(code);
    const decisionPoints = (code.match(/(if|else|case|default|\?|&&|\|\|)/g) || []).length;
    
    return {
      cyclomatic: decisionPoints + 1,
      nestingDepth: nesting,
      overall: Math.min((decisionPoints + nesting) / 10, 1.0)
    };
  }

  analyzeReadability(code) {
    const lines = code.split('\n');
    const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
    const commentDensity = this.calculateCommentDensity(code);
    
    let score = 0.7; // Base score
    if (avgLineLength < 80) score += 0.1;
    if (commentDensity > 0.1) score += 0.1;
    if (this.calculateNestingDepth(code) < 3) score += 0.1;
    
    return {
      score: Math.min(score, 1.0),
      avgLineLength,
      commentDensity
    };
  }

  analyzeTestability(code) {
    const complexity = this.analyzeComplexity(code);
    const hasPureFunctions = /function\s+\w+\([^)]*\)\s*{[\s\S]*?return[^}]*}/.test(code);
    
    let score = 0.5;
    if (hasPureFunctions) score += 0.2;
    if (complexity.overall < 0.5) score += 0.2;
    if (complexity.nestingDepth < 3) score += 0.1;
    
    return {
      score: Math.min(score, 1.0),
      hasPureFunctions,
      complexity: complexity.overall
    };
  }

  calculateMaintainabilityScore(complexity, readability, testability) {
    return (complexity.overall * 0.3 + readability.score * 0.4 + testability.score * 0.3);
  }

  identifyPerformanceConsiderations(code) {
    const considerations = [];
    
    if (/(for|while).*\.length/.test(code)) {
      considerations.push({
        type: 'loop-length-recalculation',
        description: 'Array length recalculated in loop condition',
        impact: 'low'
      });
    }
    
    if (/JSON\.parse.*JSON\.stringify/.test(code)) {
      considerations.push({
        type: 'unnecessary-serialization',
        description: 'Potential unnecessary JSON serialization/deserialization',
        impact: 'medium'
      });
    }
    
    return considerations;
  }

  detectPerformancePatterns(code) {
    const patterns = [];
    
    if (/async.*await/.test(code)) {
      patterns.push({
        type: 'async-await',
        description: 'Uses modern async/await pattern',
        confidence: 0.8
      });
    }
    
    if (/\.map\(.*=>/.test(code)) {
      patterns.push({
        type: 'functional-transformation',
        description: 'Uses functional array methods',
        confidence: 0.7
      });
    }
    
    return patterns;
  }

  suggestPerformanceOptimizations(code) {
    const optimizations = [];
    
    if (/(for|while).*\.length/.test(code)) {
      optimizations.push({
        type: 'cache-array-length',
        description: 'Cache array length outside loop',
        priority: 'low'
      });
    }
    
    return optimizations;
  }

  calculatePerformanceScore(considerations, patterns) {
    let score = 0.8; // Base score
    
    // Deduct for performance considerations
    score -= considerations.length * 0.1;
    
    // Boost for good patterns
    if (patterns.length > 0) score += 0.1;
    
    return Math.max(score, 0.1);
  }

  analyzeCodeStructure(code) {
    const lines = code.split('\n');
    const functions = (code.match(/function\s+\w+\(/g) || []).length;
    const classes = (code.match(/class\s+\w+/g) || []).length;
    
    return {
      lineCount: lines.length,
      functionCount: functions,
      classCount: classes,
      avgFunctionLength: functions > 0 ? lines.length / functions : 0
    };
  }

  analyzeDependencies(code) {
    const imports = code.match(/(import|require).*from.*['"`]([^'"`]+)['"`]/g) || [];
    const externalCalls = code.match(/\b\w+\.\w+\(/g) || [];
    
    return {
      imports: imports.length,
      externalCalls: externalCalls.length,
      dependencies: imports.map(imp => {
        const match = imp.match(/['"`]([^'"`]+)['"`]/);
        return match ? match[1] : 'unknown';
      })
    };
  }

  calculateArchitectureScore(patterns, structure) {
    let score = 0.7; // Base score
    
    // Safely check for patterns
    if (patterns && patterns.detected && patterns.detected.length > 0) {
      score += 0.2;
    }
    
    // Safely check for structure
    if (structure && structure.avgFunctionLength > 50) {
      score -= 0.1;
    }
    
    return Math.min(score, 1.0);
  }

  calculatePatternConfidence(patterns, antiPatterns) {
    // Safely handle undefined inputs
    const detectedPatterns = patterns?.detected || [];
    const antiPatternsList = antiPatterns || [];
    
    const totalPatterns = detectedPatterns.length + antiPatternsList.length;
    if (totalPatterns === 0) return 0.3;
    
    const patternConfidence = detectedPatterns.length > 0 
      ? detectedPatterns.reduce((sum, pattern) => sum + (pattern.confidence || 0.5), 0) / detectedPatterns.length
      : 0.5;
    
    const antiPatternConfidence = antiPatternsList.length > 0
      ? antiPatternsList.reduce((sum, pattern) => sum + (pattern.confidence || 0.5), 0) / antiPatternsList.length
      : 0.5;
    
    return (patternConfidence + antiPatternConfidence) / 2;
  }

  calculateOverallMetrics(code) {
    const structure = this.analyzeCodeStructure(code);
    const complexity = this.analyzeComplexity(code);
    
    return {
      size: structure.lineCount,
      complexity: complexity.overall,
      functionDensity: structure.functionCount / Math.max(structure.lineCount, 1),
      maintainability: this.calculateMaintainabilityScore(
        complexity,
        this.analyzeReadability(code),
        this.analyzeTestability(code)
      )
    };
  }

  calculateCommentDensity(code) {
    const lines = code.split('\n');
    const commentLines = lines.filter(line => 
      line.trim().startsWith('//') || line.includes('/*')
    ).length;
    return lines.length > 0 ? commentLines / lines.length : 0;
  }

  calculateSimpleComplexity(code) {
    const decisionPoints = (code.match(/(if|else|case|\?|&&|\|\|)/g) || []).length;
    const loops = (code.match(/(for|while|forEach)/g) || []).length;
    return Math.min((decisionPoints + loops) / 15, 1.0);
  }

  summarizeAnalysis(analysis) {
    return {
      purpose: analysis.purpose.primaryPurpose.purpose,
      qualityScore: analysis.quality.score,
      maintainabilityScore: analysis.maintainability.score,
      performanceScore: analysis.performance.score,
      architectureScore: analysis.architecture.score
    };
  }

  calculateComparisonConfidence(comparisons) {
    const avgConfidence = comparisons.reduce((sum, comp) => 
      sum + comp.confidence, 0
    ) / comparisons.length;
    return Math.min(avgConfidence * 1.1, 0.95);
  } 

  calculateNestingDepth(code) {
    let maxDepth = 0;
    let currentDepth = 0;
    for (const char of code) {
      if (char === '{') currentDepth++;
      else if (char === '}') currentDepth--;
      maxDepth = Math.max(maxDepth, currentDepth);
    }
    return maxDepth;
  }
}
