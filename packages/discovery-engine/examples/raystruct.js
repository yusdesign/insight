import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

console.log('🔍 raystruct - seeing through structure');
console.log('='.repeat(45));
console.log('finding what matters in the details\n');

// Real code with real issues
const codeSamples = [
  {
    name: "too many responsibilities",
    code: `
    class DoesEverything {
      constructor() {
        this.data = [];
        this.config = {};
        this.state = {};
      }
      
      validateInput(input) {
        // validation logic
      }
      
      processData(data) {
        // processing logic  
      }
      
      saveToDatabase(data) {
        // database logic
      }
      
      sendEmail(user) {
        // email logic
      }
      
      generateReport(data) {
        // reporting logic
      }
      
      // ... 10 more methods
    }
    `,
    note: "one class doing too much"
  },
  {
    name: "simple and clear", 
    code: `
    class UserValidator {
      isValid(user) {
        return user.email && user.name;
      }
    }
    
    class UserRepository {
      async save(user) {
        // just save user
        return db.users.save(user);
      }
    }
    `,
    note: "each thing has one job"
  },
  {
    name: "tight coupling",
    code: `
    class ServiceA {
      constructor() {
        this.serviceB = new ServiceB();
        this.serviceC = new ServiceC();
        this.serviceD = new ServiceD();
      }
      
      doWork() {
        const resultB = this.serviceB.process();
        const resultC = this.serviceC.transform(resultB);
        return this.serviceD.finalize(resultC);
      }
    }
    `,
    note: "hard to test or change"
  }
];

// Simple helper functions - no 'this'
function calculateComplexity(result) {
  const patterns = result.archetypal.matches || [];
  const anomalies = result.quality.anomalies || [];
  
  // Simple measure: more patterns + more anomalies = more complex
  return Math.min(100, (patterns.length * 15) + (anomalies.length * 10));
}

function detectIssues(result, sample) {
  const issues = [];
  const patterns = (result.archetypal.matches || []).map(m => m.pattern);
  
  // Simple issue detection
  if (patterns.length > 4) {
    issues.push('maybe doing too much');
  }
  
  if (patterns.includes('AsyncHandler') && !patterns.includes('ServicePattern')) {
    issues.push('async without clear purpose');
  }
  
  // Add the sample's own note
  if (sample.note) {
    issues.push(sample.note);
  }
  
  return issues;
}

function getSuggestions(result) {
  const suggestions = [];
  const patterns = (result.archetypal.matches || []).map(m => m.pattern);
  
  if (patterns.length > 4) {
    suggestions.push('consider splitting into smaller pieces');
  }
  
  if (patterns.includes('AsyncHandler')) {
    suggestions.push('make sure errors are handled');
  }
  
  return suggestions;
}

async function runRaystruct() {
  const bridge = new StandaloneBridge();
  
  for (const sample of codeSamples) {
    console.log(sample.name);
    console.log('─'.repeat(30));
    
    const result = await bridge.comprehensiveAnalysisWithDiscovery(
      sample.code,
      { sample: sample.name }
    );
    
    // Use the simple helper functions
    const complexity = calculateComplexity(result);
    const issues = detectIssues(result, sample);
    const suggestions = getSuggestions(result);
    
    // Show what was found
    const patterns = result.archetypal.matches || [];
    if (patterns.length > 0) {
      console.log('patterns found:');
      patterns.forEach(pattern => {
        console.log(`  ${pattern.pattern} (${Math.floor(pattern.confidence * 100)}%)`);
      });
    }
    
    console.log(`complexity: ${complexity}/100`);
    
    if (issues.length > 0) {
      console.log('things to notice:');
      issues.forEach(issue => {
        console.log(`  ⚠️  ${issue}`);
      });
    }
    
    if (suggestions.length > 0) {
      console.log('suggestions:');
      suggestions.forEach(suggestion => {
        console.log(`  💡 ${suggestion}`);
      });
    }
    
    console.log('\n');
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  console.log('---');
  console.log('raystruct: seeing what\'s there');
  console.log('no grand claims, just looking at code');
}

// Run it
runRaystruct().catch(console.error);
