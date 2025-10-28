import { UMLGenerator } from '../src/core/UMLGenerator.js';
import { MermaidVisualizer, ASCIIVisualizer } from '../src/visualizers/index.js';

const TEST_CODE = `
class UserService {
    constructor() {
        this.users = [];
    }
    
    addUser(user) {
        this.users.push(user);
    }
    
    findUser(id) {
        return this.users.find(u => u.id === id);
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
`;

class VisualizationTest {
    constructor() {
        this.umlGenerator = new UMLGenerator();
        this.passed = 0;
        this.failed = 0;
    }
    
    logTest(name, condition, message) {
        if (condition) {
            console.log(`  ✅ ${name}: ${message}`);
            this.passed++;
        } else {
            console.log(`  ❌ ${name}: ${message}`);
            this.failed++;
        }
    }
    
    async runAllTests() {
        console.log('🧪 Visualization Tests (Mermaid + ASCII)\n');
        
        await this.testMermaidOutput();
        await this.testASCIIOutput();
        await this.testVisualizers();
        
        console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
        
        if (this.failed === 0) {
            console.log('🎉 All visualization tests passed!');
        } else {
            console.log('💥 Some tests failed');
        }
    }
    
    async testMermaidOutput() {
        console.log('\n📐 TEST: Mermaid Generation');
        
        const analysis = await this.umlGenerator.generate({
            code: TEST_CODE,
            purposeAnalysis: { type: 'validation', confidence: 0.54 },
            intuitionScore: 34.4
        });

        const hasMermaid = !!analysis.mermaid;
        const validSyntax = analysis.mermaid.includes('classDiagram');
        const hasClasses = analysis.mermaid.includes('UserService') && analysis.mermaid.includes('ValidationError');
        
        this.logTest(
            'Mermaid output generated',
            hasMermaid,
            'Mermaid diagram created'
        );
        
        this.logTest(
            'Valid Mermaid syntax',
            validSyntax,
            'Contains classDiagram directive'
        );
        
        this.logTest(
            'Includes all classes', 
            hasClasses,
            'Found UserService and ValidationError'
        );
    }
    
    async testASCIIOutput() {
        console.log('\n📋 TEST: ASCII Generation');
        
        const analysis = await this.umlGenerator.generate({
            code: TEST_CODE,
            options: { format: ['ascii'] }
        });

        const hasASCII = !!analysis.ascii;
        const hasClasses = analysis.ascii && (
            analysis.ascii.includes('UserService') || 
            analysis.ascii.includes('ValidationError')
        );
        
        this.logTest(
            'ASCII output generated',
            hasASCII,
            'ASCII diagram created'
        );
        
        this.logTest(
            'Includes class information',
            hasClasses,
            'Found class names in ASCII output'
        );
    }
    
    async testVisualizers() {
        console.log('\n🎨 TEST: Visualizer Classes');
        
        const analysis = await this.umlGenerator.generate({
            code: TEST_CODE
        });
        
        // Test MermaidVisualizer
        const mermaidOutput = MermaidVisualizer.generate(analysis);
        const mermaidValid = mermaidOutput.includes('classDiagram');
        
        // Test ASCIIVisualizer
        const asciiOutput = ASCIIVisualizer.render(analysis);
        const asciiValid = asciiOutput.length > 0;
        
        this.logTest(
            'MermaidVisualizer works',
            mermaidValid,
            'Generated valid Mermaid'
        );
        
        this.logTest(
            'ASCIIVisualizer works',
            asciiValid,
            'Generated ASCII output'
        );
    }
}

// Run tests
new VisualizationTest().runAllTests().catch(console.error);
