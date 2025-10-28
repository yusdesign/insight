/**
 * Point.js Purpose Detection Example with JS2UML Visualization
 * 
 * Demonstrates identifying code purpose and generating architecture diagrams
 * using the point.js cognitive layer and JS2UML visualization.
 */

import PointJS from '@insight-suite/point.js';
import { analyze, generateReport, UMLGenerator } from '@insight-suite/js2uml';

// Create point.js instance
const point = new PointJS({
  confidenceThreshold: 0.6,
  debug: false
});

// Different code examples for purpose detection
const codeExamples = {
  validation: `
    class EmailValidator {
      constructor() {
        this.emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      }

      validate(email) {
        if (!this.emailRegex.test(email)) {
          throw new Error('Invalid email format');
        }
        return true;
      }

      validateMultiple(emails) {
        return emails.map(email => ({
          email,
          valid: this.validate(email)
        }));
      }
    }

    class ValidationError extends Error {
      constructor(message) {
        super(message);
        this.name = 'ValidationError';
      }
    }
  `,
  
  transformation: `
    class UserDataProcessor {
      process(users) {
        return users
          .filter(user => user.active)
          .map(user => this.transformUser(user))
          .sort((a, b) => a.name.localeCompare(b.name));
      }

      transformUser(user) {
        return {
          name: user.name.toUpperCase(),
          email: user.email.toLowerCase(),
          role: user.role || 'user',
          processedAt: new Date()
        };
      }

      batchProcess(users, batchSize = 10) {
        const results = [];
        for (let i = 0; i < users.length; i += batchSize) {
          const batch = users.slice(i, i + batchSize);
          results.push(...this.process(batch));
        }
        return results;
      }
    }
  `,
  
  apiCommunication: `
    class UserService {
      constructor(apiClient) {
        this.apiClient = apiClient;
        this.cache = new Map();
      }

      async getUserProfile(userId) {
        if (this.cache.has(userId)) {
          return this.cache.get(userId);
        }

        try {
          const response = await this.apiClient.get(\`/users/\${userId}\`);
          const userData = this.enrichUserData(response.data);
          this.cache.set(userId, userData);
          return userData;
        } catch (error) {
          console.error('Failed to fetch user:', error);
          throw new Error('User service unavailable');
        }
      }

      enrichUserData(userData) {
        return {
          ...userData,
          lastAccessed: new Date(),
          profileComplete: !!(userData.name && userData.email)
        };
      }

      async getMultipleProfiles(userIds) {
        const promises = userIds.map(id => this.getUserProfile(id));
        return Promise.all(promises);
      }
    }

    class ApiClient {
      constructor(baseURL) {
        this.baseURL = baseURL;
      }

      async get(endpoint) {
        const response = await fetch(this.baseURL + endpoint);
        if (!response.ok) throw new Error('API request failed');
        return { data: await response.json() };
      }
    }
  `
};

async function demonstratePurposeDetection() {
  console.log('🧭 Point.js - Purpose Detection with Architecture Visualization');
  console.log('='.repeat(65));
  
  for (const [exampleName, code] of Object.entries(codeExamples)) {
    console.log(`\n📝 Analyzing ${exampleName} code...\n`);
    
    try {
      // Step 1: Identify code purpose using PointJS
      const purposeAnalysis = await point.identify(code);
      
      console.log(`🧠 PURPOSE ANALYSIS:`);
      console.log(`  Primary Purpose: ${purposeAnalysis.primaryPurpose?.purpose || 'Unknown'}`);
      console.log(`  Confidence: ${(purposeAnalysis.confidence * 100).toFixed(1)}%`);
      console.log(`  Description: ${purposeAnalysis.primaryPurpose?.description || 'No description'}`);
      
      // Step 2: Generate architecture visualization using JS2UML
      console.log(`\n🏗️ ARCHITECTURE VISUALIZATION:`);
      const umlAnalysis = await analyze(code, {
        purposeAnalysis: purposeAnalysis,
        options: { format: ['mermaid', 'ascii'] }
      });
      
      // Display ASCII diagram in terminal
      console.log('\n📋 ASCII Architecture:');
      console.log(umlAnalysis.ascii);
      
      // Display architecture insights
      console.log(`\n🔍 ARCHITECTURE INSIGHTS:`);
      console.log(`  Classes: ${umlAnalysis.insights.totalClasses}`);
      console.log(`  Methods: ${umlAnalysis.insights.totalMethods}`);
      console.log(`  Quality Score: ${umlAnalysis.insights.qualityScore}%`);
      console.log(`  Relationships: ${umlAnalysis.relationships.length}`);
      
      // Step 3: Test goal alignment with better goal definitions
      const goals = {
        validation: 'validate email format validation error',
        transformation: 'transform user data process batch',
        apiCommunication: 'api user service cache fetch data'
      };
      
      const alignment = await point.isAligned(goals[exampleName], code);
      console.log(`\n🎯 GOAL ALIGNMENT: ${alignment.aligned ? '✅' : '❌'}`);
      console.log(`  Alignment Score: ${(alignment.score * 100).toFixed(1)}%`);
      
      if (alignment.matches && alignment.matches.length > 0) {
        console.log('  Key matches:');
        alignment.matches.slice(0, 3).forEach(match => {
          console.log(`    - "${match.goalKeyword}" ↔ "${match.codeTerm}"`);
        });
      }
      
      // Save visualization files
      const fs = await import('fs');
      fs.mkdirSync('./outputs/basic-examples', { recursive: true });
      
      // Save Mermaid diagram with .mermaid extension
      const mermaidContent = `# ${exampleName} Architecture\n\n\`\`\`mermaid\n${umlAnalysis.mermaid}\n\`\`\`\n\n*Generated by Insight Suite PointJS + JS2UML*`;
      fs.writeFileSync(`./outputs/basic-examples/${exampleName}.mermaid`, mermaidContent);
      
      // Save HTML report
      const htmlReport = await generateReport(umlAnalysis, `${exampleName} Architecture`);
      fs.writeFileSync(`./outputs/basic-examples/${exampleName}.html`, htmlReport);
      
      console.log(`\n💾 Saved to: outputs/basic-examples/${exampleName}.{html, mermaid}`);
      
    } catch (error) {
      console.error(`❌ Analysis failed for ${exampleName}:`, error.message);
    }
    
    console.log('\n' + '-'.repeat(60));
  }
}

// Additional demonstration: Architecture comparison
async function demonstrateArchitectureComparison() {
  console.log('\n🏛️ Architecture Pattern Comparison');
  console.log('='.repeat(40));
  
  const servicePattern = `
    class UserService {
      constructor(repository) {
        this.repository = repository;
      }
      
      async createUser(userData) {
        return this.repository.save(userData);
      }
    }
    
    class UserRepository {
      constructor(database) {
        this.database = database;
      }
      
      async save(userData) {
        // Database implementation
        return { id: 1, ...userData };
      }
    }
  `;
  
  const utilityPattern = `
    class StringUtils {
      static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
      
      static truncate(str, length) {
        return str.length > length ? str.slice(0, length) + '...' : str;
      }
    }
    
    class MathUtils {
      static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
      }
    }
  `;
  
  console.log('\n🔍 Analyzing Service Pattern:');
  const serviceAnalysis = await analyze(servicePattern);
  console.log(`  Classes: ${serviceAnalysis.classes.length}`);
  console.log(`  Relationships: ${serviceAnalysis.relationships.length}`);
  console.log(`  Pattern: ${serviceAnalysis.relationships.some(r => r.type === 'creation') ? 'Dependency Injection' : 'Unknown'}`);
  
  console.log('\n🔍 Analyzing Utility Pattern:');
  const utilityAnalysis = await analyze(utilityPattern);
  console.log(`  Classes: ${utilityAnalysis.classes.length}`);
  console.log(`  Relationships: ${utilityAnalysis.relationships.length}`);
  console.log(`  Pattern: ${utilityAnalysis.classes.every(c => c.methods.declared.some(m => m.includes('static'))) ? 'Static Utilities' : 'Unknown'}`);
}

// Run the enhanced examples
async function runAllExamples() {
  await demonstratePurposeDetection();
  await demonstrateArchitectureComparison();
  
  console.log('\n🎉 Basic Examples Complete!');
  console.log('📁 Check outputs/basic-examples/ for generated diagrams');
  console.log('🚀 Ready to move to advanced integration examples!');
}

runAllExamples().catch(console.error);
