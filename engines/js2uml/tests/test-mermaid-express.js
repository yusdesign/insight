import { UMLGenerator } from '../src/index.js';
import { MermaidReportGenerator } from '../src/visualizers/MermaidReportGenerator.js';
import { MermaidVisualizer } from '../src/visualizers/MermaidVisualizer.js';

const EXPRESS_CODE = `
class Express {
    constructor() {
        this.settings = {};
        this.engines = {};
    }

    set(setting, val) {
        this.settings[setting] = val;
        return this;
    }

    use(fn) {
        this.routes = this.routes || [];
        this.routes.push(fn);
        return this;
    }
}

class Router {
    constructor() {
        this.stack = [];
    }

    route(path) {
        return new Route(path);
    }
}

class Route {
    constructor(path) {
        this.path = path;
        this.stack = [];
    }
}
`;

async function testMermaidExpress() {
    console.log('🎨 Testing Mermaid with Express.js...\n');
    
    const generator = new UMLGenerator();
    const analysis = await generator.generate({
        code: EXPRESS_CODE,
        purposeAnalysis: { type: 'web-framework', confidence: 0.92 },
        intuitionScore: 88.2
    });
    
    // Generate Mermaid Markdown
    const mermaidMarkdown = MermaidReportGenerator.generate(analysis, 'Express.js - Mermaid');
    const fs = await import('fs');
    fs.mkdirSync('./outputs', { recursive: true });
    fs.writeFileSync('./outputs/express-mermaid.md', mermaidMarkdown);
    
    // Generate Mermaid HTML
    const mermaidHTML = MermaidReportGenerator.generateHTML(analysis, 'Express.js - Mermaid');
    fs.writeFileSync('./outputs/express-mermaid.html', mermaidHTML);
    
    // Show the Mermaid code
    const mermaidCode = MermaidVisualizer.generate(analysis);
    console.log('📐 Generated Mermaid code:');
    console.log(mermaidCode);
    
    console.log('\n✅ Mermaid Reports Generated:');
    console.log('   📝 outputs/express-mermaid.md - Perfect for GitHub');
    console.log('   📄 outputs/express-mermaid.html - Standalone viewer');
    console.log('\n🎉 Mermaid should render PERFECTLY in both!');
    console.log('   No more PlantUML confusion! 🚀');
}

testMermaidExpress().catch(console.error);
