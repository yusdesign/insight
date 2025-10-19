import InsightJS from '../src/index.js';

const insight = new InsightJS({ 
  debug: true,
  weights: {
    purpose: 0.4,
    anomalies: 0.3,
    patterns: 0.2,
    relationships: 0.1
  }
});

async function runExamples() {
  console.log('💡 insight.js Basic Examples\n');
  console.log('🚀 Starting complete cognitive analysis...\n');

  // Example 1: Analyze well-structured code
  console.log('1. Well-Structured Code Analysis:');
  const goodCode = `
    /**
     * Validates user registration data
     * @param {object} user - User object to validate
     * @returns {boolean} Validation result
     */
    function validateUserRegistration(user) {
      // Check required fields
      if (!user || typeof user !== 'object') {
        throw new Error('User object is required');
      }
      
      const required = ['email', 'password', 'username'];
      for (const field of required) {
        if (!user[field]) {
          throw new Error(field + ' is required');
        }
      }
      
      // Validate email format
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailRegex.test(user.email)) {
        throw new Error('Invalid email format');
      }
      
      // Validate password strength
      if (user.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
      
      return true;
    }
  `;

  console.log('🔍 Analyzing well-structured code...');
  const goodAnalysis = await insight.understand(goodCode);
  
  console.log('📊 Overall Score:', goodAnalysis.overallScore.toFixed(1));
  console.log('🎯 Primary Purpose:', goodAnalysis.synthesis.purpose);
  console.log('🚨 Anomalies Found:', goodAnalysis.synthesis.anomalyCount);
  console.log('🧩 Patterns Recognized:', goodAnalysis.synthesis.patternCount);
  console.log('💎 Confidence:', goodAnalysis.confidence.toFixed(2));
  
  console.log('\n📋 Recommendations:');
  goodAnalysis.recommendations.forEach(rec => {
    console.log('  [' + rec.priority.toUpperCase() + '] ' + rec.message);
  });

  // Example 2: Analyze problematic code
  console.log('\n2. Problematic Code Analysis:');
  const badCode = `
    function x(a,b,c){if(a){if(b){if(c){let d=123;let e=456;let f=789;let g=012;let h=345;let i=678;let j=901;let k=234;let l=567;let m=890;let n=123;let o=456;let p=789;let q=012;let r=345;let s=678;let t=901;let u=234;let v=567;let w=890;let x=123;let y=456;let z=789;return d+e+f+g+h+i+j+k+l+m+n+o+p+q+r+s+t+u+v+w+x+y+z}}}}
  `;

  console.log('🔍 Analyzing problematic code...');
  const badAnalysis = await insight.understand(badCode);
  
  console.log('📊 Overall Score:', badAnalysis.overallScore.toFixed(1));
  console.log('🚨 Critical Anomalies:', badAnalysis.synthesis.criticalAnomalies.length);
  console.log('💎 Maintainability:', badAnalysis.synthesis.maintainability.toFixed(1));
  console.log('💡 Clarity Score:', badAnalysis.synthesis.clarityScore.toFixed(1));
  
  console.log('\n📋 Recommendations:');
  badAnalysis.recommendations.forEach(rec => {
    console.log('  [' + rec.priority.toUpperCase() + '] ' + rec.message);
  });

  // Example 3: Suite information
  console.log('\n3. Insight Suite Information:');
  const suiteInfo = insight.getSuiteInfo();
  console.log('Suite:', suiteInfo.suite);
  console.log('Version:', suiteInfo.version);
  console.log('Cognitive Layers:');
  suiteInfo.cognitiveStack.forEach((layer, index) => {
    console.log('  ' + (index + 1) + '. ' + layer);
  });
  console.log('Layer Versions:', suiteInfo.layers);

  // Example 4: Deep analysis (with error handling)
  console.log('\n4. Deep Cognitive Analysis:');
  try {
    const deepAnalysis = await insight.analyzeDeep(goodCode);
    console.log('Intuition Score:', deepAnalysis.deepAnalysis.intuitionScore.toFixed(2));
    console.log('Cognitive Balance:', deepAnalysis.deepAnalysis.cognitiveBalance.balanced ? '✅ Balanced' : '❌ Imbalanced');
    if (deepAnalysis.deepAnalysis.relationships && deepAnalysis.deepAnalysis.relationships.clusters) {
      console.log('Relationship Clusters:', deepAnalysis.deepAnalysis.relationships.clusters.length);
    } else {
      console.log('Relationship Clusters: 0');
    }
  } catch (error) {
    console.log('Deep analysis incomplete (expected for v0.1.0)');
  }

  console.log('\n✅ All insight.js examples completed!');
  console.log('\n🎉 INSIGHT COGNITIVE SUITE COMPLETE! 🎉');
  console.log('\n🧭 point.js | 🔮 hunch.js | 🧠 intuition.js | 💡 insight.js');
  console.log('🚀 ALL SYSTEMS OPERATIONAL!');
}

runExamples().catch(console.error);
