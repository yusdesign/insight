import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

// Samples specifically designed to trigger NOVEL pattern detection
const novelPatternSamples = [
  // 1. Clear Builder Pattern
  `
  class ConfigurationBuilder {
    constructor() {
      this.settings = {};
    }
    
    withDatabase(url) {
      this.settings.databaseUrl = url;
      return this;
    }
    
    withCache(enable) {
      this.settings.cacheEnabled = enable;
      return this;
    }
    
    withTimeout(seconds) {
      this.settings.timeout = seconds;
      return this;
    }
    
    build() {
      return new AppConfiguration(this.settings);
    }
  }
  `,

  // 2. Clear Factory Pattern
  `
  class LoggerFactory {
    static createLogger(type, options = {}) {
      switch (type) {
        case 'console':
          return new ConsoleLogger(options.level);
        case 'file':
          return new FileLogger(options.path, options.level);
        case 'remote':
          return new RemoteLogger(options.endpoint, options.level);
        default:
          throw new Error('Unknown logger type: ' + type);
      }
    }
  }
  `,

  // 3. Strategy Pattern
  `
  class PaymentStrategy {
    execute(amount) {
      throw new Error('Method not implemented');
    }
  }
  
  class CreditCardStrategy extends PaymentStrategy {
    execute(amount) {
      console.log('Processing credit card payment:', amount);
      return { success: true, method: 'credit_card' };
    }
  }
  
  class PayPalStrategy extends PaymentStrategy {
    execute(amount) {
      console.log('Processing PayPal payment:', amount);
      return { success: true, method: 'paypal' };
    }
  }
  
  class PaymentContext {
    constructor(strategy) {
      this.strategy = strategy;
    }
    
    processPayment(amount) {
      return this.strategy.execute(amount);
    }
  }
  `,

  // 4. Observer Pattern
  `
  class EventEmitter {
    constructor() {
      this.listeners = new Map();
    }
    
    on(event, listener) {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, []);
      }
      this.listeners.get(event).push(listener);
    }
    
    emit(event, data) {
      if (this.listeners.has(event)) {
        this.listeners.get(event).forEach(listener => listener(data));
      }
    }
    
    off(event, listener) {
      if (this.listeners.has(event)) {
        const filtered = this.listeners.get(event).filter(l => l !== listener);
        this.listeners.set(event, filtered);
      }
    }
  }
  `,

  // 5. Decorator Pattern
  `
  class Coffee {
    cost() {
      return 5;
    }
    
    description() {
      return 'Simple coffee';
    }
  }
  
  class MilkDecorator {
    constructor(coffee) {
      this.coffee = coffee;
    }
    
    cost() {
      return this.coffee.cost() + 2;
    }
    
    description() {
      return this.coffee.description() + ', with milk';
    }
  }
  
  class SugarDecorator {
    constructor(coffee) {
      this.coffee = coffee;
    }
    
    cost() {
      return this.coffee.cost() + 1;
    }
    
    description() {
      return this.coffee.description() + ', with sugar';
    }
  }
  `
];

async function testNovelPatternDetection() {
  console.log('🎨 NOVEL PATTERN DETECTION TEST');
  console.log('='.repeat(50) + '\n');
  
  const bridge = new StandaloneBridge();
  let novelPatternsFound = 0;
  
  for (let i = 0; i < novelPatternSamples.length; i++) {
    console.log(`🔍 TESTING SAMPLE ${i + 1} - Looking for novel patterns...`);
    
    const result = await bridge.comprehensiveAnalysisWithDiscovery(
      novelPatternSamples[i],
      { sampleId: i, test: 'novel-patterns' }
    );
    
    console.log('📝 Sample Type:', getSampleType(i));
    
    // Check for novel patterns
    if (result.archetypal.novelPatterns && result.archetypal.novelPatterns.length > 0) {
      console.log('🎉 NOVEL PATTERNS DETECTED:');
      result.archetypal.novelPatterns.forEach(novel => {
        console.log(`   - ${novel.pattern} (${(novel.confidence * 100).toFixed(1)}% confidence)`);
        console.log(`     ${novel.description}`);
        novelPatternsFound++;
      });
    } else {
      console.log('   No novel patterns detected');
    }
    
    // Show what WAS detected
    if (result.archetypal.matches.length > 0) {
      console.log('   Known patterns:', 
        result.archetypal.matches.map(m => m.pattern).join(', ')
      );
    }
    
    console.log('─'.repeat(50) + '\n');
    
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  // Summary
  console.log('🎊 NOVEL PATTERN DETECTION SUMMARY');
  console.log('='.repeat(50));
  console.log(`📊 Total samples tested: ${novelPatternSamples.length}`);
  console.log(`🎯 Novel patterns found: ${novelPatternsFound}`);
  console.log(`📈 Success rate: ${((novelPatternsFound / novelPatternSamples.length) * 100).toFixed(1)}%`);
  
  const discoverySummary = bridge.getIntegratedSummary();
  if (discoverySummary.archetypalDiscovery.candidateArchetypes > 0) {
    console.log('\n🌟 CANDIDATE ARCHETYPES IDENTIFIED:');
    discoverySummary.archetypalDiscovery.topCandidates.forEach(candidate => {
      console.log(`   - ${candidate.name} (${(candidate.confidence * 100).toFixed(1)}% confidence)`);
    });
  }
}

function getSampleType(index) {
  const types = [
    'Builder Pattern',
    'Factory Pattern', 
    'Strategy Pattern',
    'Observer Pattern',
    'Decorator Pattern'
  ];
  return types[index] || 'Unknown Pattern';
}

// Run the novel pattern test
testNovelPatternDetection().catch(console.error);
