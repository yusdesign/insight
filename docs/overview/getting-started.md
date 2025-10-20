# Getting Started with Insight Suite 🚀

## Installation

### Option 1: Install Individual Packages
```bash
npm install point.js      # Purpose detection
npm install hunch.js      # Anomaly detection  
npm install intuition.js  # Pattern learning
npm install insight.js    # Holistic synthesis
```

Option 2: Use Complete Suite

```bash
npm install insight.js    # Includes all cognitive layers
```

Quick Examples

Basic Usage - Individual Layers

```javascript
// Purpose detection with point.js
import PointJS from 'point.js';
const point = new PointJS();
const purpose = await point.identify(code);

// Anomaly detection with hunch.js  
import HunchJS from 'hunch.js';
const hunch = new HunchJS();
const anomalies = await hunch.detectAnomalies(code);

// Pattern learning with intuition.js
import IntuitionJS from 'intuition.js';
const intuition = new IntuitionJS();
await intuition.learnPatterns(examples, labels);

// Holistic analysis with insight.js
import InsightJS from 'insight.js';
const insight = new InsightJS();
const analysis = await insight.understand(code);
```

Complete Cognitive Analysis

```javascript
import InsightJS from 'insight.js';

const insight = new InsightJS();
const analysis = await insight.understand(\`
  function processUserData(user) {
    if (!user || !user.email) {
      throw new Error('User required');
    }
    return user.email.toLowerCase().trim();
  }
\`);

console.log('Overall Score:', analysis.overallScore);
console.log('Primary Purpose:', analysis.synthesis.purpose);
analysis.recommendations.forEach(rec => {
  console.log(\`[\${rec.priority}] \${rec.message}\`);
});
```

Configuration

Basic Configuration

```javascript
const insight = new InsightJS({
  weights: {
    purpose: 0.4,      // Emphasize purpose clarity
    anomalies: 0.3,     // Standard anomaly importance
    patterns: 0.2,      // Pattern recognition value
    relationships: 0.1  // Relationship analysis
  },
  debug: false
});
```

Advanced Layer Configuration

```javascript
const insight = new InsightJS({
  point: {
    confidenceThreshold: 0.7,
    debug: true
  },
  hunch: {
    similarityThreshold: 0.6
  },
  intuition: {
    learningRate: 0.1
  }
});
```

Common Use Cases

Code Review Automation

```javascript
const analysis = await insight.understand(newCode);
if (analysis.overallScore < 70) {
  console.log('Code review needed:');
  analysis.recommendations.forEach(rec => {
    if (rec.priority === 'high') {
      console.log('❌', rec.message);
    }
  });
}
```

Learning Codebase Patterns

```javascript
// Learn from existing good code
await intuition.learnPatterns(goodExamples, goodLabels);

// Analyze new code against learned patterns
const recognition = await intuition.recognizePatterns(newCode);
```

CI/CD Integration

```javascript
// In your CI pipeline
const analysis = await insight.understand(changedCode);
if (analysis.synthesis.criticalAnomalies.length > 0) {
  throw new Error('Critical code quality issues detected');
}
```

Next Steps

· Explore API Documentation for detailed method references
· Check Examples for real-world scenarios
· Read Philosophy to understand the cognitive approach
· Visit GitHub for the latest updates

Need Help?

· Open an issue for bugs and questions
· Check existing discussions
· Review the package documentation for specific layer details
  END

```

## 3. Create Cognitive Layers Documentation:
```bash
cat > docs/overview/cognitive-layers.md << 'END'
# Cognitive Layers 🧠

## Layer 1: 🧭 Point - Purpose Detection

### What It Does
point.js answers the question: **"What is this code trying to achieve?"**

### Key Capabilities
- **Purpose Identification**: Detect what problem the code solves
- **Goal Alignment**: Check if implementation matches intended purpose
- **Intent Analysis**: Understand the developer's thinking

### Example Output
```javascript
{
  purpose: 'data-validation',
  confidence: 0.85,
  description: 'Validates data format or constraints'
}
```

When to Use

· Understanding unfamiliar codebases
· Ensuring code matches requirements
· Documentation generation
· Code review for intent clarity

Layer 2: 🔮 Hunch - Anomaly Detection

What It Does

hunch.js answers the question: "What feels wrong about this code?"

Key Capabilities

· Code Smell Detection: Identify common anti-patterns
· Pattern Recognition: Spot design patterns and architectures
· Intuition Scoring: Quantify "gut feeling" about code quality

Example Output

```javascript
{
  anomalies: [
    { type: 'deep-nesting', severity: 'high', confidence: 0.8 }
  ],
  intuitionScore: 0.65
}
```

When to Use

· Code quality assessment
· Refactoring prioritization
· Learning code standards
· Pre-commit quality checks

Layer 3: 🧠 Intuition - Pattern Learning

What It Does

intuition.js answers the question: "How does this relate to other code?"

Key Capabilities

· Pattern Learning: Learn from code examples
· Relationship Finding: Discover connections between code pieces
· Similarity Analysis: Measure how similar code snippets are

Example Output

```javascript
{
  recognizedPatterns: [
    { label: 'validation', confidence: 0.9 }
  ],
  relationships: [
    { snippet1: 0, snippet2: 1, similarity: 0.8 }
  ]
}
```

When to Use

· Codebase understanding
· Finding similar functionality
· Learning team coding patterns
· Architecture analysis

Layer 4: 💡 Insight - Holistic Synthesis

What It Does

insight.js answers the question: "What's the complete picture?"

Key Capabilities

· Multi-Layer Synthesis: Combine all cognitive analyses
· Actionable Recommendations: Provide specific improvement suggestions
· Comprehensive Scoring: Overall code quality assessment

Example Output

```javascript
{
  overallScore: 82,
  synthesis: {
    purpose: 'data-transformation',
    anomalyCount: 2,
    patternCount: 3
  },
  recommendations: [
    { priority: 'high', message: 'Fix critical anomalies' }
  ]
}
```

When to Use

· Complete code analysis
· Development workflow integration
· Team quality standards
· Educational tooling

Layer Interactions

Progressive Understanding

```
Raw Code 
  → Point (Purpose) 
  → Hunch (Quality) 
  → Intuition (Patterns) 
  → Insight (Synthesis)
```

Complementary Analysis

Each layer provides a different perspective:

· Point: Intent and goals
· Hunch: Quality and feel
· Intuition: Patterns and relationships
· Insight: Holistic understanding

Configurable Focus

Adjust layer weights based on your needs:

```javascript
const insight = new InsightJS({
  weights: {
    purpose: 0.4,      // Strong focus on intent
    anomalies: 0.3,     // Important but secondary
    patterns: 0.2,      // Pattern awareness
    relationships: 0.1  // Contextual understanding
  }
});
```

Choosing the Right Layer

For New Developers

Start with point.js to understand code purpose and intent.

For Code Quality

Use hunch.js for automated code review and quality checks.

For Architecture Work

Employ intuition.js to understand patterns and relationships.

For Complete Analysis

Leverage insight.js for full cognitive understanding.

For Integration

Use individual layers for specific tasks, or the complete suite for comprehensive analysis.

The Cognitive Advantage

Traditional tools analyze syntax and structure. The Insight Suite analyzes intent, quality, patterns, and understanding - mirroring how experienced developers think about code.
