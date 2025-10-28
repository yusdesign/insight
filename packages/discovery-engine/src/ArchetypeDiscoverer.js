import { PatternFragment } from './PatternFragment.js';

export class ArchetypeDiscoverer {
  constructor() {
    this.knownPatterns = new Map();
    this.candidateArchetypes = new Map();
    this.observationCount = 0;
    
    // Initialize with some basic patterns
    this.initializeBasicPatterns();
  }

  initializeBasicPatterns() {
    // More specific architectural patterns
    const basicPatterns = {
      'RepositoryPattern': {
        indicators: ['Repository', 'find', 'save', 'get', 'delete', 'update'],
        confidence: 0.8,
        description: 'Data access abstraction pattern'
      },
      'ServicePattern': {
        indicators: ['Service', 'create', 'update', 'delete', 'process', 'handle'],
        confidence: 0.7,
        description: 'Business logic service pattern'
      },
      'AsyncHandler': {
        indicators: ['async', 'await', 'Promise', 'then', 'catch'],
        confidence: 0.6,
        description: 'Asynchronous operation handler'
      },
      'ClassConstructor': {
        indicators: ['class', 'constructor', 'this.'],
        confidence: 0.9,
        description: 'ES6 class with constructor'
      },
      'BuilderPattern': {  // Add builder as a known pattern now
        indicators: ['build', 'with', 'return this'],
        confidence: 0.5,
        description: 'Fluent interface builder'
      },
      'FactoryPattern': {  // Add factory as known pattern
        indicators: ['create', 'factory', 'static', 'new'],
        confidence: 0.5,
        description: 'Object creation factory'
      },
      'SagaPattern': {
        indicators: ['saga', 'orchestrat', 'compensat', 'rollback', 'transaction'],
        confidence: 0.4,
        description: 'Distributed transaction management pattern'
      },
      'CQRSPattern': {
        indicators: ['command', 'query', 'separat', 'readmodel', 'writemodel'],
        confidence: 0.4, 
        description: 'Command Query Responsibility Segregation'
      },
      'EventSourcing': {
        indicators: ['event', 'sourc', 'append', 'replay', 'aggregate'],
        confidence: 0.4,
        description: 'Event-based state management pattern'
      }
    };

    Object.entries(basicPatterns).forEach(([name, pattern]) => {
      this.knownPatterns.set(name, pattern);
    });
  }

  async analyzeCode(code, context = {}) {
    this.observationCount++;
    
    // Create fragment from code
    const fragment = PatternFragment.createFromCode(code, context);
    
    if (!fragment.isValid()) {
      return { success: false, error: 'Invalid code fragment' };
    }

    // Try to match with known patterns
    const matches = this.matchWithKnownPatterns(fragment);
    
    // Look for novel patterns
    const novelPatterns = this.detectNovelPatterns(fragment, matches);
    
    // Update knowledge
    await this.updateKnowledge(fragment, matches, novelPatterns);

    return {
      success: true,
      fragment: fragment.toJSON(),
      matches,
      novelPatterns,
      observationCount: this.observationCount,
      confidence: this.calculateAnalysisConfidence(matches, novelPatterns)
    };
  }

  matchWithKnownPatterns(fragment) {
    const matches = [];
    const code = fragment.observation.code.toLowerCase();

    for (const [patternName, pattern] of this.knownPatterns) {
      const indicatorCount = pattern.indicators.filter(indicator => 
        code.includes(indicator.toLowerCase())
      ).length;

      if (indicatorCount > 0) {
        const matchConfidence = Math.min(0.95, 
          pattern.confidence * (indicatorCount / pattern.indicators.length)
        );
        
        matches.push({
          pattern: patternName,
          confidence: matchConfidence,
          indicatorsFound: indicatorCount,
          description: pattern.description
        });
        
        // Reinforce the fragment
        fragment.reinforce();
      }
    }

    return matches.sort((a, b) => b.confidence - a.confidence);
  }

  // Add these novel pattern detectors to the detectNovelPatterns method:

  detectNovelPatterns(fragment, existingMatches) {
    if (existingMatches.length > 0) return [];

    const novelPatterns = [];
    const code = fragment.observation.code;
  
    // Enhanced novel pattern detection
    const potentialPatterns = [
      { 
        name: 'BuilderPattern', 
        trigger: ['build', 'create', 'with', 'return this'],
        required: 3,
        description: 'Fluent interface for object construction'
      },
      { 
        name: 'FactoryPattern', 
        trigger: ['create', 'factory', 'new', 'static', 'switch'],
        required: 3,
        description: 'Centralized object creation logic'
      },
      { 
        name: 'StrategyPattern', 
        trigger: ['strategy', 'execute', 'algorithm', 'context'],
        required: 2,
        description: 'Interchangeable algorithm selection'
      },
      { 
        name: 'ObserverPattern', 
        trigger: ['subscribe', 'emit', 'on', 'listener', 'event'],
        required: 2,
        description: 'Event-based communication pattern'
      },
      { 
        name: 'DecoratorPattern', 
        trigger: ['decorate', 'wrap', 'enhance', 'base', 'additional'],
        required: 2,
        description: 'Dynamic behavior augmentation'
      }
    ];

    potentialPatterns.forEach(pattern => {
      const triggersFound = pattern.trigger.filter(trigger => 
        code.toLowerCase().includes(trigger.toLowerCase())
      ).length;

      if (triggersFound >= pattern.required) {
        novelPatterns.push({
          pattern: pattern.name,
          confidence: 0.4, // Higher initial confidence for clearer patterns
          triggersFound,
          required: pattern.required,
          description: pattern.description,
          status: 'candidate'
        });
      }
    });

    // Additional structural pattern detection
    if (this.detectBuilderStructure(code)) {
      novelPatterns.push({
        pattern: 'BuilderPattern',
        confidence: 0.6,
        triggersFound: 4,
        description: 'Method chaining for object construction',
        status: 'strong-candidate'
      });
    }

    if (this.detectFactoryStructure(code)) {
      novelPatterns.push({
        pattern: 'FactoryPattern', 
        confidence: 0.55,
        triggersFound: 3,
        description: 'Centralized object creation with type switching',
        status: 'strong-candidate'
      });
    }

    if (this.detectStrategyStructure(code)) {
      novelPatterns.push({
        pattern: 'StrategyPattern',
        confidence: 0.5,
        description: 'Algorithm abstraction with multiple implementations',
        status: 'candidate'
      });
    }

    if (this.detectObserverStructure(code)) {
      novelPatterns.push({
        pattern: 'ObserverPattern',
        confidence: 0.5,
        description: 'Event subscription and notification system',
        status: 'candidate'
      });
    }
    
    if (this.detectSagaStructure(code)) {
      novelPatterns.push({
        pattern: 'SagaPattern',
        confidence: 0.7,
        description: 'Distributed transaction orchestration with compensation',
        status: 'enterprise-pattern'
      });
    }
    
    return novelPatterns;
  }

  // Add structural pattern detection methods
  detectBuilderStructure(code) {
    const lines = code.split('\n');
    let hasReturnThis = false;
    let hasMethodChaining = false;
    let hasBuildMethod = false;

    lines.forEach(line => {
      if (line.includes('return this')) hasReturnThis = true;
      if (line.includes('.') && line.includes('(') && line.includes(')')) hasMethodChaining = true;
      if (line.includes('build(')) hasBuildMethod = true;
    });

    return hasReturnThis && hasMethodChaining && hasBuildMethod;
  }

  detectFactoryStructure(code) {
    const lines = code.split('\n');
    let hasStaticMethod = false;
    let hasSwitch = false;
    let hasReturnNew = false;

    lines.forEach(line => {
      if (line.includes('static') && line.includes('create')) hasStaticMethod = true;
      if (line.includes('switch') || line.includes('case')) hasSwitch = true;
      if (line.includes('return new') || line.includes('new ')) hasReturnNew = true;
    });

    return hasStaticMethod && (hasSwitch || hasReturnNew);
  }

  detectStrategyStructure(code) {
    const lines = code.split('\n');
    let hasAbstractMethod = false;
    let hasMultipleImplementations = false;
    let hasContext = false;

    lines.forEach(line => {
      if (line.includes('throw new Error') && line.includes('not implemented')) hasAbstractMethod = true;
      if (line.includes('extends') && line.includes('Strategy')) hasMultipleImplementations = true;
      if (line.includes('Context') || line.includes('context')) hasContext = true;
    });

    return hasAbstractMethod && hasMultipleImplementations && hasContext;
  }

  detectObserverStructure(code) {
    const lines = code.split('\n');
    let hasListeners = false;
    let hasOnMethod = false;
    let hasEmitMethod = false;

    lines.forEach(line => {
      if (line.includes('listeners') || line.includes('observers')) hasListeners = true;
      if (line.includes('on(') || line.includes('subscribe(')) hasOnMethod = true;
      if (line.includes('emit(') || line.includes('notify(')) hasEmitMethod = true;
    });

    return hasListeners && hasOnMethod && hasEmitMethod;
  }

  // Enhanced saga pattern detection
  detectSagaStructure(code) {
    const lines = code.split('\n');
    let hasOrchestration = false;
    let hasCompensation = false;
    let hasTransactionManagement = false;
    let hasStepExecution = false;

    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes('orchestrat') || lowerLine.includes('saga')) hasOrchestration = true;
      if (lowerLine.includes('compensat') || lowerLine.includes('rollback')) hasCompensation = true;
      if (lowerLine.includes('transaction') || lowerLine.includes('workflow')) hasTransactionManagement = true;
      if (lowerLine.includes('step') && lowerLine.includes('execute')) hasStepExecution = true;
    });

    return hasOrchestration && hasCompensation && hasTransactionManagement;
  }
 
  async updateKnowledge(fragment, matches, novelPatterns) {
    // Reinforce known patterns
    matches.forEach(match => {
      if (this.knownPatterns.has(match.pattern)) {
        const pattern = this.knownPatterns.get(match.pattern);
        pattern.confidence = Math.min(0.95, pattern.confidence + 0.01);
      }
    });

    // Track novel patterns
    novelPatterns.forEach(novel => {
      const key = novel.pattern;
      if (this.candidateArchetypes.has(key)) {
        const existing = this.candidateArchetypes.get(key);
        existing.confidence = Math.min(0.7, existing.confidence + 0.05);
        existing.occurrences++;
      } else {
        this.candidateArchetypes.set(key, {
          ...novel,
          occurrences: 1,
          firstSeen: Date.now(),
          fragments: [fragment.id]
        });
      }
    });
  }

  calculateAnalysisConfidence(matches, novelPatterns) {
    if (matches.length > 0) {
      return matches[0].confidence;
    }
    if (novelPatterns.length > 0) {
      return novelPatterns[0].confidence;
    }
    return 0.1;
  }

  getDiscoverySummary() {
    return {
      totalObservations: this.observationCount,
      knownPatterns: this.knownPatterns.size,
      candidateArchetypes: this.candidateArchetypes.size,
      topCandidates: Array.from(this.candidateArchetypes.entries())
        .sort((a, b) => b[1].confidence - a[1].confidence)
        .slice(0, 5)
        .map(([name, data]) => ({ name, ...data }))
    };
  }
}
