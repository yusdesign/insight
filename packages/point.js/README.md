# point.js 🧭

**Find your code's true north**

A lightweight JavaScript library for understanding code purpose and ensuring goal alignment.

## Quick Start

```javascript
import PointJS from 'point.js';

const point = new PointJS();

// Identify what your code does
const analysis = await point.identify(`
  function validateEmail(email) {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
  }
`);

console.log(analysis.primaryPurpose.purpose); // "data-validation"

// Check if code aligns with goals
const alignment = await point.isAligned(
  "Validate user email format", 
  validationCode
);

console.log(alignment.aligned); // true
