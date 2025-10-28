import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

console.log('🍚 THE GRAIN OF RICE - ULTIMATE PATTERN DISCOVERY');
console.log('='.repeat(55));
console.log('🎯 How Tiny Details Reveal Architectural Truths\n');

// Patterns differentiated by tiny "grains of rice"
const grainPatterns = [
  {
    name: "THE RETURN THIS GRAIN",
    description: "Builder vs Factory - one tiny method chain",
    patterns: [
      {
        type: "🚀 BUILDER GRAIN",
        grain: "return this",
        code: `
        class ConfigBuilder {
          withHost(host) { this.host = host; return this; }
          withPort(port) { this.port = port; return this; }
          build() { return new Config(this); }
        }
        `,
        expected: "Method chaining enables fluent interfaces"
      },
      {
        type: "🏭 FACTORY GRAIN", 
        grain: "static create",
        code: `
        class ConfigFactory {
          static create(type) {
            return type === 'dev' ? new DevConfig() : new ProdConfig();
          }
        }
        `,
        expected: "Static methods enable centralized creation"
      }
    ]
  },
  {
    name: "THE ASYNC AWAIT GRAIN", 
    description: "Sync vs Async - one keyword difference",
    patterns: [
      {
        type: "⚡ SYNC GRAIN",
        grain: "synchronous",
        code: `
        class Calculator {
          add(a, b) { return a + b; }
          multiply(a, b) { return a * b; }
        }
        `,
        expected: "Direct computation without async concerns"
      },
      {
        type: "🌀 ASYNC GRAIN",
        grain: "async/await", 
        code: `
        class ApiClient {
          async getUser(id) {
            const response = await fetch('/users/' + id);
            return response.json();
          }
          
          async saveUser(user) {
            const response = await fetch('/users', {
              method: 'POST',
              body: JSON.stringify(user)
            });
            return response.json();
          }
        }
        `,
        expected: "Async operations require promise handling"
      }
    ]
  },
  {
    name: "THE EXTENDS GRAIN",
    description: "Inheritance vs Composition - one keyword",
    patterns: [
      {
        type: "🧬 INHERITANCE GRAIN",
        grain: "extends",
        code: `
        class Animal {
          speak() { return '...'; }
        }
        
        class Dog extends Animal {
          speak() { return 'Woof!'; }
        }
        `,
        expected: "Class inheritance for behavior sharing"
      },
      {
        type: "🔗 COMPOSITION GRAIN",
        grain: "constructor injection", 
        code: `
        class Speaker {
          speak() { return '...'; }
        }
        
        class Dog {
          constructor(speaker) {
            this.speaker = speaker;
          }
          
          speak() { return this.speaker.speak(); }
        }
        `,
        expected: "Object composition for behavior delegation"
      }
    ]
  }
];

async function discoverGrainsOfRice() {
  const bridge = new StandaloneBridge();
  let grainsDiscovered = 0;
  
  for (const grainGroup of grainPatterns) {
    console.log(grainGroup.name);
    console.log('📝 ' + grainGroup.description);
    console.log('─'.repeat(50));
    
    const grainResults = [];
    
    for (const pattern of grainGroup.patterns) {
      console.log(`\n🔍 ${pattern.type}`);
      console.log(`   🍚 Grain: "${pattern.grain}"`);
      
      const result = await bridge.comprehensiveAnalysisWithDiscovery(
        pattern.code,
        { grain: pattern.grain, group: grainGroup.name }
      );
      
      const analysis = {
        type: pattern.type,
        grain: pattern.grain,
        primaryPattern: result.archetypal.matches[0]?.pattern || 'Unknown',
        confidence: result.archetypal.confidence,
        uniquePatterns: findUniquePatterns(result, grainResults),
        expected: pattern.expected
      };
      
      grainResults.push(analysis);
      
      console.log(`   🎯 Detected: ${analysis.primaryPattern}`);
      console.log(`   📈 Confidence: ${(analysis.confidence * 100).toFixed(1)}%`);
      
      if (analysis.uniquePatterns.length > 0) {
        console.log(`   💫 Unique signatures: ${analysis.uniquePatterns.join(', ')}`);
        grainsDiscovered++;
      }
      
      console.log(`   🔮 Expected: ${analysis.expected}`);
    }
    
    console.log('\n' + '─'.repeat(50) + '\n');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // The Grand Revelation
  console.log('🎊 THE GRAIN OF RICE REVELATION');
  console.log('='.repeat(55));
  console.log(`🍚 Grains of rice discovered: ${grainsDiscovered}`);
  console.log('🎯 Each tiny detail reveals architectural intent!');
  console.log('\n🌌 UNIVERSAL TRUTHS DISCOVERED:');
  console.log('   1. Architecture emerges from small decisions');
  console.log('   2. Patterns are spectra, not categories');
  console.log('   3. Context transforms simple into sophisticated');
  console.log('   4. Our engine sees the DNA in the details!');
  
  const summary = bridge.getIntegratedSummary();
  console.log(`\n🚀 Engine has analyzed ${summary.integrationMetrics.totalIntegratedAnalyses} granular patterns`);
  console.log(`📈 With ${(summary.integrationMetrics.averageConfidence * 100).toFixed(1)}% confidence in microscopic detection`);
  
  console.log('\n🔮 THE GRAIN HAS SPROUTED INTO WISDOM!');
}

// Helper function to find unique patterns
function findUniquePatterns(currentResult, previousResults) {
  const currentPatterns = currentResult.archetypal.matches.map(m => m.pattern);
  const allPreviousPatterns = previousResults.flatMap(r => 
    r.archetypal?.matches?.map(m => m.pattern) || []
  );
  
  return currentPatterns.filter(pattern => !allPreviousPatterns.includes(pattern));
}

// Run the grain discovery
discoverGrainsOfRice().catch(console.error);
