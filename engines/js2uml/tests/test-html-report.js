import { UMLGenerator } from '../src/index.js';
import { HTMLReportGenerator } from '../src/visualizers/HTMLReportGenerator.js';
import { MarkdownReportGenerator } from '../src/visualizers/MarkdownReportGenerator.js';

const realWorldCode = `
class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
        this.cache = new Map();
    }

    async getUser(id) {
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }
        const user = await this.userRepo.find(id);
        this.cache.set(id, user);
        return user;
    }

    async createUser(data) {
        this.validateData(data);
        const user = await this.userRepo.create(data);
        this.notifyAnalytics(user);
        return user;
    }

    validateData(data) {
        if (!data.email) throw new Error('Email required');
    }

    notifyAnalytics(user) {
        console.log('User created:', user.id);
    }
}

class UserRepository {
    constructor(db) {
        this.db = db;
    }

    async find(id) {
        return this.db.query('SELECT * FROM users WHERE id = ?', [id]);
    }

    async create(data) {
        return this.db.insert('users', data);
    }
}
`;

async function generateReports() {
    console.log('🎨 Generating Professional Reports...\n');
    
    const generator = new UMLGenerator();
    const analysis = await generator.generate({
        code: realWorldCode,
        purposeAnalysis: { type: 'service', confidence: 0.85 },
        patternAnalysis: { patterns: ['repository', 'caching'] },
        intuitionScore: 76.5
    });
    
    // Generate HTML Report
    const htmlReport = HTMLReportGenerator.generate(analysis, 'User Service Architecture');
    const fs = await import('fs');
    fs.mkdirSync('./outputs', { recursive: true });
    fs.writeFileSync('./outputs/architecture-report.html', htmlReport);
    
    // Generate Markdown Report
    const mdReport = MarkdownReportGenerator.generate(analysis, 'User Service Architecture');
    fs.writeFileSync('./outputs/architecture-report.md', mdReport);
    
    // Save PlantUML separately
    fs.writeFileSync('./outputs/architecture.puml', analysis.uml);
    
    console.log('✅ Reports Generated:');
    console.log('   📄 outputs/architecture-report.html');
    console.log('   📝 outputs/architecture-report.md');
    console.log('   🌿 outputs/architecture.puml');
    console.log('\n🎉 Open outputs/architecture-report.html in your browser!');
}

generateReports().catch(console.error);
