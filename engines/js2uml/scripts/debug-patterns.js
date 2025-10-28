import IntuitionJS from '@insight-suite/intuition.js';

const testCode = `
class OrderService {
    constructor(repository) {
        this.repository = repository;
    }
    
    async processOrder(order) {
        return this.repository.save(order);
    }
}
`;

async function debugPatterns() {
    console.log('🔍 Debugging IntuitionJS Pattern Analysis...\n');
    
    const intuition = new IntuitionJS();
    
    try {
        const patterns = await intuition.learnPatterns(testCode);
        console.log('📊 IntuitionJS Result:');
        console.log('Type:', typeof patterns);
        console.log('Is Array:', Array.isArray(patterns));
        console.log('Value:', patterns);
        
        if (patterns && typeof patterns === 'object') {
            console.log('\n🔍 Object Structure:');
            console.log('Keys:', Object.keys(patterns));
            
            if (patterns.patterns) {
                console.log('Patterns property:', patterns.patterns);
            }
        }
        
    } catch (error) {
        console.log('❌ IntuitionJS error:', error.message);
    }
}

debugPatterns();
