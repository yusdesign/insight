import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

console.log('🧬 ARCHITECTURAL DNA ANALYSIS');
console.log('='.repeat(50));
console.log('🎯 Discovering Fundamental Pattern Foundations\n');

// Different architectural styles that share class-based foundation
const architecturalStyles = [
  {
    name: "🏛️ CLASSICAL OOP",
    code: `
    class BankAccount {
      constructor(balance = 0) {
        this.balance = balance;
      }
      
      deposit(amount) {
        this.balance += amount;
        return this.balance;
      }
      
      withdraw(amount) {
        if (amount <= this.balance) {
          this.balance -= amount;
          return amount;
        }
        throw new Error('Insufficient funds');
      }
    }
    `
  },
  {
    name: "⚡ MODERN MICROSERVICES", 
    code: `
    class UserService {
      constructor(userRepository, eventBus) {
        this.userRepository = userRepository;
        this.eventBus = eventBus;
      }
      
      async createUser(userData) {
        const user = await this.userRepository.save(userData);
        await this.eventBus.publish('UserCreated', user);
        return user;
      }
      
      async getUser(id) {
        return this.userRepository.findById(id);
      }
    }
    `
  },
  {
    name: "🎯 FUNCTIONAL CORE",
    code: `
    class DataProcessor {
      constructor(transformations = []) {
        this.transformations = transformations;
      }
      
      pipe(transformation) {
        return new DataProcessor([...this.transformations, transformation]);
      }
      
      process(data) {
        return this.transformations.reduce(
          (result, transformation) => transformation(result),
          data
        );
      }
    }
    `
  },
  {
    name: "🔮 REACTIVE STREAMS",
    code: `
    class Observable {
      constructor(subscribe) {
        this.subscribe = subscribe;
      }
      
      map(transform) {
        return new Observable(observer => {
          return this.subscribe({
            next: value => observer.next(transform(value)),
            error: err => observer.error(err),
            complete: () => observer.complete()
          });
        });
      }
      
      filter(predicate) {
        return new Observable(observer => {
          return this.subscribe({
            next: value => {
              if (predicate(value)) observer.next(value);
            },
            error: err => observer.error(err),
            complete: () => observer.complete()
          });
        });
      }
    }
    `
  }
];

async function analyzeArchitecturalDNA() {
  const bridge = new StandaloneBridge();
  const dnaResults = [];
  
  for (const style of architecturalStyles) {
    console.log(style.name);
    console.log('─'.repeat(40));
    
    const result = await bridge.comprehensiveAnalysisWithDiscovery(
      style.code,
      { architecturalStyle: style.name }
    );
    
    // Extract the architectural signature
    const signature = {
      style: style.name,
      primaryPattern: result.archetypal.matches[0]?.pattern || 'Unknown',
      confidence: result.archetypal.confidence,
      patternCount: result.archetypal.matches.length,
      sharedPatterns: result.archetypal.matches.map(m => m.pattern)
    };
    
    dnaResults.push(signature);
    
    console.log(`🎯 Primary Pattern: ${signature.primaryPattern}`);
    console.log(`📈 Confidence: ${(signature.confidence * 100).toFixed(1)}%`);
    console.log(`🔗 Shared Patterns: ${signature.sharedPatterns.join(', ')}`);
    console.log();
    
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  // Architectural DNA Analysis
  console.log('🧬 ARCHITECTURAL DNA REPORT');
  console.log('='.repeat(50));
  
  // Find common patterns across all styles
  const allPatterns = dnaResults.flatMap(r => r.sharedPatterns);
  const patternFrequency = allPatterns.reduce((freq, pattern) => {
    freq[pattern] = (freq[pattern] || 0) + 1;
    return freq;
  }, {});
  
  console.log('📊 PATTERN FREQUENCY ACROSS ARCHITECTURAL STYLES:');
  Object.entries(patternFrequency)
    .sort((a, b) => b[1] - a[1])
    .forEach(([pattern, count]) => {
      const percentage = (count / architecturalStyles.length) * 100;
      console.log(`   ${pattern}: ${count}/${architecturalStyles.length} styles (${percentage}%)`);
    });
  
  // Universal patterns (appear in all styles)
  const universalPatterns = Object.entries(patternFrequency)
    .filter(([_, count]) => count === architecturalStyles.length)
    .map(([pattern]) => pattern);
  
  console.log('\n🌍 UNIVERSAL ARCHITECTURAL PATTERNS:');
  universalPatterns.forEach(pattern => {
    console.log(`   ✅ ${pattern} - Found in ALL architectural styles`);
  });
  
  console.log('\n🎯 KEY INSIGHT:');
  if (universalPatterns.includes('ClassConstructor')) {
    console.log('   🏛️  Class-based architecture is the COMMON DNA across all modern software patterns!');
    console.log('   🔮 This reveals the fundamental building blocks of software design!');
  }
  
  const summary = bridge.getIntegratedSummary();
  console.log(`\n🚀 Engine analyzed ${summary.integrationMetrics.totalIntegratedAnalyses} architectural styles`);
  console.log(`📈 With ${(summary.integrationMetrics.averageConfidence * 100).toFixed(1)}% average confidence`);
}

analyzeArchitecturalDNA().catch(console.error);
