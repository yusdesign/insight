import JS2UMLEngine from '../src/index.js';

// Real-world code examples for comprehensive analysis
const examples = {
    microservice: `
class OrderService {
    constructor(orderRepository, paymentService) {
        this.orderRepository = orderRepository;
        this.paymentService = paymentService;
    }
    
    async createOrder(orderData) {
        const validation = this.validateOrder(orderData);
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }
        
        const payment = await this.paymentService.process(orderData.payment);
        const order = {
            id: generateId(),
            ...orderData,
            paymentStatus: payment.status,
            createdAt: new Date()
        };
        
        return this.orderRepository.save(order);
    }
    
    validateOrder(order) {
        const errors = [];
        if (!order.items || order.items.length === 0) {
            errors.push('Order must have items');
        }
        if (!order.customerId) {
            errors.push('Customer ID is required');
        }
        return { isValid: errors.length === 0, errors };
    }
}
    `,
    
    dataProcessor: `
class DataPipeline {
    constructor() {
        this.stages = [];
        this.cache = new Map();
    }
    
    addStage(stage) {
        this.stages.push(stage);
    }
    
    async process(data) {
        const cacheKey = this.generateCacheKey(data);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        let result = data;
        for (const stage of this.stages) {
            result = await stage.process(result);
        }
        
        this.cache.set(cacheKey, result);
        return result;
    }
    
    generateCacheKey(data) {
        return JSON.stringify(data);
    }
}
    `,
    
    utilityLibrary: `
class StringUtils {
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    static camelCase(str) {
        return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
    }
    
    static slugify(str) {
        return str.toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\\s+/g, '-')
            .replace(/-+/g, '-');
    }
}
    `
};

async function runRealWorldExamples() {
    console.log('🏢 REAL-WORLD JS2UML + INSIGHT SUITE ANALYSIS\n');
    
    const engine = new JS2UMLEngine();
    
    for (const [name, code] of Object.entries(examples)) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`ANALYZING: ${name.toUpperCase()}`);
        console.log('='.repeat(60));
        
        try {
            const result = await engine.analyzeCodebase(code);
            
            console.log('\n📊 INSIGHT SUITE FINDINGS:');
            console.log(`Purpose: ${result.insights.purpose.type} (${(result.insights.purpose.confidence * 100).toFixed(1)}% confidence)`);
            console.log(`Intuition Score: ${(result.insights.intuitionScore * 100).toFixed(1)}%`);
            console.log(`Patterns: ${result.insights.patterns.length}`);
            console.log(`Anomalies: ${result.insights.anomalies.length}`);
            
            console.log('\n📋 ARCHITECTURE OVERVIEW:');
            console.log(result.visualizations.ascii.split('\n').slice(0, 20).join('\n') + '\n...');
            
            // Save individual outputs
            const fs = await import('fs');
            fs.mkdirSync('./outputs/examples', { recursive: true });
            fs.writeFileSync(`./outputs/examples/${name}-analysis.html`, result.visualizations.plantuml);
            fs.writeFileSync(`./outputs/examples/${name}-analysis.txt`, result.visualizations.ascii);
            
            console.log(`💾 Saved: outputs/examples/${name}-analysis.*`);
            
        } catch (error) {
            console.log(`❌ Analysis failed: ${error.message}`);
        }
    }
}

runRealWorldExamples();
