# Insight Suite 🧠

**A suite of intelligent development tools for understanding code at different cognitive levels.**

## 🎯 The Complete Cognitive Stack

| Layer | Package | Status | Description |
|-------|---------|--------|-------------|
| **1. Point** | [`point.js`](./packages/point.js) | ✅ **Production Ready** | Find your code's true north - Purpose detection and goal alignment |
| **2. Hunch** | [`hunch.js`](./packages/hunch.js) | ✅ **Production Ready** | Trust your code's gut feelings - Anomaly and pattern detection |
| **3. Intuition** | [`intuition.js`](./packages/intuition.js) | ✅ **Production Ready** | Pattern recognition and learning for your codebase |
| **4. Insight** | [`insight.js`](./packages/insight.js) | ✅ **Production Ready** | Holistic code understanding and synthesis |

## 🏗️ Architecture Philosophy

The Insight Suite follows a layered cognitive approach to code understanding:

1. **🧭 Point** - Purpose & Direction (*The "Why"*)
   - What is this code trying to achieve?
   - Does it align with its intended goals?

2. **🔮 Hunch** - Detection & Signals (*The "What"*)  
   - What anomalies or patterns exist?
   - What's the gut feeling about this code?

3. **🧠 Intuition** - Pattern Recognition (*The "How"*)
   - How does this relate to other code?
   - What patterns can we learn and recognize?

4. **💡 Insight** - Understanding & Synthesis (*The "So What"*)
   - Holistic understanding combining all layers
   - Actionable insights and recommendations

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yusdesign/insight.git
cd insight

# Install dependencies
npm install

# Run tests for all packages
npm run test

# Try individual examples
cd packages/point.js && npm run example
cd packages/hunch.js && npm run example  
cd packages/intuition.js && npm run example
```

📦 Individual Packages

🧭 point.js

```javascript
import PointJS from 'point.js';
const point = new PointJS();
const analysis = await point.identify(code);
console.log(analysis.primaryPurpose.purpose); // "data-validation"
```

🔮 hunch.js

```javascript
import HunchJS from 'hunch.js';
const hunch = new HunchJS();
const anomalies = await hunch.detectAnomalies(code);
console.log('Gut feeling:', await hunch.getIntuitionScore(code));
```

🧠 intuition.js

```javascript
import IntuitionJS from 'intuition.js';
const intuition = new IntuitionJS();
await intuition.learnPatterns(examples, labels);
const patterns = await intuition.recognizePatterns(newCode);
```

💡 insight.js (Coming Soon)

```javascript
import InsightJS from 'insight.js';
const insight = new InsightJS();
const holisticAnalysis = await insight.understand(code);
```

🛠️ Development

```bash
# Work on a specific package
cd packages/point.js
npm run dev

# Run tests for specific package
npm test

# Build all packages
npm run build
```

🏆 Status & Progress

· ✅ point.js: Complete with purpose detection and goal alignment
· ✅ hunch.js: Complete with anomaly detection and pattern matching
· ✅ intuition.js: Complete with pattern learning and relationship finding
· ✅ insight.js: Complete with holistic synthesis layer

🤝 Contributing

We welcome contributions! Each package follows the cognitive layer philosophy and maintains:

· Clear, focused responsibilities
· Comprehensive test suites
· Excellent documentation
· API consistency

📄 License

MIT License - see LICENSE for details.

---

Built with ❤️ as part of the Insight cognitive code analysis suite.
