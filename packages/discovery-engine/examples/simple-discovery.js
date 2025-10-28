import ArchetypalDiscoveryEngine from '../src/index.js';

// Sample code snippets to analyze
const codeSamples = [
  // Repository Pattern
  `
  class UserRepository {
    async findById(id) {
      return this.database.users.findOne({ id });
    }
    
    async save(user) {
      return this.database.users.insert(user);
    }
  }
  `,

  // Service Pattern
  `
  class ProductService {
    constructor(productRepo) {
      this.productRepo = productRepo;
    }
    
    async getProduct(id) {
      return this.productRepo.findById(id);
    }
    
    async createProduct(productData) {
      return this.productRepo.save(productData);
    }
  }
  `,

  // Novel pattern candidate
  `
  class PaymentProcessor {
    async processPayment(order) {
      const validation = await this.validateOrder(order);
      if (!validation.valid) {
        throw new Error('Invalid order');
      }
      
      const receipt = await this.gateway.charge(order.amount);
      await this.updateOrderStatus(order.id, 'paid');
      
      return receipt;
    }
  }
  `,

  // Another novel pattern
  `
  class NotificationBuilder {
    withTitle(title) {
      this.title = title;
      return this;
    }
    
    withMessage(message) {
      this.message = message;
      return this;
    }
    
    build() {
      return { title: this.title, message: this.message };
    }
  }
  `
];

async function demonstrateDiscovery() {
  console.log('🌱 PLANTING THE FIRST GRAINS OF KNOWLEDGE...\n');
  
  const engine = new ArchetypalDiscoveryEngine();
  
  // Analyze each code sample
  for (let i = 0; i < codeSamples.length; i++) {
    console.log(`📝 Analyzing sample ${i + 1}...`);
    
    const result = await engine.analyze(codeSamples[i], {
      sampleId: i,
      type: 'example'
    });
    
    if (result.success) {
      console.log('   ✅ Analysis successful');
      
      if (result.matches.length > 0) {
        console.log('   🎯 Pattern matches:');
        result.matches.forEach(match => {
          console.log(`      - ${match.pattern} (${(match.confidence * 100).toFixed(1)}% confidence)`);
        });
      }
      
      if (result.novelPatterns.length > 0) {
        console.log('   🔍 Novel patterns detected:');
        result.novelPatterns.forEach(novel => {
          console.log(`      - ${novel.pattern} (${(novel.confidence * 100).toFixed(1)}% confidence)`);
        });
      }
      
      console.log(`   📊 Collective insights: ${result.collectiveInsights.runtime.totalFragments} fragments, ${(result.collectiveInsights.confidenceMetrics.averageConfidence * 100).toFixed(1)}% avg confidence\n`);
    } else {
      console.log('   ❌ Analysis failed:', result.error);
    }
    
    // Small delay to see progression
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Final summary
  console.log('='.repeat(50));
  console.log('🎉 DISCOVERY ENGINE SUMMARY');
  console.log('='.repeat(50));
  
  const summary = engine.getDiscoverySummary();
  console.log(JSON.stringify(summary, null, 2));
}

// Run the demonstration
demonstrateDiscovery().catch(console.error);
