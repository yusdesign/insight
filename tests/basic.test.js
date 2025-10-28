import JS2UMLEngine from '../engines/js2uml/src/index.js';

// Simple test cases that represent real-world scenarios
const testCases = [
    {
        name: 'Service Class',
        code: `
class UserService {
    constructor(repo) {
        this.userRepo = repo;
    }
    
    async getUser(id) {
        return this.userRepo.find(id);
    }
    
    async createUser(userData) {
        return this.userRepo.save(userData);
    }
}
        `,
        description: 'Basic service class with dependency injection'
    },
    {
        name: 'Data Transformer', 
        code: `
class DataTransformer {
    transform(data) {
        return data.map(item => ({
            id: item.id,
            name: item.name.toUpperCase(),
            timestamp: new Date()
        }));
    }
}
        `,
        description: 'Simple data transformation utility'
    },
    {
        name: 'Error Handler',
        code: `
class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.timestamp = new Date();
    }
}

class ErrorHandler {
    static handle(error) {
        console.error(\`[\${error.timestamp}] \${error.code}: \${error.message}\`);
    }
}
        `,
        description: 'Error handling classes with inheritance'
    }
];

async function runBasicTests() {
    console.log('🧪 Insight Suite Basic Integration Tests\n');
    console.log('='.repeat(50));
    
    const engine = new JS2UMLEngine();
    let passed = 0;
    let failed = 0;
    
    for (const testCase of testCases) {
        console.log(`\n📝 Test: ${testCase.name}`);
        console.log('─'.repeat(30));
        console.log(testCase.description);
        
        try {
            const result = await engine.analyzeCodebase(testCase.code);
            
            // Basic assertions
            const hasUML = result.uml && result.uml.length > 0;
            const hasInsights = result.insights && result.insights.purpose;
            const hasVisualizations = result.visualizations && result.visualizations.ascii;
            
            if (hasUML && hasInsights && hasVisualizations) {
                console.log('✅ PASS - All components working');
                console.log(`   Purpose: ${result.insights.purpose.type}`);
                console.log(`   Classes: ${result.classes.length}`);
                console.log(`   Intuition: ${(result.insights.intuitionScore * 100).toFixed(1)}%`);
                passed++;
            } else {
                console.log('❌ FAIL - Missing components');
                failed++;
            }
            
        } catch (error) {
            console.log('❌ ERROR:', error.message);
            failed++;
        }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log(`📊 Results: ${passed} passed, ${failed} failed`);
    console.log('='.repeat(50));
    
    return passed === testCases.length;
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runBasicTests().then(success => {
        process.exit(success ? 0 : 1);
    });
}

export { runBasicTests };
