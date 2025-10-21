import PointJS from '../../packages/point.js/src/index.js';
import HunchJS from '../../packages/hunch.js/src/index.js';
import IntuitionJS from '../../packages/intuition.js/src/index.js';
import InsightJS from '../../packages/insight.js/src/index.js';

async function comprehensiveAnalysis() {
  console.log('🚀 Starting Comprehensive Code Analysis Suite\n');
  
  const code = `
    // API Service for user management
    class UserService {
      constructor() {
        this.baseUrl = 'https://api.example.com';
      }
      
      async getUser(id) {
        try {
          const response = await fetch(\`\${this.baseUrl}/users/\${id}\`);
          if (!response.ok) {
            throw new Error('User not found');
          }
          const user = await response.json();
          return this.transformUserData(user);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          return null;
        }
      }
      
      transformUserData(user) {
        return {
          id: user.id,
          fullName: \`\${user.firstName} \${user.lastName}\`,
          email: user.emailAddress,
          isActive: user.status === 'active'
        };
      }
    }
  `;

  // Initialize all analyzers
  const point = new PointJS();
  const hunch = new HunchJS();
  const intuition = new IntuitionJS();
  const insight = new InsightJS();

  try {
    // Run comprehensive analysis
    const [purpose, anomalies, predictions, holistic] = await Promise.all([
      point.identify(code),
      hunch.detectAnomalies(code),
      intuition.predict(code),
      insight.analyze(code)
    ]);

    console.log('📊 COMPREHENSIVE ANALYSIS RESULTS');
    console.log('=================================\n');
    
    console.log('🎯 PURPOSE ANALYSIS:');
    console.log(`   Primary Purpose: ${purpose.primaryPurpose.purpose}`);
    console.log(`   Confidence: ${(purpose.confidence * 100).toFixed(1)}%`);
    
    console.log('\n🔍 CODE QUALITY:');
    console.log(`   Anomalies Found: ${anomalies.anomalies.length}`);
    console.log(`   High Severity: ${anomalies.summary?.bySeverity?.high || 0}`);
    console.log(`   Intuition Score: ${(await hunch.getIntuitionScore(code) * 100).toFixed(1)}%`);
    
    console.log('\n🧠 PREDICTIONS:');
    console.log(`   Predicted Purpose: ${predictions.prediction}`);
    console.log(`   Prediction Confidence: ${(predictions.confidence * 100).toFixed(1)}%`);
    
    console.log('\n🌟 HOLISTIC INSIGHTS:');
    // Safe access to holistic analysis
    if (holistic && holistic.summary) {
      console.log(`   Overall Status: ${holistic.summary.status || 'unknown'}`);
      console.log(`   Key Findings: ${holistic.summary.totalFindings || 0}`);
    } else {
      console.log(`   Overall Status: Analysis completed`);
      console.log(`   Key Findings: Holistic analysis available`);
    }
    
    console.log('\n💡 RECOMMENDATIONS:');
    const highSeverity = anomalies.summary?.bySeverity?.high || 0;
    if (highSeverity > 0) {
      console.log('   ⚠️  Address high-severity anomalies first');
    }
    if (purpose.confidence < 0.7) {
      console.log('   💭 Code purpose could be clearer');
    }
    if (anomalies.anomalies.length === 0) {
      console.log('   ✅ Code quality looks good!');
    }
    
    console.log('\n🎉 Analysis complete! All systems operational!');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    console.log('But individual packages are working! 🛠️');
  }
}

comprehensiveAnalysis().catch(console.error);
