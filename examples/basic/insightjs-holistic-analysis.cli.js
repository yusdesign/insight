/**
 * Basic Holistic Analysis Example
 * 
 * Demonstrates complete cognitive analysis using insight.js
 * This example shows how to get a comprehensive understanding
 * of code by combining all four cognitive layers.
 */

import InsightJS from 'insight.js';

// Create insight instance with default configuration
const insight = new InsightJS({
  debug: false,  // Set to true to see detailed analysis process
  weights: {
    purpose: 0.4,      // Emphasize understanding code intent
    anomalies: 0.3,     // Important but secondary to purpose
    patterns: 0.2,      // Pattern recognition value
    relationships: 0.1  // Contextual understanding
  }
});

// Example code to analyze - a user validation function
const userValidationCode = `
  /**
   * Validates user registration data
   * @param {object} user - User object to validate
   * @returns {object} Validation result with errors and isValid flag
   */
  function validateUserRegistration(user) {
    const errors = [];
    
    // Check required fields
    if (!user || typeof user !== 'object') {
      throw new Error('User object is required');
    }
    
    const requiredFields = ['email', 'password', 'username'];
    for (const field of requiredFields) {
      if (!user[field]) {
	errors.push(\`\${field} is required\`);
      }
    }
    
    // Validate email format
    if (user.email) {
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailRegex.test(user.email)) {
        errors.push('Invalid email format');
      }
    }
    
    // Validate password strength
    if (user.password) {
      if (user.password.length < 8) {
        errors.push('Password must be at least 8 characters');
      }
      if (!/[A-Z]/.test(user.password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/[0-9]/.test(user.password)) {
        errors.push('Password must contain at least one number');
      }
    }
    
    // Validate username
    if (user.username) {
      if (user.username.length < 3) {
        errors.push('Username must be at least 3 characters');
      }
      if (!/^[a-zA-Z0-9_]+$/.test(user.username)) {
        errors.push('Username can only contain letters, numbers, and underscores');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
`;

async function runHolisticAnalysis() {
  console.log('🔍 Starting Holistic Code Analysis');
  console.log('=' .repeat(50));
  
  try {
    // Perform complete cognitive analysis
    const analysis = await insight.understand(userValidationCode, {
      fileType: 'javascript',
      projectContext: 'user-authentication-system'
    });
    
    // Display comprehensive results
    console.log('\n📊 HOLISTIC ANALYSIS RESULTS');
    console.log('-' .repeat(30));
    
    // Overall assessment
    console.log(`🏆 Overall Score: \${analysis.overallScore}/100`);
    console.log(`💎 Analysis Confidence: \${(analysis.confidence * 100).toFixed(1)}%`);
    
    // Purpose understanding
    console.log('\n🎯 PURPOSE UNDERSTANDING');
    console.log('-' .repeat(25));
    console.log(`Primary Purpose: \${analysis.synthesis.purpose}`);
    console.log(`Purpose Confidence: \${(analysis.synthesis.purposeConfidence * 100).toFixed(1)}%`);
    
    // Quality assessment
    console.log('\n🚨 QUALITY ASSESSMENT');
    console.log('-' .repeat(20));
    console.log(`Total Anomalies: \${analysis.synthesis.anomalyCount}`);
    console.log(`Critical Issues: \${analysis.synthesis.criticalAnomalies.length}`);
    console.log(`Maintainability: \${analysis.synthesis.maintainability}/100`);
    console.log(`Clarity Score: \${analysis.synthesis.clarityScore}/100`);
    
    // Pattern recognition
    console.log('\n🧩 PATTERN RECOGNITION');
    console.log('-' .repeat(22));
    console.log(`Patterns Recognized: \${analysis.synthesis.patternCount}`);
    if (analysis.synthesis.primaryPattern) {
      console.log(`Primary Pattern: ${analysis.synthesis.primaryPattern.label} (\${(analysis.synthesis.primaryPattern.confidence * 100).toFixed(1)}% confidence)`);
    }
    
    // Recommendations
    console.log('\n💡 ACTIONABLE RECOMMENDATIONS');
    console.log('-' .repeat(32));
    
    if (analysis.recommendations.length === 0) {
      console.log('✅ No significant issues found - code looks good!');
    } else {
      analysis.recommendations.forEach((rec, index) => {
        const priorityIcon = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🔵';
        console.log(`${priorityIcon} [${rec.priority.toUpperCase()}] \${rec.message}`);
        console.log(`   Action: \${rec.action}`);
        if (index < analysis.recommendations.length - 1) console.log(''); // Spacing
      });
    }
    
    // Layer details (available for deeper inspection)
    console.log('\n🔍 COGNITIVE LAYER DETAILS');
    console.log('-' .repeat(25));
    console.log(`Purpose Analysis Confidence: \${(analysis.layers.point.confidence * 100).toFixed(1)}%`);
    console.log(`Anomaly Detection Confidence: \${(analysis.layers.hunch.confidence * 100).toFixed(1)}%`);
    console.log(`Pattern Recognition Confidence: \${(analysis.layers.intuition.confidence * 100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the example
runHolisticAnalysis().catch(console.error);

// Export for use in other examples
export { runHolisticAnalysis, userValidationCode };
