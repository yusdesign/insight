import { PatternLearner } from '../src/core/learner.js';
import { RelationshipFinder } from '../src/core/relationships.js';
import assert from 'assert';

// Test PatternLearner
async function testPatternLearner() {
  console.log('🧪 Testing PatternLearner...');
  const learner = new PatternLearner();

  // Test 1: Learn patterns from examples
  const examples = [
    `function validateEmail(email) {
      const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      return regex.test(email);
    }`,
    `function checkPassword(password) {
      return password.length >= 8;
    }`
  ];

  const training = await learner.train(examples, {0: 'validation', 1: 'validation'});
  assert(training.learnedPatterns > 0, 'Should learn patterns from examples');
  console.log('✅ Pattern learning test passed');

  // Test 2: Recognize patterns
  const newCode = `function verifyUser(user) {
    return user.age >= 18;
  }`;
  
  const recognition = await learner.recognize(newCode);
  assert(Array.isArray(recognition.recognizedPatterns), 'Should return recognized patterns array');
  console.log('✅ Pattern recognition test passed');
}

// Test RelationshipFinder
async function testRelationshipFinder() {
  console.log('🧪 Testing RelationshipFinder...');
  const finder = new RelationshipFinder();

  // Test 1: Find relationships between similar code
  const snippets = [
    `function add(a, b) { return a + b; }`,
    `function multiply(x, y) { return x * y; }`,
    `const calculateSum = (num1, num2) => num1 + num2;`
  ];

  const relationships = await finder.analyze(snippets);
  assert(Array.isArray(relationships.relationships), 'Should return relationships array');
  assert(typeof relationships.overallSimilarity === 'number', 'Should calculate overall similarity');
  console.log('✅ Relationship analysis test passed');

  // Test 2: Calculate similarity
  const similarity = await finder.calculateSimilarity(
    'function test() { return true; }',
    'function check() { return false; }'
  );
  assert(similarity >= 0 && similarity <= 1, 'Similarity should be between 0 and 1');
  console.log('✅ Similarity calculation test passed');
}

// Run all tests
async function runTests() {
  try {
    await testPatternLearner();
    await testRelationshipFinder();
    console.log('\n🎉 All intuition.js tests passed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();
