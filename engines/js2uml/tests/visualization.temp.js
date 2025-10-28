import { UMLGenerator } from '../src/core/UMLGenerator.js';
import { ASCIIVisualizer } from '../src/visualizers/ASCIIVisualizer.js';
import { PlantUMLVisualizer } from '../src/visualizers/PlantUMLVisualizer.js';

// Test code with realistic class structure
const TEST_CODE = `
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.cache = new Map();
    }

    async getUserById(id) {
        if (!this.isValidId(id)) {
            throw new ValidationError('Invalid ID');
        }
        
        try {
            if (this.cache.has(id)) {
                return this.cache.get(id);
            }
            
            const user = await this.userRepository.findUser(id);
            this.cache.set(id, user);
            return user;
        } catch (error) {
            throw new DatabaseError('User lookup failed');
        }
    }

    async createUser(userData) {
        this.validateUserData(userData);
        const user = await this.userRepository.createUser(userData);
        this.cache.set(user.id, user);
        return user;
    }

    isValidId(id) {
        return typeof id === 'string' && id.length > 0;
    }

    validateUserData(userData) {
        if (!userData || typeof userData !== 'object') {
            throw new ValidationError('Invalid user data');
        }
        if (!this.isValidEmail(userData.email)) {
            throw new ValidationError('Invalid email');
        }
    }

    isValidEmail(email) {
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
    }
}
`;

class VisualizationTest {
    constructor() {
        this.umlGenerator = new UMLGenerator();
        this.testResults = {
            passed: 0,
            failed: 0,
            details: []
        };
    }

    logTest(name, result, message) {
        const status = result ? '✅ PASS' : '❌ FAIL';
        console.log(`${status} ${name}: ${message}`);
        
        this.testResults.details.push({ name, result, message });
        if (result) this.testResults.passed++;
        else this.testResults.failed++;
    }

    async runAllTests() {
        console.log('🎨 VISUALIZATION ENGINE TEST SUITE\n');
        
        await this.testMethodExtraction();
        await this.testASCIIOutput();
        await this.testPlantUMLOutput();
        await this.testNoFalsePositives();
        
        this.printSummary();
    }

    async testMethodExtraction() {
        console.log('\n🔍 TEST 1: Method Extraction Accuracy');
        
        const analysis = await this.umlGenerator.generate({
            code: TEST_CODE,
            purposeAnalysis: { type: 'validation', confidence: 0.54 },
            patternAnalysis: { patterns: ['service', 'validation'] },
            intuitionScore: 34.4
        });

        const userService = analysis.classes.find(c => c.name === 'UserService');
        const declaredMethods = userService.methods.declared;

        // Should find real methods
        this.logTest(
            'Finds real methods',
            declaredMethods.includes('getUserById') && 
            declaredMethods.includes('createUser'),
            `Found methods: ${declaredMethods.join(', ')}`
        );

        // Should NOT find control structures as methods
        this.logTest(
            'No false positives',
            !declaredMethods.includes('if') && 
            !declaredMethods.includes('catch'),
            `No control structures misidentified`
        );
    }

    async testASCIIOutput() {
        console.log('\n📋 TEST 2: ASCII Visualization');
        
        const analysis = await this.umlGenerator.generate({
            code: TEST_CODE,
            purposeAnalysis: { type: 'validation', confidence: 0.54 },
            intuitionScore: 34.4
        });

        const asciiOutput = ASCIIVisualizer.render(analysis);
        
        // Check for clean output
        const hasCleanBoxes = asciiOutput.includes('┌─') && asciiOutput.includes('└─');
        const hasRealMethods = asciiOutput.includes('getUserById');
        const noFalseMethods = !asciiOutput.includes('📝 Declared: if');
        
        this.logTest(
            'Clean ASCII boxes',
            hasCleanBoxes,
            'Proper box drawing characters'
        );
        
        this.logTest(
            'Shows real methods',
            hasRealMethods,
            'Includes actual class methods'
        );
        
        this.logTest(
            'No false methods in output',
            noFalseMethods,
            'Control structures not shown as methods'
        );

        if (!noFalseMethods) {
            console.log('   🔍 ASCII Output Sample:');
            console.log(asciiOutput.substring(0, 500) + '...');
        }
    }

    async testPlantUMLOutput() {
        console.log('\n🌿 TEST 3: PlantUML Generation');
        
        const analysis = await this.umlGenerator.generate({
            code: TEST_CODE,
            purposeAnalysis: { type: 'validation', confidence: 0.54 },
            patternAnalysis: { patterns: ['service', 'validation'] },
            intuitionScore: 34.4
        });

        const plantUML = analysis.uml;
        
        const validSyntax = plantUML.includes('@startuml') && plantUML.includes('@enduml');
        const hasClasses = plantUML.includes('class UserService') && plantUML.includes('class ValidationError');
        const hasInsights = plantUML.includes('PURPOSE:') && plantUML.includes('INTUITION SCORE:');
        
        this.logTest(
            'Valid PlantUML syntax',
            validSyntax,
            'Proper start/end markers'
        );
        
        this.logTest(
            'Includes all classes',
            hasClasses,
            'Found UserService and ValidationError'
        );
        
        this.logTest(
            'Includes insights',
            hasInsights,
            'Purpose and intuition scores embedded'
        );

        // Save for manual inspection
        const fs = await import('fs');
        fs.writeFileSync('test-visualization.puml', plantUML);
        console.log('   💾 Saved PlantUML to: test-visualization.puml');
    }

    async testNoFalsePositives() {
        console.log('\n🎯 TEST 4: No False Positive Methods');
        
        const edgeCaseCode = `
class EdgeCaseService {
    methodWithIf() {
        if (true) { return 'yes'; }
    }
    
    methodWithTryCatch() {
        try { risky(); } catch (e) { handle(e); }
    }
    
    normalMethod() { return 'normal'; }
}
`;

        const analysis = await this.umlGenerator.generate({ code: edgeCaseCode });
        const methods = analysis.classes[0].methods.declared;

        // Should only find the actual method names, not control structures
        const hasRealMethods = methods.includes('methodWithIf') && 
                              methods.includes('methodWithTryCatch') && 
                              methods.includes('normalMethod');
        const noControlStructures = !methods.includes('if') && 
                                   !methods.includes('catch') && 
                                   !methods.includes('try');

        this.logTest(
            'Extracts method names correctly',
            hasRealMethods,
            `Found: ${methods.join(', ')}`
        );
        
        this.logTest(
            'No control structure false positives',
            noControlStructures,
            'if, try, catch not misidentified as methods'
        );
    }

    printSummary() {
        console.log('\n📊 TEST SUMMARY');
        console.log('================================');
        console.log(`✅ PASSED: ${this.testResults.passed}`);
        console.log(`❌ FAILED: ${this.testResults.failed}`);
        console.log(`📈 SUCCESS RATE: ${((this.testResults.passed / (this.testResults.passed + this.testResults.failed)) * 100).toFixed(1)}%`);
        
        if (this.testResults.failed > 0) {
            console.log('\n🔍 FAILED TESTS:');
            this.testResults.details
                .filter(test => !test.result)
                .forEach(test => {
                    console.log(`   • ${test.name}: ${test.message}`);
                });
        }
        
        console.log('\n🎯 NEXT STEPS:');
        if (this.testResults.failed === 0) {
            console.log('   ✅ All visualization tests passed!');
            console.log('   🚀 Ready for real-world examples');
        } else {
            console.log('   🔧 Fix method extraction issues first');
            console.log('   📝 Review ASCII visualizer output');
        }
    }
}

// Run the tests
const testSuite = new VisualizationTest();
await testSuite.runAllTests();
