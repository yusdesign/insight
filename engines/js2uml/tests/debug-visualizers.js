import * as visualizers from '../src/visualizers/index.js';
import { ASCIIVisualizer } from '../src/visualizers/ASCIIVisualizer.js';
import { PlantUMLVisualizer } from '../src/visualizers/PlantUMLVisualizer.js';

console.log('🔍 Available visualizers:');
console.log(Object.keys(visualizers));

// Test ASCIIVisualizer directly
console.log('\n🧪 Testing ASCIIVisualizer:');
console.log('Methods:', Object.getOwnPropertyNames(ASCIIVisualizer));
console.log('Static methods:', Object.getOwnPropertyNames(ASCIIVisualizer).filter(name => 
    typeof ASCIIVisualizer[name] === 'function'
));

// Test PlantUMLVisualizer directly  
console.log('\n🧪 Testing PlantUMLVisualizer:');
console.log('Methods:', Object.getOwnPropertyNames(PlantUMLVisualizer));
console.log('Static methods:', Object.getOwnPropertyNames(PlantUMLVisualizer).filter(name => 
    typeof PlantUMLVisualizer[name] === 'function'
));

// Quick functionality test
console.log('\n🚀 Quick functionality test:');
try {
    const testAnalysis = {
        classes: [{ name: 'TestClass', methods: { declared: ['testMethod'] }, properties: [] }],
        relationships: [],
        insights: { totalClasses: 1, totalMethods: 1, qualityScore: 100 }
    };
    
    const asciiResult = ASCIIVisualizer.render(testAnalysis);
    console.log('✅ ASCIIVisualizer.render() works!');
    console.log('Sample output:');
    console.log(asciiResult.substring(0, 100) + '...');
} catch (error) {
    console.log('❌ ASCIIVisualizer.render() failed:', error.message);
}
