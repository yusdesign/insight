/**
 * Insight.js Holistic Analysis Example with JS2UML Visualization
 * Using actual API methods: analyze(), generateReport(), detectPatterns()
 */

import InsightJS from '@insight-suite/insight.js';
import { analyze, generateReport } from '@insight-suite/js2uml';

// Create insight instance
const insight = new InsightJS({
  debug: false
});

// System examples with different complexity levels
const systemExamples = {
  simpleService: `
    class UserService {
      constructor(db) {
        this.db = db;
      }
      async getUser(id) {
        return this.db.users.find(u => u.id === id);
      }
      async createUser(userData) {
        const user = { id: Date.now(), ...userData };
        this.db.users.push(user);
        return user;
      }
    }
  `,
  
  layeredArchitecture: `
    class UserController {
      constructor(userService) {
        this.userService = userService;
      }
      
      async getUser(req, res) {
        try {
          const user = await this.userService.getUser(req.params.id);
          res.json(user);
        } catch (error) {
          res.status(404).json({ error: 'User not found' });
        }
      }
    }
    
    class UserService {
      constructor(userRepository) {
        this.userRepository = userRepository;
      }
      
      async getUser(id) {
        const user = await this.userRepository.findById(id);
        if (!user) throw new Error('User not found');
        return this.sanitizeUser(user);
      }
      
      sanitizeUser(user) {
        const { password, ...safeUser } = user;
        return safeUser;
      }
    }
    
    class UserRepository {
      constructor(database) {
        this.database = database;
      }
      
      async findById(id) {
        return this.database.users.find(u => u.id === id);
      }
    }
  `,
  
  withErrorHandling: `
    class ApiService {
      constructor(httpClient) {
        this.httpClient = httpClient;
        this.retryCount = 3;
      }
      
      async fetchWithRetry(url) {
        for (let attempt = 1; attempt <= this.retryCount; attempt++) {
          try {
            const response = await this.httpClient.get(url);
            return response.data;
          } catch (error) {
            if (attempt === this.retryCount) throw error;
            await this.delay(1000 * attempt);
          }
        }
      }
      
      delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    }
    
    class CacheService {
      constructor() {
        this.cache = new Map();
        this.ttl = 5 * 60 * 1000; // 5 minutes
      }
      
      get(key) {
        const item = this.cache.get(key);
        if (item && Date.now() - item.timestamp < this.ttl) {
          return item.value;
        }
        this.cache.delete(key);
        return null;
      }
      
      set(key, value) {
        this.cache.set(key, {
          value,
          timestamp: Date.now()
        });
      }
    }
  `
};

async function demonstrateHolisticAnalysis() {
  console.log('🎯 Insight.js - Holistic Analysis with Visualization');
  console.log('='.repeat(65));
  
  for (const [systemName, code] of Object.entries(systemExamples)) {
    console.log(`\n📊 Analyzing ${systemName}...\n`);
    
    try {
      // Holistic analysis using Insight.js
      const analysis = await insight.analyze(code);
      
      console.log(`🧠 Holistic Analysis Results:`);
      console.log(`  - Confidence: ${(analysis.confidence * 100).toFixed(1)}%`);
      
      // Display summary if available
      if (analysis.summary) {
        console.log(`  - Summary: ${analysis.summary}`);
      }
      
      // Display key findings if available
      if (analysis.keyFindings && analysis.keyFindings.length > 0) {
        console.log(`  - Key Findings: ${analysis.keyFindings.length} insights`);
        analysis.keyFindings.slice(0, 3).forEach(finding => {
          console.log(`    * ${finding}`);
        });
      }
      
      // Enhanced quality assessment
      assessCodeQuality(systemName, code, analysis);
      
      // Test pattern detection separately
      await demonstratePatternDetection(systemName, code);
      
      // Test report generation
      await demonstrateReportGeneration(systemName, code);
      
      // Architecture visualization  
      const umlAnalysis = await analyze(code, {
        options: { format: ['mermaid', 'ascii'] }
      });
      
      console.log('\n📋 Architecture:');
      console.log(umlAnalysis.ascii);
      
      console.log(`\n🔍 Architecture Insights:`);
      console.log(`  Components: ${umlAnalysis.classes.length}`);
      console.log(`  Methods: ${umlAnalysis.insights.totalMethods}`);
      console.log(`  Dependencies: ${umlAnalysis.relationships.length}`);
      console.log(`  Quality Score: ${umlAnalysis.insights.qualityScore}%`);
      
      // Pattern detection from architecture
      detectArchitecturePatterns(umlAnalysis);
      
      // Save outputs
      const fs = await import('fs');
      const mermaidContent = `# ${systemName}\n\n\`\`\`mermaid\n${umlAnalysis.mermaid}\n\`\`\`\n\n*Insight.js Analysis*\nComponents: ${umlAnalysis.classes.length} | Methods: ${umlAnalysis.insights.totalMethods} | Quality: ${umlAnalysis.insights.qualityScore}%`;
      fs.writeFileSync(`./outputs/basic-examples/insight-${systemName}.mermaid`, mermaidContent);
      
      console.log(`💾 Saved: outputs/basic-examples/insight-${systemName}.mermaid`);
      
    } catch (error) {
      console.error(`❌ Analysis failed:`, error.message);
    }
    
    console.log('─'.repeat(50));
  }
  
  // Demonstrate cognitive mining across packages
  await demonstrateCognitiveMining();
}

async function demonstratePatternDetection(systemName, code) {
  try {
    const patterns = await insight.detectPatterns(code);
    
    console.log(`\n🧩 Pattern Detection for ${systemName}:`);
    
    if (patterns.patterns && patterns.patterns.length > 0) {
      console.log(`  ✅ Design Patterns: ${patterns.patterns.length} found`);
      patterns.patterns.slice(0, 3).forEach(pattern => {
        console.log(`    - ${pattern.type || pattern.name}`);
      });
    } else {
      console.log(`  🔶 No specific design patterns detected`);
    }
    
    if (patterns.antiPatterns && patterns.antiPatterns.length > 0) {
      console.log(`  🚨 Anti-Patterns: ${patterns.antiPatterns.length} found`);
      patterns.antiPatterns.slice(0, 2).forEach(antiPattern => {
        console.log(`    - ${antiPattern.type || antiPattern.name}`);
      });
    }
    
  } catch (error) {
    console.log(`  🔶 Pattern detection: ${error.message}`);
  }
}

async function demonstrateReportGeneration(systemName, code) {
  try {
    const report = await insight.generateReport(code);
    
    console.log(`\n📋 Report Generation for ${systemName}:`);
    
    if (report.summary) {
      console.log(`  - Summary: ${report.summary.substring(0, 100)}...`);
    }
    
    if (report.keyFindings && report.keyFindings.length > 0) {
      console.log(`  - Findings: ${report.keyFindings.length} key insights`);
    }
    
  } catch (error) {
    console.log(`  🔶 Report generation: ${error.message}`);
  }
}

function assessCodeQuality(systemName, code, analysis) {
  console.log(`\n📈 Quality Assessment for ${systemName}:`);
  
  // Basic code metrics
  const lines = code.split('\n').length;
  const classes = (code.match(/class\s+\w+/g) || []).length;
  const methods = (code.match(/\w+\([^)]*\)\s*{/g) || []).length;
  const asyncMethods = (code.match(/async\s+\w+\(/g) || []).length;
  
  console.log(`  - Lines: ${lines}`);
  console.log(`  - Classes: ${classes}`);
  console.log(`  - Methods: ${methods}`);
  console.log(`  - Async methods: ${asyncMethods}`);
  
  // Complexity indicators
  if (code.includes('try {') && code.includes('} catch')) {
    console.log('  ✅ Includes error handling');
  }
  
  if (code.includes('async') && code.includes('await')) {
    console.log('  ✅ Uses async/await pattern');
  }
  
  if (code.includes('constructor(')) {
    console.log('  ✅ Uses dependency injection');
  }
  
  // Architecture quality
  if (classes >= 3) {
    console.log('  🏗️ Multi-layer architecture detected');
  }
  
  if (code.includes('extends')) {
    console.log('  🔗 Inheritance relationships present');
  }
}

function detectArchitecturePatterns(umlAnalysis) {
  console.log(`\n🏗️ Architecture Patterns Detected:`);
  
  const patterns = [];
  
  // MVC pattern detection
  if (umlAnalysis.classes.some(cls => cls.name.toLowerCase().includes('controller')) &&
      umlAnalysis.classes.some(cls => cls.name.toLowerCase().includes('service')) &&
      umlAnalysis.classes.some(cls => cls.name.toLowerCase().includes('repository'))) {
    patterns.push('MVC/Layered Architecture');
  }
  
  // Service pattern detection
  if (umlAnalysis.classes.some(cls => cls.name.toLowerCase().includes('service')) &&
      umlAnalysis.relationships.length >= 2) {
    patterns.push('Service Pattern');
  }
  
  // Repository pattern detection
  if (umlAnalysis.classes.some(cls => cls.name.toLowerCase().includes('repository'))) {
    patterns.push('Repository Pattern');
  }
  
  if (patterns.length > 0) {
    patterns.forEach(pattern => console.log(`  - ${pattern}`));
  } else {
    console.log('  - Basic Class Structure');
  }
}

async function demonstrateCognitiveMining() {
  console.log('\n⛏️ Cognitive Mining Across Packages');
  console.log('─'.repeat(40));
  
  console.log('Each package provides unique cognitive insights:');
  console.log('  🔍 Point.js: Purpose identification and goal alignment');
  console.log('  🚨 Hunch.js: Anomaly detection and intuition scoring');
  console.log('  🧩 Intuition.js: Pattern prediction and similarity analysis');
  console.log('  🎯 Insight.js: Holistic analysis and comprehensive reporting');
  
  console.log('\n💡 Combined, they provide comprehensive code understanding:');
  console.log('  - What the code does (Point.js)');
  console.log('  - How well it\'s written (Hunch.js)');
  console.log('  - What patterns it follows (Intuition.js)');
  console.log('  - Overall architecture quality (Insight.js + JS2UML)');
}

// Run the example
demonstrateHolisticAnalysis().catch(console.error);
