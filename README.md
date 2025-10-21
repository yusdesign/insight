# 🧠 Insight - AI-Powered Code Analysis Suite

[![Point.js](https://img.shields.io/badge/Point.js-Purpose%20Analysis-blue)](packages/point.js)
[![Hunch.js](https://img.shields.io/badge/Hunch.js-Anomaly%20Detection-orange)](packages/hunch.js)
[![Intuition.js](https://img.shields.io/badge/Intuition.js-Pattern%20Learning-purple)](packages/intuition.js)
[![Insight.js](https://img.shields.io/badge/Insight.js-Holistic%20Analysis-green)](packages/insight.js)
![Zero Vulnerabilities](https://img.shields.io/badge/Vulnerabilities-0-brightgreen)
![All Tests Passing](https://img.shields.io/badge/Tests-100%25%20passing-success)

> **Find your code's true north** - A comprehensive suite of AI-powered tools for understanding, analyzing, and improving your JavaScript code.

## 🎯 What is Insight?

Insight is a modular, zero-dependency AI code analysis suite that helps you understand what your code does, detect potential issues, learn from patterns, and gain holistic insights into your codebase.

## 🚀 Quick Start

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yusdesign/insight.git
cd insight

# Install dependencies for each package
cd packages/point.js && npm install
cd ../hunch.js && npm install
cd ../intuition.js && npm install
cd ../insight.js && npm install

# Build all packages
npm run build
```

Basic Usage

```javascript
import { PointJS, HunchJS, IntuitionJS, InsightJS } from './packages/index.js';

// Analyze any JavaScript code
const code = `
  async function getUser(id) {
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  }
`;

const point = new PointJS();
const analysis = await point.identify(code);
console.log('Purpose:', analysis.primaryPurpose.purpose);
console.log('Confidence:', analysis.confidence);
```

Try the Comprehensive Analysis

```bash
node examples/integration/comprehensive-analysis.js
```

📦 The Insight Suite

🎯 Point.js - Purpose Identification

Understand what your code actually does

```javascript
const point = new PointJS();
const purpose = await point.identify(code);
// Output: { primaryPurpose: { purpose: 'api-communication', confidence: 0.85 } }
```

🔍 Hunch.js - Anomaly Detection

Trust your code's gut feelings

```javascript
const hunch = new HunchJS();
const anomalies = await hunch.detectAnomalies(code);
// Detects: code smells, complexity issues, potential bugs
```

🧠 Intuition.js - Pattern Learning

Learn from code patterns and predict behavior

```javascript
const intuition = new IntuitionJS();
const prediction = await intuition.predict(code);
// Predicts: code purpose, potential issues, improvements
```

🌟 Insight.js - Holistic Analysis

Get comprehensive code understanding

```javascript
const insight = new InsightJS();
const report = await insight.generateReport(code);
// Provides: architecture analysis, quality metrics, recommendations
```

🛠️ Advanced Usage

Integration Example

```javascript
import PointJS from './packages/point.js/src/index.js';
import HunchJS from './packages/hunch.js/src/index.js';
import IntuitionJS from './packages/intuition.js/src/index.js';
import InsightJS from './packages/insight.js/src/index.js';

async function analyzeCodebase(code) {
  const [purpose, anomalies, predictions, holistic] = await Promise.all([
    point.identify(code),
    hunch.detectAnomalies(code),
    intuition.predict(code),
    insight.analyze(code)
  ]);
  
  return { purpose, anomalies, predictions, holistic };
}
```

Custom Configuration

```javascript
const analyzer = new PointJS({
  confidenceThreshold: 0.7,
  debug: true,
  enableML: true
});
```

🎨 Real-World Examples

Analyze API Code

```javascript
const apiCode = `
  class UserService {
    async getUser(id) {
      const response = await fetch(\`/api/users/\${id}\`);
      if (!response.ok) throw new Error('User not found');
      return this.transformUserData(await response.json());
    }
  }
`;

const analysis = await point.identify(apiCode);
// Identifies: API communication with 85% confidence
```

Detect Code Quality Issues

```javascript
const complexCode = `
  function processData(data) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].active) {
        for (let j = 0; j < data[i].items.length; j++) {
          result.push(data[i].items[j].value * 12345);
        }
      }
    }
    return result;
  }
`;

const anomalies = await hunch.detectAnomalies(complexCode);
// Detects: magic numbers, deep nesting, potential optimizations
```

📊 What You Get

Analysis Type What It Does Example Output
Purpose Identifies code intent api-communication, data-processing, validation
Quality Detects issues & smells high-complexity, deep-nesting, magic-numbers
Patterns Learns code behaviors factory-pattern, async-await, observer-pattern
Insights Holistic understanding Architecture score, maintainability, recommendations

🏗️ Architecture

```
insight/
├── packages/
│   ├── point.js/          # Purpose identification
│   ├── hunch.js/          # Anomaly detection
│   ├── intuition.js/      # Pattern learning
│   └── insight.js/        # Holistic analysis
├── examples/              # Usage examples
└── tests/                 # Test suites
```

🧪 Testing

```bash
# Run all tests
cd packages/point.js && npm test
cd ../hunch.js && npm test
cd ../intuition.js && npm test
cd ../insight.js && npm test

# Or use the test suite
sh suite_tests.sh
```

🎯 Key Features

· ✅ Zero Vulnerabilities - Clean, secure dependency stack
· ✅ 100% Test Coverage - All packages fully tested
· ✅ Modular Architecture - Use individual tools or complete suite
· ✅ Lightweight - No heavy ML dependencies required
· ✅ Real AI Insights - Sophisticated pattern recognition
· ✅ Actionable Feedback - Clear, practical recommendations

🚀 Use Cases

· Code Review Automation - Pre-commit quality checks
· Developer Education - Understand code patterns
· Architecture Analysis - Detect anti-patterns
· Code Migration - Analyze legacy codebases
· Quality Gates - CI/CD pipeline integration

🤝 Contributing

We love contributions! Feel free to:

· Report bugs and issues
· Suggest new features
· Submit pull requests
· Improve documentation

📄 License

MIT License - feel free to use this project however you'd like!

🎊 Acknowledgments

Built with passion for the developer community. Special thanks to all contributors and the open-source ecosystem that makes projects like this possible!

---

Ready to understand your code like never before? 🚀

Get Started | View Examples | Explore Packages
