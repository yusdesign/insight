import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

// Enhanced code samples designed to trigger pattern detection
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
  `,

  // 5. Complex Service with multiple patterns
  `
  class ComplexBusinessService {
    constructor(repoFactory, validator, notifier) {
      this.repoFactory = repoFactory;
      this.validator = validator;
      this.notifier = notifier;
    }
    
    async processBusinessFlow(data) {
      try {
        // Validation
        await this.validator.validate(data);
        
        // Repository operations
        const repo = this.repoFactory.createForType(data.type);
        const existing = await repo.findByCriteria(data.criteria);
        
        if (existing) {
          await repo.update(existing.id, data.updates);
        } else {
          await repo.create(data);
        }
        
        // Notification
        await this.notifier.send('Processing completed', data);
        
        return { success: true };
      } catch (error) {
        await this.notifier.send('Processing failed', { error: error.message });
        throw error;
      }
    }
  }
  `
];

async function demonstrateStandaloneIntegration() {
  console.log('🔗 STANDALONE INTEGRATION DEMONSTRATION');
  console.log('='.repeat(60) + '\n');
  
  const bridge = new StandaloneBridge();
  
  for (let i = 0; i < enhancedSamples.length; i++) {
    console.log(`📦 ANALYZING SAMPLE ${i + 1}/${enhancedSamples.length}`);
    console.log('─'.repeat(40));
    
    const result = await bridge.comprehensiveAnalysisWithDiscovery(
      enhancedSamples[i],
      { sampleId: i, complexity: 'medium' }
    );
    
    // Display key insights
    console.log('🎯 PURPOSE:', result.purpose.primaryPurpose?.purpose || 'Unknown');
    console.log('📊 CONFIDENCE:', `${(result.purpose.confidence * 100).toFixed(1)}%`);
    
    console.log('🧠 INTUITION:', result.patterns.prediction || 'Analyzing...');
    console.log('📈 PATTERN CONFIDENCE:', `${(result.patterns.confidence * 100).toFixed(1)}%`);
    
    console.log('🏗️  ARCHETYPES:', 
      result.archetypal.matches.map(m => 
        `${m.pattern} (${(m.confidence * 100).toFixed(1)}%)`
      ).join(', ') || 'None detected'
    );
    
    // Show quality issues
    if (result.quality.anomalies.length > 0) {
      console.log('🚨 QUALITY ISSUES:', result.quality.anomalies.length);
      result.quality.anomalies.forEach(anomaly => {
        console.log(`   - ${anomaly.type}: ${anomaly.description}`);
      });
    } else {
      console.log('✅ QUALITY: No issues detected');
    }
    
    // Show cross-correlations
    if (result.crossCorrelations.length > 0) {
      console.log('🔗 CORRELATIONS:');
      result.crossCorrelations.forEach(corr => {
        console.log(`   - ${corr.message} (${(corr.confidence * 100).toFixed(1)}%)`);
      });
    }
    
    // Show enhanced recommendations
    const importantRecs = result.enhancedRecommendations.filter(r => 
      r.priority === 'high' || r.confidence > 0.6
    );
    
    if (importantRecs.length > 0) {
      console.log('💡 RECOMMENDATIONS:');
      importantRecs.forEach(rec => {
        const icon = rec.priority === 'high' ? '🔴' : '🟡';
        console.log(`   ${icon} ${rec.message}`);
      });
    }
    
    console.log('\n' + '─'.repeat(60) + '\n');
    
    // Brief pause to observe progression
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Final integrated summary
  console.log('🎊 INTEGRATED DISCOVERY SUMMARY');
  console.log('='.repeat(60));
  
  const summary = bridge.getIntegratedSummary();
  console.log(JSON.stringify(summary, null, 2));
  
  // Check if we discovered any novel patterns
  if (summary.archetypalDiscovery.candidateArchetypes > 0) {
    console.log('\n🎉 NOVEL PATTERNS DISCOVERED!');
    summary.archetypalDiscovery.topCandidates.forEach(candidate => {
      console.log(`   - ${candidate.name} (${(candidate.confidence * 100).toFixed(1)}% confidence)`);
    });
  } else {
    console.log('\n🔍 No novel patterns yet - need more diverse samples!');
  }

  console.log('\n🚀 DISCOVERY ENGINE STATUS:', summary.systemHealth.discoveryEngine);
  console.log('📈 AVERAGE CONFIDENCE:', `${(summary.integrationMetrics.averageConfidence * 100).toFixed(1)}%`);
}

// Run the standalone integration
demonstrateStandaloneIntegration().catch(console.error);
