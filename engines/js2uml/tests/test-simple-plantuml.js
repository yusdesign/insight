import { UMLGenerator } from '../src/index.js';
import { SimpleHTMLReportGenerator } from '../src/visualizers/SimpleHTMLReportGenerator.js';
import PlantUMLEncoder from 'plantuml-encoder';

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

async function testSimplePlantUML() {
    console.log('🎨 Testing SIMPLE PlantUML Integration...\n');
    
    const generator = new UMLGenerator();
    const analysis = await generator.generate({
        code: EXPRESS_CODE
    });
    
    console.log('🔧 Generated UML:');
    console.log('Length:', analysis.uml.length);
    console.log('First 200 chars:', analysis.uml.substring(0, 200));
    
    // Test encoder directly
    console.log('\n🔧 Testing encoder directly:');
    const encoded = PlantUMLEncoder.encode(analysis.uml);
    console.log('Encoded length:', encoded.length);
    console.log('Encoded (first 100 chars):', encoded.substring(0, 100));
    
    // Generate simple HTML report
    const htmlReport = SimpleHTMLReportGenerator.generate(analysis, 'Simple Express Test');
    const fs = await import('fs');
    fs.mkdirSync('./outputs', { recursive: true });
    fs.writeFileSync('./outputs/simple-working.html', htmlReport);
    
    console.log('\n✅ Simple HTML report created: outputs/simple-working.html');
    console.log('🎯 Open it in browser - PlantUML SHOULD render!');
}

testSimplePlantUML().catch(console.error);
