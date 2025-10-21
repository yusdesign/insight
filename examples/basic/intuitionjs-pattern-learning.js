/**
 * Intuition.js Pattern Learning Example
 * 
 * Demonstrates code pattern learning, relationship analysis,
 * and similarity detection using the intuition.js cognitive layer.
 */

import IntuitionJS from 'intuition.js';

// Create intuition.js instance optimized for learning
const intuition = new IntuitionJS({
  learningRate: 0.15,          // Balanced learning speed
  confidenceThreshold: 0.6,    // Reasonable pattern recognition
  debug: false
});

// Training examples for different pattern categories
const trainingExamples = {
  validation: [
    `function validateEmail(email) {
      const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      return regex.test(email);
    }`,
    
    `function checkPassword(password) {
      return password.length >= 8 && 
             /[A-Z]/.test(password) && 
             /[0-9]/.test(password);
    }`,
    
    `function verifyAge(age) {
      return age >= 18 && age <= 120;
    }`
  ],
  
  calculation: [
    `function calculateArea(width, height) {
      return width * height;
    }`,
    
    `function computeVolume(length, width, height) {
      return length * width * height;
    }`,
    
    `function getTotalPrice(price, quantity, taxRate) {
      return (price * quantity) * (1 + taxRate);
    }`
  ],
  
  transformation: [
    `function formatUserName(user) {
      return user.name.trim().toLowerCase();
    }`,
    
    `function processDataItems(items) {
      return items
        .filter(item => item.active)
        .map(item => ({ ...item, processed: true }))
        .sort((a, b) => a.id - b.id);
    }`,
    
    `function normalizeText(input) {
      return input
        .toLowerCase()
        .replace(/[^a-z0-9]/g, ' ')
        .trim();
    }`
  ]
};

async function demonstratePatternLearning() {
  console.log('🧠 Intuition.js - Pattern Learning & Relationship Analysis');
  console.log('='.repeat(65));
  
  // Train the system with examples
  console.log('\n🎓 TRAINING PHASE: Learning patterns from examples\n');
  
  let allExamples = [];
  let allLabels = {};
  let index = 0;
  
  for (const [category, examples] of Object.entries(trainingExamples)) {
    examples.forEach(example => {
      allExamples.push(example);
      allLabels[index] = `${category}-pattern`;
      index++;
    });
  }
  
  const trainingResult = await intuition.learnPatterns(allExamples, allLabels);
  
  console.log(`✅ Learned ${trainingResult.learnedPatterns} patterns`);
  console.log(`📊 Training Confidence: ${(trainingResult.confidence * 100).toFixed(1)}%`);
  
  trainingResult.patterns.forEach(pattern => {
    console.log(`   - ${pattern.label}: ${pattern.pattern.slice(0, 50)}...`);
  });
}

async function demonstratePatternRecognition() {
  console.log('\n🔍 PATTERN RECOGNITION: Identifying patterns in new code\n');
  
  // New code to analyze
  const testCodes = [
    {
      name: 'User Validation',
      code: `function authenticateUser(user) {
        return user.verified && user.active && user.emailConfirmed;
      }`
    },
    {
      name: 'Price Calculation', 
      code: `function calculateDiscount(originalPrice, discountPercent) {
        return originalPrice * (1 - discountPercent / 100);
      }`
    },
    {
      name: 'Data Processing',
      code: `function transformUserData(users) {
        return users
          .map(user => ({ ...user, name: user.name.toUpperCase() }))
          .filter(user => user.age >= 18);
      }`
    },
    {
      name: 'Unrelated Code',
      code: `function logMessage(msg) {
        console.log(\`[\${new Date().toISOString()}] \${msg}\`);
      }`
    }
  ];
  
  for (const test of testCodes) {
    console.log(`\n📝 Testing: ${test.name}`);
    console.log('─'.repeat(30));
    
    const recognition = await intuition.recognizePatterns(test.code);
    
    if (recognition.recognizedPatterns.length > 0) {
      console.log(`✅ Recognized ${recognition.recognizedPatterns.length} pattern(s)`);
      
      recognition.recognizedPatterns.forEach(pattern => {
        console.log(`   🎯 ${pattern.label}: ${(pattern.confidence * 100).toFixed(1)}% confidence`);
        console.log(`      (learned from ${pattern.examples} examples)`);
      });
      
      if (recognition.suggestions.length > 0) {
        console.log('   💡 Suggestions:', recognition.suggestions[0]);
      }
    } else {
      console.log('❌ No patterns recognized - code may be unique or complex');
    }
    
    console.log(`   Overall Confidence: ${(recognition.confidence * 100).toFixed(1)}%`);
  }
}

async function demonstrateRelationshipAnalysis() {
  console.log('\n🔗 RELATIONSHIP ANALYSIS: Finding code connections\n');
  
  const codeSnippets = [
    // Similar validation functions
    `function checkEmail(email) {
      return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    }`,
    
    `function validateEmailFormat(email) {
      const pattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      return pattern.test(email);
    }`,
    
    // Different but related
    `function calculateRectangleArea(w, h) {
      return w * h;
    }`,
    
    // Unrelated
    `function logError(err) {
      console.error('ERROR: Relationship analysis failed');
    }`,
    
    // Similar to first two
    `function isEmailValid(email) {
      if (!email) return false;
      return email.includes('@') && email.includes('.');
    }`
  ];
  
  console.log('Analyzing relationships between 5 code snippets...\n');
  
  const relationships = await intuition.findRelationships(codeSnippets);
  
  console.log(`📊 Overall Similarity: ${(relationships.overallSimilarity * 100).toFixed(1)}%`);
  console.log(`🔗 Relationships Found: ${relationships.relationships.length}`);
  console.log(`🏷️ Clusters Identified: ${relationships.clusters.length}`);
  
  if (relationships.relationships.length > 0) {
    console.log('\n🔍 SIGNIFICANT RELATIONSHIPS:');
    relationships.relationships
      .filter(rel => rel.similarity > 0.5)
      .forEach(rel => {
        const strength = rel.strength === 'strong' ? '🔴' : 
                        rel.strength === 'medium' ? '🟡' : '🔵';
        console.log(`${strength} Snippet ${rel.snippet1} ↔ Snippet ${rel.snippet2}`);
        console.log(`   Similarity: ${(rel.similarity * 100).toFixed(1)}%`);
        console.log(`   Type: ${rel.type}`);
        console.log(`   Strength: ${rel.strength}`);
      });
  }
  
  if (relationships.clusters.length > 0) {
    console.log('\n🏷️ CODE CLUSTERS:');
    relationships.clusters.forEach((cluster, index) => {
      console.log(`   Cluster ${index + 1}: ${cluster.members.join(', ')}`);
      console.log(`     Size: ${cluster.size} snippets`);
      console.log(`     Avg Similarity: ${(cluster.averageSimilarity * 100).toFixed(1)}%`);
    });
  }
}

async function demonstrateSimilarityScoring() {
  console.log('\n📐 SIMILARITY SCORING: Measuring code resemblance\n');
  
  const comparisonPairs = [
    {
      name: 'Identical Validation',
      code1: `function validateUser(user) { return user && user.email; }`,
      code2: `function validateUser(user) { return user && user.email; }`
    },
    {
      name: 'Similar Calculations', 
      code1: `function calcArea(w, h) { return w * h; }`,
      code2: `function calculateArea(width, height) { return width * height; }`
    },
    {
      name: 'Different Purposes',
      code1: `function saveUser(user) { database.users.insert(user); }`,
      code2: `function deletePost(id) { database.posts.delete(id); }`
    },
    {
      name: 'Structural Similarity',
      code1: `function processA(data) { return data.map(x => x * 2).filter(x => x > 10); }`,
      code2: `function processB(items) { return items.map(i => i + 1).filter(i => i < 5); }`
    }
  ];
  
  console.log('Similarity Scale:');
  console.log('🟢 80-100%: Very similar or duplicate code');
  console.log('🟡 60-79%: Related functionality with shared patterns');
  console.log('🟠 40-59%: Some shared characteristics');
  console.log('🔴 0-39%: Mostly unrelated code\n');
  
  for (const pair of comparisonPairs) {
    const similarity = await intuition.getSimilarity(pair.code1, pair.code2);
    const percent = similarity * 100;
    
    let rating, icon;
    if (percent >= 80) { rating = 'Very Similar'; icon = '🟢'; }
    else if (percent >= 60) { rating = 'Related'; icon = '🟡'; }
    else if (percent >= 40) { rating = 'Some Similarity'; icon = '🟠'; }
    else { rating = 'Unrelated'; icon = '🔴'; }
    
    console.log(`${icon} ${pair.name}: ${percent.toFixed(1)}% (${rating})`);
  }
}

async function demonstrateRefactoringSuggestions() {
  console.log('\n💡 REFACTORING SUGGESTIONS: Intelligent code improvements\n');
  
  const complexCode = `
    function handleUserDataProcessing(userInformation) {
      if (userInformation != null && typeof userInformation === 'object') {
        if (userInformation.profileDetails != null) {
          if (userInformation.profileDetails.accountSettings != null) {
            if (userInformation.profileDetails.accountSettings.communicationPreferences != null) {
              if (userInformation.profileDetails.accountSettings.communicationPreferences.emailNotifications != null) {
                return userInformation.profileDetails.accountSettings.communicationPreferences.emailNotifications.enabledFlag;
              }
            }
          }
        }
      }
      return false;
    }
  `;
  
  console.log('Analyzing complex code for refactoring opportunities...\n');
  
  const suggestions = await intuition.suggestRefactoring(complexCode);
  
  console.log(`🔧 Refactoring Confidence: ${(suggestions.refactoringConfidence * 100).toFixed(1)}%`);
  
  if (suggestions.patterns.length > 0) {
    console.log('\n🎯 Recognized Patterns:');
    suggestions.patterns.forEach(pattern => {
      console.log(`   - ${pattern.label} (${(pattern.confidence * 100).toFixed(1)}% confidence)`);
    });
  }
  
  if (suggestions.suggestions.length > 0) {
    console.log('\n💡 Improvement Suggestions:');
    suggestions.suggestions.forEach((suggestion, index) => {
      console.log(`   ${index + 1}. ${suggestion}`);
    });
  }
}

// Run all demonstrations
async function runAllExamples() {
  await demonstratePatternLearning();
  await demonstratePatternRecognition();
  await demonstrateRelationshipAnalysis();
  await demonstrateSimilarityScoring();
  await demonstrateRefactoringSuggestions();
}

// Error handling wrapper
async function runWithErrorHandling() {
  try {
    await runAllExamples();
  } catch (error) {
    console.error('❌ Example execution failed:', error.message);
  }
}

runWithErrorHandling().catch(error => {
  console.error('Unexpected error:', error);
});
