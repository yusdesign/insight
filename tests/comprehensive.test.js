import JS2UMLEngine from '../engines/js2uml/src/index.js';

const realisticCode = `
/**
 * User Management Service with proper error handling and validation
 */
class UserService {
    constructor(userRepository, emailService, logger) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.logger = logger;
        this.cache = new Map();
    }

    async getUserById(id) {
        // Check cache first
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }

        // Validate input
        if (!this.isValidId(id)) {
            throw new ValidationError('Invalid user ID');
        }

        try {
            const user = await this.userRepository.findById(id);
            
            if (user) {
                // Cache the result
                this.cache.set(id, user);
                this.logger.info('User ' + id + ' retrieved successfully');
            }
            
            return user;
        } catch (error) {
            this.logger.error('Failed to get user ' + id + ':', error);
            throw new DatabaseError('User retrieval failed');
        }
    }

    async createUser(userData) {
        const validation = this.validateUserData(userData);
        if (!validation.isValid) {
            throw new ValidationError(validation.errors.join(', '));
        }

        try {
            const user = await this.userRepository.create(userData);
            
            // Send welcome email
            await this.emailService.sendWelcomeEmail(user.email, user.name);
            
            this.logger.info('User ' + user.id + ' created successfully');
            return user;
        } catch (error) {
            this.logger.error('User creation failed:', error);
            throw new DatabaseError('User creation failed');
        }
    }

    isValidId(id) {
        return typeof id === 'string' && id.length > 0 && /^[a-zA-Z0-9-_]+$/.test(id);
    }

    validateUserData(userData) {
        const errors = [];
        
        if (!userData.email || !this.isValidEmail(userData.email)) {
            errors.push('Valid email is required');
        }
        
        if (!userData.name || userData.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    isValidEmail(email) {
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
        this.statusCode = 500;
    }
}
`;

async function runComprehensiveTest() {
    console.log('🏢 Comprehensive Insight Suite Test\n');
    console.log('='.repeat(50));
    
    const engine = new JS2UMLEngine();
    
    try {
        console.log('🔍 Analyzing realistic service code...\n');
        const result = await engine.analyzeCodebase(realisticCode);
        
        console.log('📊 COMPREHENSIVE ANALYSIS RESULTS:');
        console.log('='.repeat(40));
        console.log('Purpose:', result.insights.purpose.type);
        console.log('Confidence:', (result.insights.purpose.confidence * 100).toFixed(1) + '%');
        console.log('Intuition Score:', (result.insights.intuitionScore * 100).toFixed(1) + '%');
        console.log('Classes Found:', result.classes.length);
        console.log('Total Methods:', result.insights.totalMethods);
        console.log('Relationships:', result.relationships.length);
        
        console.log('\n🎯 ARCHITECTURE INSIGHTS:');
        console.log('='.repeat(40));
        result.insights.architecturalInsights.forEach(insight => {
            console.log('•', insight);
        });
        
        console.log('\n💡 RECOMMENDATIONS:');
        console.log('='.repeat(40));
        result.recommendations.forEach((rec, i) => {
            console.log((i + 1) + '. ' + rec);
        });
        
        console.log('\n📁 SAVED OUTPUTS:');
        console.log('='.repeat(40));
        console.log('• tests/outputs/comprehensive-analysis.html');
        console.log('• tests/outputs/comprehensive-analysis.txt');
        
        // Save outputs
        const fs = await import('fs');
        fs.mkdirSync('./tests/outputs', { recursive: true });
        fs.writeFileSync('./tests/outputs/comprehensive-analysis.html', result.visualizations.plantuml);
        fs.writeFileSync('./tests/outputs/comprehensive-analysis.txt', result.visualizations.ascii);
        
        console.log('\n✅ Comprehensive test completed successfully!');
        
    } catch (error) {
        console.log('❌ Comprehensive test failed:', error.message);
    }
}

runComprehensiveTest();
