import PointJS from '../src/index.js';

const point = new PointJS({ debug: true });

async function runExamples() {
  console.log('🧭 point.js Basic Examples\n');

  // Example 1: Identify code purpose
  console.log('1. Code Purpose Identification:');
  const validationCode = `
    function validateEmail(email) {
      const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!regex.test(email)) {
        throw new Error('Invalid email format');
      }
      return true;
    }
  `;

  const analysis = await point.identify(validationCode);
  console.log('Primary Purpose:', analysis.primaryPurpose);
  console.log('All Purposes:', analysis.purposes.map(p => ({
    purpose: p.purpose,
    confidence: p.confidence
  })));

  // Example 2: Check goal alignment
  console.log('\n2. Goal-Code Alignment:');
  const goal = "Validate user email format and throw error if invalid";
  const alignment = await point.isAligned(goal, validationCode);
  console.log('Aligned:', alignment.aligned);
  console.log('Score:', alignment.score);
  console.log('Matches:', alignment.matches);

  // Example 3: Extract goals from comments
  console.log('\n3. Comment Goal Extraction:');
  const codeWithComments = `
    // TODO: Add email format validation using regex
    // FIXME: Handle international email domains
    function processUser(input) {
      return input.toLowerCase().trim();
    }
  `;

  const goals = point.extractGoals(codeWithComments);
  console.log('Extracted Goals:', goals);

  console.log('\n✅ All examples completed!');
}

runExamples().catch(console.error);

