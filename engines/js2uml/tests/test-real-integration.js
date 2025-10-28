import { RealInsightSuiteIntegration } from './src/real-integration.js';

const testCode = `
class OrderService {
    constructor(repository) {
        this.repository = repository;
    }
    
    async processOrder(order) {
        const validated = this.validateOrder(order);
        if (!validated.valid) {
            throw new Error(validated.errors.join(', '));
        }
        return this.repository.save(order);
    }
    
    validateOrder(order) {
        const errors = [];
        if (!order.items || order.items.length === 0) {
            errors.push('Order must have items');
        }
        return { valid: errors.length === 0, errors };
    }
}
`;

async function testRealIntegration() {
    console.log('🧪 Testing REAL Insight Suite Integration\n');
    
    const integration = new RealInsightSuiteIntegration();
    
    try {
        const result = await integration.analyzeCode(testCode);
        
        console.log('📊 REAL ANALYSIS RESULTS:');
        console.log('Purpose:', result.purpose.type, `(${(result.purpose.confidence * 100).toFixed(1)}% confidence)`);
        console.log('Intuition Score:', result.intuitionScore);
        console.log('Anomalies Found:', result.anomalies.length);
        console.log('Patterns Found:', result.patterns.length);
        console.log('Holistic Analysis:', Object.keys(result.holistic));
        
        // Show some actual findings
        if (result.anomalies.length > 0) {
            console.log('\n🚨 REAL ANOMALIES:');
            result.anomalies.slice(0, 3).forEach(anomaly => {
                console.log(` • ${anomaly.type}: ${anomaly.message}`);
            });
        }
        
    } catch (error) {
        console.log('💥 Real integration failed:', error.message);
    }
}

testRealIntegration();
