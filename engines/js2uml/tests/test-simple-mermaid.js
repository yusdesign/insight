import { UMLGenerator } from '../src/index.js';
import { UniversalHTMLReport } from '../src/visualizers/UniversalHTMLReport.js';

const SIMPLE_CODE = `
class Calculator {
    constructor() { this.history = []; }
    add(a, b) { return a + b; }
    multiply(a, b) { return a * b; }
}

class AdvancedCalculator extends Calculator {
    power(a, b) { return Math.pow(a, b); }
}
`;

async function testSimpleMermaid() {
    console.log('🧪 Testing SIMPLE Mermaid HTML...\n');
    
    const generator = new UMLGenerator();
    const analysis = await generator.generate({ code: SIMPLE_CODE });
    
    const fs = await import('fs');
    fs.mkdirSync('./outputs', { recursive: true });
    
    // Generate HTML with PROPER Mermaid
    const html = UniversalHTMLReport.generate(analysis, 'Calculator Architecture');
    fs.writeFileSync('./outputs/simple-mermaid.html', html);
    
    console.log('✅ Created: outputs/simple-mermaid.html');
    console.log('🎯 OPEN THIS FILE IN YOUR BROWSER!');
    console.log('🚀 MERMAID WILL RENDER PROPERLY!');
}

testSimpleMermaid().catch(console.error);
