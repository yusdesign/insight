# Basic Examples 🎯

**Fundamental usage of the Insight cognitive suite**

## 📋 Available Examples

### Individual Layer Usage
- [`pointjs-purpose-detection.js`](./pointjs-purpose-detection.js) - Identify code purpose and goals
- [`hunchjs-anomaly-detection.js`](./hunchjs-anomaly-detection.js) - Detect code smells and quality issues
- [`intuitionjs-pattern-learning.js`](./intuitionjs-pattern-learning.js) - Learn and recognize code patterns
- [`insightjs-holistic-analysis.js`](./insightjs-holistic-analysis.js) - Complete cognitive analysis

### Combined Usage
- [`progressive-analysis.js`](./progressive-analysis.js) - Start simple, go deeper as needed
- [`layer-comparison.js`](./layer-comparison.js) - Compare different analysis approaches
- [`configuration-basics.js`](./configuration-basics.js) - Basic setup and tuning

## 🚀 Quick Examples

### Purpose Detection
```javascript
// pointjs-purpose-detection.js
import PointJS from 'point.js';

const point = new PointJS();
const analysis = await point.identify(\`
  function validateUser(user) {
    if (!user.email) return false;
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(user.email);
  }
\`);

console.log('Primary Purpose:', analysis.primaryPurpose.purpose);
```

Quality Assessment

```javascript
// hunchjs-anomaly-detection.js  
import HunchJS from 'hunch.js';

const hunch = new HunchJS();
const analysis = await hunch.detectAnomalies(code);
console.log('Intuition Score:', await hunch.getIntuitionScore(code));
```

🎯 Learning Goals

After completing these examples, you'll understand:

· How to use each cognitive layer independently
· Basic configuration and setup
· Interpreting analysis results
· Simple integration patterns

🔧 Running Examples

```bash
# Run all basic examples
find examples/basic -name "*.js" -exec node {} \;

# Run specific example
node examples/basic/pointjs-purpose-detection.js
```

📖 Next Steps

Ready for more? Check out:

· Advanced Examples - Custom configurations and optimizations
· Integration Examples - Workflow and tool integration
· Real-World Examples - Practical application scenarios
