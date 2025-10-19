# intuition.js 🧠

**Pattern recognition and learning for your codebase**

A JavaScript library for learning code patterns and finding relationships between code elements.

## Quick Start

```javascript
import IntuitionJS from 'intuition.js';

const intuition = new IntuitionJS();

// Learn patterns from examples
const examples = [
  \`function validateEmail(email) {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
  }\`,
  \`function checkPassword(password) {
    return password.length >= 8;
  }\`
];

await intuition.learnPatterns(examples, {0: 'validation', 1: 'validation'});

// Recognize patterns in new code
const analysis = await intuition.recognizePatterns(\`
  function verifyUser(user) {
    return user.age >= 18;
  }
\`);

console.log('Recognized patterns:', analysis.recognizedPatterns);
