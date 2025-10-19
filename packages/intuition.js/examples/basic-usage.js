import IntuitionJS from '../src/index.js';

const intuition = new IntuitionJS({ debug: true });

async function runExamples() {
  console.log('🧠 intuition.js Basic Examples\n');

  // Example 1: Learn patterns from code examples
  console.log('1. Pattern Learning:');
  const trainingExamples = [
    `function validateEmail(email) {
      const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      return regex.test(email);
    }`,
    `function checkPassword(password) {
      return password.length >= 8 && /[A-Z]/.test(password);
    }`,
    `function verifyAge(age) {
      return age >= 18;
    }`,
    `function calculateArea(width, height) {
      return width * height;
    }`,
    `function computeVolume(length, width, height) {
      return length * width * height;
    }`
  ];

  const labels = {
    0: 'validation-pattern',
    1: 'validation-pattern', 
    2: 'validation-pattern',
    3: 'calculation-pattern',
    4: 'calculation-pattern'
  };

  const learningResult = await intuition.learnPatterns(trainingExamples, labels);
  console.log('Learned patterns:', learningResult.learnedPatterns);
  console.log('Pattern details:', learningResult.patterns);

  // Example 2: Recognize patterns in new code
  console.log('\n2. Pattern Recognition:');
  const newCode = `function authenticateUser(user) {
    return user.verified && user.active;
  }`;

  const recognition = await intuition.recognizePatterns(newCode);
  console.log('Recognized patterns:', recognition.recognizedPatterns.length);
  console.log('Confidence:', recognition.confidence);
  recognition.recognizedPatterns.forEach(pattern => {
    console.log(`  - ${pattern.label}: ${pattern.confidence.toFixed(2)} confidence`);
  });

  // Example 3: Find relationships between code snippets
  console.log('\n3. Relationship Finding:');
  const codeSnippets = [
    `function processUser(user) { return user.name.toUpperCase(); }`,
    `function formatName(name) { return name.trim().toLowerCase(); }`,
    `function calculateTax(income) { return income * 0.2; }`,
    `function computeSalary(hours, rate) { return hours * rate; }`
  ];

  const relationships = await intuition.findRelationships(codeSnippets);
  console.log('Relationships found:', relationships.relationships.length);
  console.log('Overall similarity:', relationships.overallSimilarity.toFixed(2));
  relationships.relationships.forEach(rel => {
    console.log(`  - Snippet ${rel.snippet1} ↔ Snippet ${rel.snippet2}: ${rel.similarity.toFixed(2)} (${rel.type})`);
  });

  // Example 4: Calculate similarity between two code pieces
  console.log('\n4. Code Similarity:');
  const similarity = await intuition.getSimilarity(
    `function add(a, b) { return a + b; }`,
    `function sum(x, y) { return x + y; }`
  );
  console.log('Similarity score:', similarity.toFixed(2));

  // Example 5: Refactoring suggestions
  console.log('\n5. Refactoring Suggestions:');
  const complexCode = `
    function handleUserData(user) {
      if (user) {
        if (user.profile) {
          if (user.profile.settings) {
            return user.profile.settings.notifications;
          }
        }
      }
      return false;
    }
  `;

  const refactoring = await intuition.suggestRefactoring(complexCode);
  console.log('Refactoring confidence:', refactoring.refactoringConfidence.toFixed(2));
  console.log('Suggestions:', refactoring.suggestions);

  console.log('\n✅ All intuition.js examples completed!');
}

runExamples().catch(console.error);
