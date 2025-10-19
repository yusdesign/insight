import InsightJS from '../src/index.js';
import assert from 'assert';

async function testInsightJS() {
  console.log('💡 Testing InsightJS...');
  const insight = new InsightJS();

  // Test 1: Basic holistic analysis
  const testCode = `
    function validateUser(user) {
      if (!user || !user.email) {
        throw new Error('User must have email');
      }
      
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailRegex.test(user.email)) {
        throw new Error('Invalid email format');
      }
      
      return true;
    }
  `;

  const analysis = await insight.understand(testCode);
  
  assert(analysis.synthesis, 'Should return synthesis object');
  assert(analysis.layers.point, 'Should include point.js analysis');
  assert(analysis.layers.hunch, 'Should include hunch.js analysis');
  assert(analysis.layers.intuition, 'Should include intuition.js analysis');
  assert(typeof analysis.overallScore === 'number', 'Should calculate overall score');
  assert(Array.isArray(analysis.recommendations), 'Should generate recommendations');
  console.log('✅ Holistic analysis test passed');

  // Test 2: Suite information
  const suiteInfo = insight.getSuiteInfo();
  assert(suiteInfo.suite === 'Insight Cognitive Code Analysis Suite', 'Should return suite info');
  assert(Array.isArray(suiteInfo.cognitiveStack), 'Should include cognitive stack');
  console.log('✅ Suite info test passed');

  // Test 3: Deep analysis
  const deepAnalysis = await insight.analyzeDeep(testCode);
  assert(deepAnalysis.deepAnalysis, 'Should include deep analysis');
  assert(deepAnalysis.deepAnalysis.relationships, 'Should include relationships');
  console.log('✅ Deep analysis test passed');
}

// Run tests
async function runTests() {
  try {
    await testInsightJS();
    console.log('\n🎉 All insight.js tests passed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();
