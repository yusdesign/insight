# insight.js 💡

**Holistic code understanding and synthesis**

The complete Insight experience - combining all cognitive layers for comprehensive code analysis.

## 🎯 The Final Cognitive Layer

insight.js synthesizes analysis from all three previous layers:

- 🧭 **point.js** - Purpose detection
- 🔮 **hunch.js** - Anomaly detection  
- 🧠 **intuition.js** - Pattern learning
- 💡 **insight.js** - Holistic synthesis

## 🚀 Quick Start

```javascript
import InsightJS from 'insight.js';

const insight = new InsightJS();

// Complete holistic analysis
const analysis = await insight.understand(`
  function processData(data) {
    if (!data || !data.values) {
      throw new Error('Invalid data');
    }
    return data.values.map(v => v * 2).filter(v => v > 10);
  }
`);

console.log('Overall Score:', analysis.overallScore);
console.log('Purpose:', analysis.synthesis.purpose);
console.log('Recommendations:', analysis.recommendations);
```

🧠 Holistic Analysis Features

📊 Comprehensive Scoring

· Overall Quality Score (0-100)
· Purpose Clarity assessment
· Maintainability estimation
· Code Complexity analysis

🎯 Actionable Insights

· Priority-based recommendations
· Specific improvement actions
· Cognitive layer balance analysis
· Deep relationship understanding

🔍 Multi-Layer Synthesis

· Purpose detection from point.js
· Anomaly awareness from hunch.js
· Pattern recognition from intuition.js
· Holistic understanding from insight.js

📈 Analysis Output

```javascript
{
  synthesis: {
    purpose: "data-transformation",
    purposeConfidence: 0.85,
    anomalyCount: 2,
    criticalAnomalies: [],
    patternCount: 3,
    overallScore: 82,
    maintainability: 88,
    clarityScore: 90
  },
  recommendations: [
    {
      priority: "medium",
      category: "complexity", 
      message: "Code is moderately complex",
      action: "Consider breaking into smaller functions"
    }
  ],
  layers: {
    point: { /* point.js analysis */ },
    hunch: { /* hunch.js analysis */ },
    intuition: { /* intuition.js analysis */ }
  }
}
```

⚙️ Configuration

```javascript
const insight = new InsightJS({
  // Layer-specific options
  point: { confidenceThreshold: 0.6 },
  hunch: { similarityThreshold: 0.7 },
  intuition: { learningRate: 0.1 },
  
  // Synthesis weights
  weights: {
    purpose: 0.4,      // Purpose clarity importance
    anomalies: 0.3,    // Anomaly impact weight  
    patterns: 0.2,     // Pattern recognition value
    relationships: 0.1 // Relationship analysis weight
  }
});
```

🏗️ Architecture

insight.js doesn't replace the other layers - it enhances them by:

1. Parallel Analysis - Running all cognitive layers simultaneously
2. Intelligent Synthesis - Combining results with weighted importance
3. Actionable Output - Generating prioritized recommendations
4. Deep Understanding - Providing holistic code comprehension

📦 Installation

```bash
npm install insight.js
```

Note: Automatically includes point.js, hunch.js, and intuition.js as dependencies

🎉 The Complete Cognitive Suite

With insight.js, the Insight cognitive code analysis suite is now complete:

1. 🧭 Point - Understanding code purpose
2. 🔮 Hunch - Detecting code anomalies
3. 🧠 Intuition - Learning code patterns
4. 💡 Insight - Holistic code understanding

📚 Examples

See the examples/ directory for comprehensive usage examples showing the full cognitive stack in action.

🔮 Future Vision

insight.js represents the culmination of the cognitive approach to code analysis - where machines don't just analyze code, but understand it holistically.

---

The final piece of the cognitive code analysis puzzle.
