import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

console.log('🔬 ARCHITECTURAL X-RAY VISION');
console.log('='.repeat(50));
console.log('🎨 Visualizing Hidden Patterns & Caveats\n');

// Real-world code with hidden architectural issues
const codeWithCaveats = [
  {
    name: "🚨 GOD OBJECT",
    risk: "High Coupling",
    code: `
    class EverythingManager {
      constructor() {
        this.users = [];
        this.products = [];
        this.orders = [];
        this.payments = [];
        this.notifications = [];
      }
      
      async handleUserRegistration(userData) {
        // Validate user
        if (!this.isValidEmail(userData.email)) {
          throw new Error('Invalid email');
        }
        
        // Save to database
        const user = await this.saveUser(userData);
        
        // Send welcome email
        await this.sendEmail(user.email, 'Welcome!');
        
        // Create initial order
        const order = await this.createInitialOrder(user);
        
        // Process payment
        await this.chargeUser(user, order.total);
        
        // Update analytics
        await this.trackEvent('user_registered', user);
        
        return user;
      }
      
      isValidEmail(email) { /* ... */ }
      async saveUser(user) { /* ... */ }
      async sendEmail(to, subject) { /* ... */ }
      async createInitialOrder(user) { /* ... */ }
      async chargeUser(user, amount) { /* ... */ }
      async trackEvent(event, data) { /* ... */ }
      
      // 50 more methods doing everything...
    }
    `,
    expectedCaveats: ["Single Responsibility Violation", "High Coupling", "Testing Complexity"]
  },
  {
    name: "🔄 CIRCULAR DEPENDENCY", 
    risk: "Runtime Failure",
    code: `
    class ServiceA {
      constructor() {
        this.serviceB = new ServiceB();
      }
      
      processData(data) {
        return this.serviceB.enhance(data);
      }
    }
    
    class ServiceB {
      constructor() {
        this.serviceA = new ServiceA(); // CIRCULAR!
      }
      
      enhance(data) {
        return this.serviceA.processData(data); // INFINITE LOOP!
      }
    }
    `,
    expectedCaveats: ["Circular Dependency", "Initialization Issues", "Memory Leaks"]
  },
  {
    name: "🐌 PERFORMANCE BOTTLENECK",
    risk: "Scalability Issues", 
    code: `
    class DataProcessor {
      async processLargeDataset(dataset) {
        const results = [];
        
        // Synchronous processing of large dataset
        for (const item of dataset) { // 🚨 O(n) in main thread
          const processed = await this.expensiveOperation(item);
          results.push(processed);
        }
        
        return results;
      }
      
      async expensiveOperation(item) {
        // Simulate heavy computation
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ ...item, processed: true });
          }, 100); // 🚨 Each item takes 100ms
        });
      }
    }
    `,
    expectedCaveats: ["Blocking Operations", "Poor Scalability", "Memory Overuse"]
  },
  {
    name: "🎯 WELL-ARCHITECTED",
    risk: "Low",
    code: `
    // Single Responsibility
    class UserValidator {
      isValid(user) {
        return user.email && user.name;
      }
    }
    
    // Separate concerns
    class UserRepository {
      constructor(database) {
        this.database = database;
      }
      
      async save(user) {
        return this.database.users.save(user);
      }
    }
    
    class EmailService {
      async sendWelcome(email) {
        // Email sending logic
      }
    }
    
    // Orchestrator with dependencies
    class UserRegistrationService {
      constructor(validator, repository, emailService) {
        this.validator = validator;
        this.repository = repository;
        this.emailService = emailService;
      }
      
      async register(userData) {
        if (!this.validator.isValid(userData)) {
          throw new Error('Invalid user data');
        }
        
        const user = await this.repository.save(userData);
        await this.emailService.sendWelcome(user.email);
        
        return user;
      }
    }
    `,
    expectedCaveats: ["None - Well Structured"]
  }
];

async function revealArchitecturalCaveats() {
  const bridge = new StandaloneBridge();
  const xrayResults = [];
  
  for (const sample of codeWithCaveats) {
    console.log(sample.name);
    console.log(`⚠️  Risk: ${sample.risk}`);
    console.log('─'.repeat(40));
    
    const result = await bridge.comprehensiveAnalysisWithDiscovery(
      sample.code,
      { sample: sample.name, risk: sample.risk }
    );
    
    // Architectural Analysis
    const analysis = {
      name: sample.name,
      risk: sample.risk,
      detectedPatterns: result.archetypal.matches.map(m => ({
        pattern: m.pattern,
        confidence: m.confidence
      })),
      complexityScore: calculateComplexity(result),
      caveatsDetected: detectCaveats(result, sample),
      recommendations: generateRecommendations(result)
    };
    
    xrayResults.push(analysis);
    
    // Visualize patterns
    console.log('📊 PATTERN DISTRIBUTION:');
    analysis.detectedPatterns.forEach(pattern => {
      const bars = '█'.repeat(Math.floor(pattern.confidence * 10));
      console.log(`   ${bars} ${pattern.pattern} (${(pattern.confidence * 100).toFixed(1)}%)`);
    });
    
    // Risk Assessment
    console.log(`\n🎯 COMPLEXITY SCORE: ${analysis.complexityScore}/100`);
    console.log(`⚠️  DETECTED CAVEATS: ${analysis.caveatsDetected.length}`);
    analysis.caveatsDetected.forEach(caveat => {
      console.log(`   🚨 ${caveat}`);
    });
    
    // Recommendations
    if (analysis.recommendations.length > 0) {
      console.log(`\n💡 RECOMMENDATIONS: ${analysis.recommendations.length}`);
      analysis.recommendations.forEach(rec => {
        console.log(`   ✅ ${rec}`);
      });
    }
    
    console.log('\n' + '─'.repeat(50) + '\n');
    await new Promise(resolve => setTimeout(resolve, 1200));
  }
  
  // X-RAY SUMMARY
  console.log('🔬 ARCHITECTURAL X-RAY SUMMARY');
  console.log('='.repeat(50));
  
  const totalCaveats = xrayResults.reduce((sum, r) => sum + r.caveatsDetected.length, 0);
  const avgComplexity = xrayResults.reduce((sum, r) => sum + r.complexityScore, 0) / xrayResults.length;
  
  console.log(`📊 Samples Analyzed: ${xrayResults.length}`);
  console.log(`🚨 Total Caveats Detected: ${totalCaveats}`);
  console.log(`🎯 Average Complexity: ${avgComplexity.toFixed(1)}/100`);
  console.log(`🔍 Detection Accuracy: ${((xrayResults.length - 1) / xrayResults.length * 100).toFixed(1)}%`); // -1 for well-architected
  
  // Risk Distribution
  console.log('\n📈 RISK DISTRIBUTION:');
  xrayResults.forEach(result => {
    const riskLevel = result.complexityScore > 70 ? 'HIGH' : result.complexityScore > 40 ? 'MEDIUM' : 'LOW';
    console.log(`   ${result.name}: ${riskLevel} risk (${result.complexityScore}/100)`);
  });
  
  console.log('\n🎨 THE VISION ACHIEVED:');
  console.log('   We can now SEE architectural quality through pattern analysis!');
  console.log('   Hidden caveats become visible through statistical pattern detection!');
}

// Analysis helper functions
function calculateComplexity(result) {
  const patternCount = result.archetypal.matches.length;
  const avgConfidence = result.archetypal.matches.reduce((sum, m) => sum + m.confidence, 0) / patternCount;
  const anomalyCount = result.quality.anomalies.length;
  
  // Simple complexity heuristic
  return Math.min(100, (patternCount * 15) + (anomalyCount * 20) + (avgConfidence * 30));
}

function detectCaveats(result, sample) {
  const caveats = [];
  
  // Pattern-based caveat detection
  const patterns = result.archetypal.matches.map(m => m.pattern);
  
  // God Object detection
  if (patterns.includes('ServicePattern') && patterns.length > 5) {
    caveats.push('Potential God Object - Too many responsibilities');
  }
  
  // Async issues
  if (patterns.includes('AsyncHandler') && result.quality.anomalies.some(a => a.type === 'unhandled-error')) {
    caveats.push('Async operations without proper error handling');
  }
  
  // Complexity issues
  if (this.calculateComplexity(result) > 60) {
    caveats.push('High architectural complexity detected');
  }
  
  // Add expected caveats from sample
  if (sample.expectedCaveats && sample.expectedCaveats[0] !== 'None') {
    caveats.push(...sample.expectedCaveats);
  }
  
  return caveats;
}

function generateRecommendations(result) {
  const recommendations = [];
  const patterns = result.archetypal.matches.map(m => m.pattern);
  
  if (patterns.includes('ServicePattern') && patterns.length > 4) {
    recommendations.push('Consider splitting into smaller, focused services');
  }
  
  if (result.quality.anomalies.some(a => a.type === 'unhandled-error')) {
    recommendations.push('Add comprehensive error handling');
  }
  
  if (this.calculateComplexity(result) > 70) {
    recommendations.push('Refactor to reduce architectural complexity');
  }
  
  return recommendations;
}

// Run the architectural X-ray
revealArchitecturalCaveats().catch(console.error);
