/**
 * Point.js Purpose Detection Example
 * 
 * Demonstrates identifying code purpose and checking goal alignment
 * using the point.js cognitive layer.
 */

import PointJS from 'point.js';

// Create point.js instance
const point = new PointJS({
  confidenceThreshold: 0.6,
  debug: false
});

// Different code examples for purpose detection
const codeExamples = {
  validation: `
    function validateEmail(email) {
      const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!regex.test(email)) {
        throw new Error('Invalid email format');
      }
      return true;
    }
  `,
  
  transformation: `
    function processUserData(users) {
      return users
        .filter(user => user.active)
        .map(user => ({
          name: user.name.toUpperCase(),
          email: user.email.toLowerCase(),
          role: user.role || 'user'
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  `,
  
  apiCommunication: `
    async function fetchUserProfile(userId) {
      try {
	const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('User not found');
        const userData = await response.json();
        return {
          ...userData,
          lastAccessed: new Date()
        };
      } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
      }
    }
  `
};

async function demonstratePurposeDetection() {
  console.log('🧭 Point.js - Purpose Detection Examples');
  console.log('=' .repeat(50));
  
  for (const [exampleName, code] of Object.entries(codeExamples)) {
    console.log(`\\n📝 Analyzing \${exampleName} code...\\n`);
    
    try {
      // Identify code purpose
      const analysis = await point.identify(code);
      
      console.log(`Primary Purpose: \${analysis.primaryPurpose?.purpose || 'Unknown'}`);
      console.log(`Confidence: \${(analysis.confidence * 100).toFixed(1)}%`);
      console.log(`Description: \${analysis.primaryPurpose?.description || 'No description'}`);
      
      // Show all detected purposes
      if (analysis.purposes.length > 1) {
        console.log('\\nAll detected purposes:');
        analysis.purposes.forEach(purpose => {
          console.log(`  - ${purpose.purpose}: \${(purpose.confidence * 100).toFixed(1)}% confidence`);
        });
      }
      
      // Test goal alignment
      const goals = {
        validation: 'Validate email format and throw error if invalid',
        transformation: 'Transform user data by filtering, mapping, and sorting',
        apiCommunication: 'Fetch user data from API and handle errors'
      };
      
      const alignment = await point.isAligned(goals[exampleName], code);
      console.log(`\\n🎯 Goal Alignment: \${alignment.aligned ? '✅' : '❌'}`);
      console.log(`Alignment Score: \${(alignment.score * 100).toFixed(1)}%`);
      
      if (alignment.matches.length > 0) {
        console.log('Key matches:');
        alignment.matches.slice(0, 3).forEach(match => {
          console.log(`  - "${match.goalKeyword}" ↔ "\${match.codeTerm}"`);
        });
      }
      
    } catch (error) {
      console.error(`❌ Analysis failed for ${exampleName}:`, error.message);
    }
    
    console.log('\\n' + '-'.repeat(40));
  }
}

// Additional demonstration: Comment goal extraction
async function demonstrateGoalExtraction() {
  console.log('\\n📋 Goal Extraction from Comments');
  console.log('=' .repeat(40));
  
  const codeWithComments = `
    // TODO: Implement rate limiting for API endpoints
    // FIXME: Memory leak in image processing function
    // NOTE: Temporary solution for demo purposes
    // OPTIMIZE: Database query performance needs improvement
    function processData() {
      // TODO: Add input validation here
      return data.map(item => item * 2);
    }
  `;
  
  const goals = point.extractGoals(codeWithComments);
  
  if (goals.length > 0) {
    console.log('Extracted development goals:');
    goals.forEach(goal => {
      const priorityIcon = goal.priority === 'high' ? '🔴' : goal.priority === 'medium' ? '🟡' : '🔵';
      console.log(`${priorityIcon} [${goal.type.toUpperCase()}] \${goal.goal}`);
    });
  } else {
    console.log('No goals found in comments');
  }
}

// Run the examples
async function runAllExamples() {
  await demonstratePurposeDetection();
  await demonstrateGoalExtraction();
}

runAllExamples().catch(console.error);
