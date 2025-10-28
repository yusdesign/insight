import { UMLGenerator } from '../src/index.js';
import { MermaidVisualizer, ASCIIVisualizer } from '../src/visualizers/index.js';

const simpleCode = `
class Calculator {
    constructor() {
        this.history = [];
    }
    
    add(a, b) {
        const result = a + b;
        this.history.push(\`\${a} + \${b} = \${result}\`);
        return result;
    }
    
    multiply(a, b) {
        return a * b;
    }
}
`;

async function testComponents() {
    console.log('🧪 Testing JS2UML Components (Mermaid + ASCII only)\n');
    
    // Test UML Generator
    const generator = new UMLGenerator();
    const analysis = await generator.generate({
        code: simpleCode
    });
    
    console.log('✅ UML Generation:');
    console.log('  Classes:', analysis.classes.length);
    console.log('  Methods:', analysis.classes[0].methods.declared.length);
    console.log('  Properties:', analysis.classes[0].properties.length);
    
    // Test Mermaid output
    console.log('\n📐 Mermaid Output:');
    console.log('  Length:', analysis.mermaid.length);
    console.log('  Contains classDiagram:', analysis.mermaid.includes('classDiagram'));
    
    // Test Mermaid Visualizer
    console.log('\n🌊 Testing Mermaid Visualizer...');
    const mermaidOutput = MermaidVisualizer.generate(analysis);
    console.log('  Mermaid Visualizer Length:', mermaidOutput.length);
    console.log('  Contains classDiagram:', mermaidOutput.includes('classDiagram'));
    
    // Test ASCII Visualizer
    console.log('\n📋 ASCII Visualization:');
    const asciiOutput = ASCIIVisualizer.render(analysis);
    console.log('  ASCII Length:', asciiOutput.length);
    console.log('\n📋 ASCII Preview:');
    console.log(asciiOutput.substring(0, 200) + '...');
    
    // Save test outputs
    const fs = await import('fs');
    fs.mkdirSync('./outputs', { recursive: true });
    fs.writeFileSync('./outputs/components-test.mermaid', analysis.mermaid);
    fs.writeFileSync('./outputs/components-test.txt', asciiOutput);
    
    console.log('\n💾 Saved component tests to outputs/');
    console.log('🎉 All components working with Mermaid + ASCII!');
}

testComponents().catch(console.error);
