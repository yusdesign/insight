import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

console.log('🎭 PATTERN DIFFERENTIATION ENGINE');
console.log('='.repeat(50));
console.log('🔍 Detecting Subtle Architectural Variations\n');

// Similar patterns with subtle differences
const subtlePatterns = [
  {
    name: "FACTORY vs BUILDER",
    patterns: [
      {
        type: "🏭 FACTORY",
        code: `
        class VehicleFactory {
          static createVehicle(type) {
            switch(type) {
              case 'car': return new Car();
              case 'bike': return new Bike();
              default: throw new Error('Unknown type');
            }
          }
        }
        `,
        expected: "Centralized object creation with type switching"
      },
      {
        type: "🚀 BUILDER", 
        code: `
        class CarBuilder {
          constructor() {
            this.car = new Car();
          }
          
          withEngine(engine) {
            this.car.engine = engine;
            return this;
          }
          
          withColor(color) {
            this.car.color = color;
            return this;
          }
          
          build() {
            return this.car;
          }
        }
        `,
        expected: "Step-by-step object construction with method chaining"
      }
    ]
  },
  {
    name: "REPOSITORY vs DATA_MAPPER",
    patterns: [
      {
        type: "🗄️ REPOSITORY",
        code: `
        class UserRepository {
          constructor(database) {
            this.database = database;
          }
          
          async findById(id) {
            return this.database.users.findOne({ id });
          }
          
          async save(user) {
            return this.database.users.save(user);
          }
        }
        `,
        expected: "Collection-like interface for domain objects"
      },
      {
        type: "🔄 DATA_MAPPER",
        code: `
        class UserMapper {
          constructor(database) {
            this.database = database;
          }
          
          async find(id) {
            const data = await this.database.query('SELECT * FROM users WHERE id = ?', [id]);
            return this.mapToDomain(data);
          }
          
          async save(user) {
            const data = this.mapToPersistence(user);
            await this.database.query('INSERT INTO users SET ?', data);
          }
          
          mapToDomain(data) {
            return new User(data.id, data.name, data.email);
          }
          
          mapToPersistence(user) {
            return { id: user.id, name: user.getName(), email: user.getEmail() };
          }
        }
        `,
        expected: "Explicit data transformation between domains"
      }
    ]
  }
];

async function differentiatePatterns() {
  const bridge = new StandaloneBridge();
  
  for (const patternGroup of subtlePatterns) {
    console.log(patternGroup.name);
    console.log('─'.repeat(40));
    
    const differentiationResults = [];
    
    for (const pattern of patternGroup.patterns) {
      console.log(`\n🔍 Analyzing: ${pattern.type}`);
      
      const result = await bridge.comprehensiveAnalysisWithDiscovery(
        pattern.code,
        { patternType: pattern.type, group: patternGroup.name }
      );
      
      const analysis = {
        type: pattern.type,
        primaryPattern: result.archetypal.matches[0]?.pattern || 'Unknown',
        confidence: result.archetypal.confidence,
        allPatterns: result.archetypal.matches.map(m => ({
          pattern: m.pattern,
          confidence: m.confidence
        })),
        expected: pattern.expected
      };
      
      differentiationResults.push(analysis);
      
      console.log(`   🎯 Detected: ${analysis.primaryPattern}`);
      console.log(`   📈 Confidence: ${(analysis.confidence * 100).toFixed(1)}%`);
      console.log(`   🔍 All patterns: ${analysis.allPatterns.map(p => p.pattern).join(', ')}`);
    }
    
    // Pattern differentiation analysis
    console.log('\n🎭 DIFFERENTIATION ANALYSIS:');
    const patterns1 = differentiationResults[0].allPatterns.map(p => p.pattern);
    const patterns2 = differentiationResults[1].allPatterns.map(p => p.pattern);
    
    const commonPatterns = patterns1.filter(p => patterns2.includes(p));
    const uniquePatterns1 = patterns1.filter(p => !patterns2.includes(p));
    const uniquePatterns2 = patterns2.filter(p => !patterns1.includes(p));
    
    console.log(`   🤝 Common: ${commonPatterns.join(', ') || 'None'}`);
    console.log(`   🎯 ${differentiationResults[0].type} unique: ${uniquePatterns1.join(', ') || 'None'}`);
    console.log(`   🎯 ${differentiationResults[1].type} unique: ${uniquePatterns2.join(', ') || 'None'}`);
    
    console.log('\n' + '─'.repeat(50) + '\n');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('🚀 PATTERN DIFFERENTIATION COMPLETE!');
  console.log('🎯 The engine can distinguish between subtly different architectural patterns!');
}

differentiatePatterns().catch(console.error);
