import { PurposeIdentifier } from '../src/core/identifier.js';
import { GoalAligner } from '../src/core/aligner.js';
import assert from 'assert';

// Test PurposeIdentifier
async function testPurposeIdentifier() {
  console.log('🧪 Testing PurposeIdentifier...');
  const identifier = new PurposeIdentifier();

  // Test 1: Identify data validation code
  const code = `
    function validateEmail(email) {
      const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      return regex.test(email);
    }
  `;

  const analysis = await identifier.analyze(code);
  assert(analysis.purposes.length > 0, 'Should find at least one purpose');
  console.log('✅ Purpose identification test passed');

  // Test 2: Empty code handling
  const emptyAnalysis = await identifier.analyze('');
  assert(emptyAnalysis.purposes.length === 0, 'Empty code should return no purposes');
  assert(emptyAnalysis.primaryPurpose === null, 'Empty code should have no primary purpose');
  console.log('✅ Empty code test passed');
}

// Test GoalAligner  
async function testGoalAligner() {
  console.log('🧪 Testing GoalAligner...');
  const aligner = new GoalAligner();

  // Test 1: Goal alignment
  const goal = "Validate user email format";
  const code = `
    function validateEmail(email) {
      const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      return regex.test(email);
    }
  `;

  const result = await aligner.checkAlignment(goal, code);
  assert(typeof result.aligned === 'boolean', 'Should return alignment boolean');
  assert(typeof result.score === 'number', 'Should return alignment score');
  console.log('✅ Goal alignment test passed');

  // Test 2: Comment parsing
  const comments = "// TODO: Implement error handling";
  const goals = aligner.parseComments(comments);
  assert(Array.isArray(goals), 'Should return array of goals');
  console.log('✅ Comment parsing test passed');
}

// Run all tests
async function runTests() {
  try {
    await testPurposeIdentifier();
    await testGoalAligner();
    console.log('\n🎉 All tests passed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();

