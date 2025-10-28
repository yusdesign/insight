#!/usr/bin/env node

/**
 * Point.js Purpose Detection CLI Version - ASCII Only
 * 
 * Lightweight version for terminal use without Mermaid dependencies
 */

import PointJS from '@insight-suite/point.js';
import { analyze } from '@insight-suite/js2uml';

// Create point.js instance
const point = new PointJS({
  confidenceThreshold: 0.6,
  debug: false
});

// Code examples for purpose detection
const codeExamples = {
  validation: `
    class EmailValidator {
      validate(email) {
        const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return regex.test(email);
      }
    }
  `,
  
  transformation: `
    class DataTransformer {
      transform(data) {
        return data.map(item => ({
          ...item,
          processed: true
        }));
      }
    }
  `,
  
  apiCommunication: `
    class ApiService {
      async fetchData(url) {
        const response = await fetch(url);
        return response.json();
      }
    }
  `
};

async function runCLIAnalysis() {
  console.log('🧭 Point.js Purpose Detection (CLI Version)');
  console.log('='.repeat(45));
  
  for (const [exampleName, code] of Object.entries(codeExamples)) {
    console.log(`\n📊 ${exampleName.toUpperCase()} ANALYSIS`);
    console.log('─'.repeat(30));
    
    try {
      // Purpose analysis
      const purpose = await point.identify(code);
      console.log(`🎯 Purpose: ${purpose.primaryPurpose?.purpose}`);
      console.log(`📈 Confidence: ${(purpose.confidence * 100).toFixed(1)}%`);
      
      // Architecture analysis (ASCII only)
      const architecture = await analyze(code, {
        options: { format: ['ascii'] }
      });
      
      console.log(`\n🏗️ Architecture:`);
      console.log(`  Classes: ${architecture.classes.length}`);
      console.log(`  Methods: ${architecture.insights.totalMethods}`);
      console.log(`  Quality: ${architecture.insights.qualityScore}%`);
      
      // Display ASCII diagram
      console.log('\n📋 Structure:');
      console.log(architecture.ascii);
      
      // Goal alignment
      const goals = {
        validation: 'validate email format',
        transformation: 'transform data process', 
        apiCommunication: 'api fetch data service'
      };
      
      const alignment = await point.isAligned(goals[exampleName], code);
      console.log(`\n🎯 Goal Match: ${alignment.aligned ? '✅' : '❌'} (${(alignment.score * 100).toFixed(1)}%)`);
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
    
    console.log('─'.repeat(40));
  }
  
  console.log('\n✅ CLI Analysis Complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runCLIAnalysis().catch(console.error);
}

export default runCLIAnalysis;
