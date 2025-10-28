import { UMLGenerator } from '../src/index.js';
import { HTMLReportGenerator } from '../src/visualizers/HTMLReportGenerator.js';

// Simplified Express.js core structure based on actual Express source
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

async function analyzeExpress() {
    console.log('🔍 Analyzing Express.js Architecture...\n');
    
    const generator = new UMLGenerator();
    const analysis = await generator.generate({
        code: EXPRESS_CODE,
        purposeAnalysis: { type: 'web-framework', confidence: 0.92 },
        patternAnalysis: { patterns: ['middleware', 'routing', 'request-response'] },
        intuitionScore: 88.2
    });
    
    // Generate HTML Report
    const htmlReport = HTMLReportGenerator.generate(analysis, 'Express.js Core Architecture Analysis');
    const fs = await import('fs');
    fs.mkdirSync('./outputs', { recursive: true });
    fs.writeFileSync('./outputs/express-analysis.html', htmlReport);
    
    console.log('✅ Express.js Analysis Complete:');
    console.log('   📊 Classes Found:', analysis.classes.length);
    console.log('   🔗 Relationships:', analysis.relationships.length);
    console.log('   🎯 Quality Score:', analysis.insights.qualityScore + '%');
    console.log('   📄 outputs/express-analysis.html');
    console.log('\n🎉 Open the HTML report to see the full analysis!');
}

analyzeExpress().catch(console.error);
