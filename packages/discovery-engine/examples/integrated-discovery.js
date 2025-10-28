import { InsightSuiteBridge } from '../src/integration/InsightSuiteBridge.js';

// More diverse code samples to trigger novel pattern detection
const enhancedSamples = [
  // 1. Clear Repository Pattern
  `
  class UserRepository {
    constructor(database) {
      this.database = database;
    }
    
    async findById(id) {
      return await this.database.collection('users').findOne({ _id: id });
    }
    
    async save(user) {
      return await this.database.collection('users').insertOne(user);
    }
    
    async delete(id) {
      return await this.database.collection('users').deleteOne({ _id: id });
    }
  }
  `,

  // 2. Service with Business Logic
  `
  class OrderService {
    constructor(orderRepo, inventoryService) {
      this.orderRepo = orderRepo;
      this.inventoryService = inventoryService;
    }
    
    async placeOrder(orderData) {
      // Check inventory
      const available = await this.inventoryService.checkStock(orderData.items);
      if (!available) {
        throw new Error('Insufficient inventory');
      }
      
      // Calculate total
      const total = orderData.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      );
      
      // Create order
      const order = {
        ...orderData,
        total,
        status: 'created',
        createdAt: new Date()
      };
      
      return await this.orderRepo.save(order);
    }
  }
  `,

  // 3. Builder Pattern (should trigger novel detection)
  `
  class QueryBuilder {
    constructor() {
      this.filters = [];
      this.sorts = [];
      this.limit = null;
    }
    
    where(field, operator, value) {
      this.filters.push({ field, operator, value });
      return this;
    }
    
    orderBy(field, direction = 'asc') {
      this.sorts.push({ field, direction });
      return this;
    }
    
    take(limit) {
      this.limit = limit;
      return this;
    }
    
    build() {
      return {
        filters: this.filters,
        sorts: this.sorts,
        limit: this.limit
      };
    }
  }
  `,

  // 4. Factory Pattern (another novel pattern candidate)
  `
  class PaymentProcessorFactory {
    static createProcessor(type, config) {
      switch (type) {
        case 'stripe':
          return new StripeProcessor(config.apiKey);
        case 'paypal':
          return new PayPalProcessor(config.clientId, config.secret);
        case 'bank':
          return new BankTransferProcessor(config.accountDetails);
        default:
          throw new Error('Unknown processor type: ' + type);
      }
    }
  }
  `
];

async function demonstrateIntegratedDiscovery() {
  console.log('🔗 INSIGHT SUITE INTEGRATION DEMONSTRATION');
  console.log('='.repeat(55) + '\n');
  
  const bridge = new InsightSuiteBridge();
  
  for (let i = 0; i < enhancedSamples.length; i++) {
    console.log(`📦 ANALYZING SAMPLE ${i + 1} WITH FULL INTEGRATION...\n`);
    
    const result = await bridge.comprehensiveAnalysisWithDiscovery(
      enhancedSamples[i],
      { sampleId: i, complexity: 'medium' }
    );
    
    // Display key insights
    console.log('🎯 PURPOSE:', result.purpose.primaryPurpose?.purpose || 'Unknown');
    console.log('🧠 PATTERNS:', result.patterns.prediction || 'Analyzing...');
    console.log('🏗️  ARCHETYPES:', result.archetypal.matches.map(m => m.pattern).join(', ') || 'None');
    
    // Show cross-correlations
    if (result.crossCorrelations.length > 0) {
      console.log('🔗 CORRELATIONS:');
      result.crossCorrelations.forEach(corr => {
        console.log(`   - ${corr.message} (${(corr.confidence * 100).toFixed(1)}% confidence)`);
      });
    }
    
    // Show enhanced recommendations
    const highPriorityRecs = result.enhancedRecommendations.filter(r => 
      r.priority === 'high' || r.confidence > 0.7
    );
    
    if (highPriorityRecs.length > 0) {
      console.log('💡 RECOMMENDATIONS:');
      highPriorityRecs.forEach(rec => {
        console.log(`   - ${rec.message}`);
      });
    }
    
    console.log('\n' + '─'.repeat(55) + '\n');
    
    // Brief pause to observe progression
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  // Final integrated summary
  console.log('🎊 INTEGRATED DISCOVERY SUMMARY');
  console.log('='.repeat(55));
  
  const summary = bridge.getIntegratedSummary();
  console.log(JSON.stringify(summary, null, 2));
  
  // Check if we discovered any novel patterns
  if (summary.archetypalDiscovery.candidateArchetypes > 0) {
    console.log('\n🎉 NOVEL PATTERNS DISCOVERED!');
    summary.archetypalDiscovery.topCandidates.forEach(candidate => {
      console.log(`   - ${candidate.name} (${(candidate.confidence * 100).toFixed(1)}% confidence)`);
    });
  }
}

// Run the integrated demonstration
demonstrateIntegratedDiscovery().catch(console.error);
