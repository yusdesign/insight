import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

const visualSamples = [
  {
    name: "🚀 BUILDER PATTERN",
    code: `
    class RocketBuilder {
      constructor() {
        this.rocket = { stages: [], payload: null };
      }
      
      withFirstStage(thrust) {
        this.rocket.stages.push({ type: 'first', thrust });
        return this;
      }
      
      withSecondStage(thrust) {
        this.rocket.stages.push({ type: 'second', thrust });
        return this;
      }
      
      withPayload(weight, type) {
        this.rocket.payload = { weight, type };
        return this;
      }
      
      build() {
        return new Rocket(this.rocket);
      }
    }
    `
  },
  {
    name: "🏭 FACTORY PATTERN", 
    code: `
    class VehicleFactory {
      static createVehicle(type, specs) {
        switch (type) {
          case 'car':
            return new Car(specs.engine, specs.doors);
          case 'motorcycle':
            return new Motorcycle(specs.engine, specs.style);
          case 'truck':
            return new Truck(specs.engine, specs.capacity);
          default:
            throw new Error('Unknown vehicle type: ' + type);
        }
      }
    }
    `
  },
  {
    name: "🎯 STRATEGY PATTERN",
    code: `
    class CompressionStrategy {
      compress(data) {
        throw new Error('Compress method not implemented');
      }
    }
    
    class ZipCompression extends CompressionStrategy {
      compress(data) {
        console.log('Compressing with ZIP algorithm');
        return 'ZIP:' + data.substring(0, 10) + '...';
      }
    }
    
    class GzipCompression extends CompressionStrategy {
      compress(data) {
        console.log('Compressing with GZIP algorithm');
        return 'GZIP:' + data.substring(0, 8) + '...';
      }
    }
    
    class CompressionContext {
      constructor(strategy) {
        this.strategy = strategy;
      }
      
      setStrategy(strategy) {
        this.strategy = strategy;
      }
      
      executeCompression(data) {
        return this.strategy.compress(data);
      }
    }
    `
  }
];

async function runVisualDiscovery() {
  console.log('🎨 VISUAL PATTERN DISCOVERY DEMO');
  console.log('========================================\n');
  
  const bridge = new StandaloneBridge();
  
  for (const sample of visualSamples) {
    console.log(sample.name);
    console.log('─'.repeat(40));
    
    const result = await bridge.comprehensiveAnalysisWithDiscovery(
      sample.code,
      { pattern: sample.name.toLowerCase() }
    );
    
    // Display discoveries
    if (result.archetypal.matches.length > 0) {
      console.log('✅ KNOWN PATTERNS:');
      result.archetypal.matches.forEach(match => {
        console.log(`   ${match.pattern} - ${(match.confidence * 100).toFixed(1)}% confidence`);
      });
    }
    
    if (result.archetypal.novelPatterns && result.archetypal.novelPatterns.length > 0) {
      console.log('🎉 NOVEL PATTERNS:');
      result.archetypal.novelPatterns.forEach(novel => {
        console.log(`   ${novel.pattern} - ${(novel.confidence * 100).toFixed(1)}% confidence`);
        console.log(`   📝 ${novel.description}`);
      });
    }
    
    // Show cross-correlations
    if (result.crossCorrelations.length > 0) {
      console.log('🔗 INSIGHTS:');
      result.crossCorrelations.forEach(corr => {
        console.log(`   ${corr.message}`);
      });
    }
    
    console.log('\n');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Final summary
  const summary = bridge.getIntegratedSummary();
  console.log('🎊 DISCOVERY SUMMARY');
  console.log('========================================');
  console.log(`📊 Total Analyses: ${summary.integrationMetrics.totalIntegratedAnalyses}`);
  console.log(`📈 Average Confidence: ${(summary.integrationMetrics.averageConfidence * 100).toFixed(1)}%`);
  
  if (summary.archetypalDiscovery.candidateArchetypes > 0) {
    console.log(`🌟 Candidate Archetypes: ${summary.archetypalDiscovery.candidateArchetypes}`);
    summary.archetypalDiscovery.topCandidates.forEach(candidate => {
      console.log(`   - ${candidate.name} (${(candidate.confidence * 100).toFixed(1)}%)`);
    });
  }
}

runVisualDiscovery().catch(console.error);
