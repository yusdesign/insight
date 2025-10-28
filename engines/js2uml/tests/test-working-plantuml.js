import { UMLGenerator } from '../src/index.js';
import { HTMLReportGenerator } from '../src/visualizers/HTMLReportGenerator.js';
import PlantUMLEncoder from 'plantuml-encoder';

const EXPRESS_CODE = `
/**
 * Express.js Core Structure
 * Based on express/lib/express.js
 */

class Express {
    constructor() {
        this.settings = {};
        this.engines = {};
        this.defaultConfiguration();
    }

    defaultConfiguration() {
        this.enable('x-powered-by');
        this.set('etag', 'weak');
        this.set('env', process.env.NODE_ENV || 'development');
    }

    set(setting, val) {
        this.settings[setting] = val;
        return this;
    }

    enable(setting) {
        return this.set(setting, true);
    }

    disable(setting) {
        return this.set(setting, false);
    }

    engine(ext, fn) {
        this.engines[ext] = fn;
        return this;
    }

    use(fn) {
        this.routes = this.routes || [];
        this.routes.push(fn);
        return this;
    }

    listen(port, callback) {
        const server = require('http').createServer(this);
        return server.listen(port, callback);
    }
}

class Router {
    constructor(options) {
        this.options = options;
        this.stack = [];
    }

    route(path) {
        const route = new Route(path);
        this.stack.push(route);
        return route;
    }

    use(fn) {
        this.stack.push(fn);
        return this;
    }

    all(path, ...fns) {
        const route = this.route(path);
        fns.forEach(fn => route.use(fn));
        return this;
    }

    get(path, ...fns) {
        const route = this.route(path);
        fns.forEach(fn => route.get(fn));
        return this;
    }

    post(path, ...fns) {
        const route = this.route(path);
        fns.forEach(fn => route.post(fn));
        return this;
    }
}

class Route {
    constructor(path) {
        this.path = path;
        this.stack = [];
        this.methods = {};
    }

    use(fn) {
        this.stack.push(fn);
        return this;
    }

    get(fn) {
        this.methods.get = fn;
        this.stack.push(fn);
        return this;
    }

    post(fn) {
        this.methods.post = fn;
        this.stack.push(fn);
        return this;
    }

    dispatch(req, res, done) {
        let idx = 0;
        const stack = this.stack;
        
        function next(err) {
            const layer = stack[idx++];
            if (!layer) return done(err);
            
            try {
                if (err) {
                    // Error handling
                    if (layer.length === 4) {
                        layer(err, req, res, next);
                    } else {
                        next(err);
                    }
                } else {
                    layer(req, res, next);
                }
            } catch (e) {
                next(e);
            }
        }
        
        next();
    }
}

class Request {
    constructor(req) {
        this.originalUrl = req.url;
        this.method = req.method;
        this.params = {};
        this.query = {};
        this.body = {};
    }

    get(field) {
        return this.headers[field.toLowerCase()];
    }

    param(name, defaultValue) {
        return this.params[name] || defaultValue;
    }
}

class Response {
    constructor(res) {
        this.statusCode = 200;
        this.headers = {};
    }

    status(code) {
        this.statusCode = code;
        return this;
    }

    send(body) {
        if (typeof body === 'object') {
            this.json(body);
        } else {
            this.end(body);
        }
        return this;
    }

    json(obj) {
        this.setHeader('Content-Type', 'application/json');
        this.end(JSON.stringify(obj));
        return this;
    }

    end(data) {
        // Implementation would send HTTP response
        console.log('Sending response:', this.statusCode, data);
        return this;
    }

    setHeader(field, value) {
        this.headers[field.toLowerCase()] = value;
        return this;
    }
}
`;

async function testWorkingPlantUML() {
    console.log('🎨 Testing WORKING PlantUML Integration...\n');
    
    const generator = new UMLGenerator();
    const analysis = await generator.generate({
        code: EXPRESS_CODE,
        purposeAnalysis: { type: 'web-framework', confidence: 0.92 },
        patternAnalysis: { patterns: ['middleware', 'routing', 'request-response'] },
        intuitionScore: 88.2
    });
    
    // Test the encoder directly
    console.log('🔧 Testing PlantUML Encoder...');
    const encoded = PlantUMLEncoder.encode(analysis.uml);
    console.log('✅ Encoder working! Encoded length:', encoded.length);
    console.log('🌐 PlantUML URL: https://www.plantuml.com/plantuml/svg/' + encoded.substring(0, 50) + '...');
    
    // Generate HTML Report with WORKING PlantUML
    const htmlReport = HTMLReportGenerator.generate(analysis, 'Express.js - Working PlantUML');
    const fs = await import('fs');
    fs.mkdirSync('./outputs', { recursive: true });
    fs.writeFileSync('./outputs/working-plantuml.html', htmlReport);
    
    // Also create a simple test file like your official test
    const simpleTest = `
<!DOCTYPE html>
<html>
<body>
    <h1>JS2UML PlantUML Test</h1>
    <p>Generated from Express.js analysis</p>
    <img src="https://www.plantuml.com/plantuml/svg/${encoded}" alt="PlantUML Diagram">
    <p><a href="https://www.plantuml.com/plantuml/umla/${encoded}" target="_blank">Open in PlantUML Editor</a></p>
</body>
</html>`;
    
    fs.writeFileSync('./outputs/simple-plantuml-test.html', simpleTest);
    
    console.log('✅ Working Reports Generated:');
    console.log('   📄 outputs/working-plantuml.html - Full report with loading states');
    console.log('   📄 outputs/simple-plantuml-test.html - Simple test (like your official)');
    console.log('\n🎉 PlantUML should now render properly!');
    console.log('   The encoder is working - the issue was likely missing loading states.');
}

testWorkingPlantUML().catch(console.error);
