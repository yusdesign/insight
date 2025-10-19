# hunch.js 🔮

**Trust your code's gut feelings**

A JavaScript library for detecting anomalies, code smells, and patterns in your codebase.

## Quick Start

```javascript
import HunchJS from 'hunch.js';

const hunch = new HunchJS();

// Detect anomalies in your code
const analysis = await hunch.detectAnomalies(`
  function problematicCode() {
    // Deep nesting and magic numbers
    if (user && user.profile && user.profile.settings) {
      calculateScore(user.age * 123 + 456);
    }
  }
`);

console.log('Anomalies found:', analysis.anomalies.length);
console.log('Confidence:', analysis.confidence);

// Get your gut feeling score
const intuition = await hunch.getIntuitionScore(code);
console.log('Gut feeling:', intuition);
