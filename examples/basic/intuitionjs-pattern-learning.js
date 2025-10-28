/**
 * Intuition.js Pattern Learning Example with JS2UML Visualization
 * Using actual API methods: predict(), getSimilarityScore(), learnPatterns()
 */

import IntuitionJS from '@insight-suite/intuition.js';
import { analyze, generateReport } from '@insight-suite/js2uml';

// Create intuition.js instance
const intuition = new IntuitionJS({
  learningRate: 0.15,
  debug: false
});

// Pattern examples
const patternExamples = {
  singleton: `
    class Config {
      static instance;
      static getInstance() {
        if (!Config.instance) {
          Config.instance = new Config();
        }
        return Config.instance;
      }
    }
  `,
  
  factory: `
    class VehicleFactory {
      createVehicle(type) {
        switch(type) {
          case 'car': return new Car();
          case 'bike': return new Bike();
        }
      }
    }
    class Car {}
    class Bike {}
  `,
  
  observer: `
    class EventEmitter {
      constructor() {
        this.listeners = new Map();
      }
      
      on(event, callback) {
        if (!this.listeners.has(event)) {
          this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
      }
      
      emit(event, data) {
        if (this.listeners.has(event)) {
          this.listeners.get(event).forEach(callback => callback(data));
        }
      }
    }
  `,
  
  validation: `
    function validateEmail(email) { 
      return /^[^@]+@[^@]+\\.[^@]+$/.test(email); 
    }
    
    function checkPassword(pwd) { 
      return pwd.length >= 8; 
    }
  `
};

async function demonstratePatternLearning() {
  console.log('🧠 Intuition.js - Pattern Learning with Visualization');
  console.log('='.repeat(65));
  
  // Test prediction on each example
  for (const [patternName, code] of Object.entries(patternExamples)) {
    console.log(`\n🔍 Testing ${patternName} pattern...\n`);
    
    try {
      // Use predict() method for pattern detection
      const prediction = await intuition.predict(code);
      
      console.log(`🎯 Pattern Prediction:`);
      console.log(`  - Prediction: ${prediction.prediction || 'Unknown pattern'}`);
      console.log(`  - Confidence: ${(prediction.confidence * 100).toFixed(1)}%`);
      
      // Architecture visualization for class-based patterns
      if (code.includes('class ')) {
        const umlAnalysis = await analyze(code, {
          options: { format: ['mermaid', 'ascii'] }
        });
        
        console.log('\n📋 Architecture:');
        console.log(umlAnalysis.ascii);
        
        console.log(`\n🏗️ Structure: ${umlAnalysis.classes.length} classes, ${umlAnalysis.relationships.length} relationships`);
        
        // Manual pattern detection based on code structure
        detectPatternManually(patternName, code, umlAnalysis);
        
        // Save outputs for class-based patterns
        const fs = await import('fs');
        const mermaidContent = `# ${patternName}\n\n\`\`\`mermaid\n${umlAnalysis.mermaid}\n\`\`\`\n\n*Intuition.js Analysis*\nPrediction: ${prediction.prediction} | Confidence: ${(prediction.confidence * 100).toFixed(1)}%`;
        fs.writeFileSync(`./outputs/basic-examples/intuition-${patternName}.mermaid`, mermaidContent);
        
        console.log(`💾 Saved: outputs/basic-examples/intuition-${patternName}.mermaid`);
      } else {
        console.log(`\n📝 Function-based pattern (no UML diagram)`);
      }
      
    } catch (error) {
      console.error(`❌ Analysis failed:`, error.message);
    }
    
    console.log('─'.repeat(50));
  }
  
  // Test similarity scoring
  await demonstrateSimilarityAnalysis();
  
  // Test pattern learning
  await demonstratePatternLearningTraining();
}

function detectPatternManually(patternName, code, umlAnalysis) {
  console.log(`\n🔍 Manual Pattern Detection for ${patternName}:`);
  
  switch(patternName) {
    case 'singleton':
      if (code.includes('static instance') && code.includes('getInstance()')) {
        console.log('  ✅ Singleton pattern detected: static instance + getInstance method');
      }
      break;
      
    case 'factory':
      if (umlAnalysis.classes.length >= 3 && code.includes('create') && code.includes('new ')) {
        console.log('  ✅ Factory pattern detected: creator method + multiple product classes');
      }
      break;
      
    case 'observer':
      if (code.includes('listeners') && (code.includes('on(') || code.includes('emit('))) {
        console.log('  ✅ Observer pattern detected: listeners + event methods');
      }
      break;
  }
}

async function demonstrateSimilarityAnalysis() {
  console.log('\n📊 Similarity Analysis Between Patterns');
  console.log('─'.repeat(45));
  
  const patterns = Object.entries(patternExamples);
  
  for (let i = 0; i < Math.min(patterns.length, 3); i++) {
    for (let j = i + 1; j < Math.min(patterns.length, 4); j++) {
      const [name1, code1] = patterns[i];
      const [name2, code2] = patterns[j];
      
      try {
        const similarity = await intuition.getSimilarityScore(code1, code2);
        console.log(`  ${name1} ↔ ${name2}: ${(similarity.score * 100).toFixed(1)}% similar`);
      } catch (error) {
        console.log(`  ${name1} ↔ ${name2}: Similarity analysis unavailable`);
      }
    }
  }
}

async function demonstratePatternLearningTraining() {
  console.log('\n🎓 Pattern Learning Training Demo');
  console.log('─'.repeat(35));
  
  // Prepare training data
  const samples = [];
  const labels = [];
  
  Object.entries(patternExamples).forEach(([patternName, code]) => {
    samples.push(code);
    labels.push(patternName);
  });
  
  try {
    const learning = await intuition.learnPatterns(samples, labels);
    
    console.log(`✅ Learning completed: ${learning.success !== false ? 'Success' : 'Partial success'}`);
    console.log(`📚 Learned from ${samples.length} pattern examples`);
    
    if (learning.learnedPatterns !== undefined) {
      console.log(`🧩 Patterns learned: ${learning.learnedPatterns}`);
    }
    
    if (learning.confidence !== undefined) {
      console.log(`🎯 Learning confidence: ${(learning.confidence * 100).toFixed(1)}%`);
    }
    
  } catch (error) {
    console.log(`🔶 Pattern learning demo: ${error.message}`);
  }
}

// Run the example
demonstratePatternLearning().catch(console.error);
