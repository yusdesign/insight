# intuition.js 🧠

**Pattern recognition and learning for your codebase**

A JavaScript library for learning code patterns and finding relationships between code elements.

## 🎯 Quick Start

```bash
npm install intuition.js
```

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
```

✨ Features

· 🎓 Pattern Learning - Learn from code examples and build pattern knowledge
· 🔍 Pattern Recognition - Identify known patterns in new code
· 🔗 Relationship Finding - Discover connections between code snippets
· 📊 Similarity Scoring - Calculate how similar two code pieces are
· 💡 Refactoring Suggestions - Get intelligent refactoring recommendations

🚀 Core API

IntuitionJS Constructor

```javascript
const intuition = new IntuitionJS({
  learningRate: 0.1,           // How quickly patterns are learned
  confidenceThreshold: 0.7,    // Minimum confidence for pattern recognition
  debug: false                 // Enable debug logging
});
```

Primary Methods

learnPatterns(examples, labels)

Trains the system with code examples and their categories.

```javascript
const result = await intuition.learnPatterns([
  'function add(a, b) { return a + b; }',
  'function multiply(x, y) { return x * y; }'
], {0: 'arithmetic', 1: 'arithmetic'});

// Returns:
{
  learnedPatterns: 2,
  patterns: [
    { label: 'arithmetic', pattern: '{"structure":["function"],...}' }
  ],
  confidence: 0.8
}
```

recognizePatterns(code, context)

Identifies learned patterns in new code.

```javascript
const recognition = await intuition.recognizePatterns(\`
  function calculateArea(width, height) {
    return width * height;
  }
\`);

// Returns:
{
  recognizedPatterns: [
    {
      label: 'arithmetic',
      confidence: 0.85,
      pattern: '{"structure":["function"],...}',
      examples: 2
    }
  ],
  confidence: 0.85,
  suggestions: ['This code resembles "arithmetic" pattern']
}
```

findRelationships(codeSnippets)

Finds relationships between multiple code snippets.

```javascript
const relationships = await intuition.findRelationships([
  'function processA() { /* ... */ }',
  'function processB() { /* ... */ }',
  'function calculate() { /* ... */ }'
]);

// Returns:
{
  relationships: [
    {
      snippet1: 0,
      snippet2: 1,
      similarity: 0.78,
      type: 'structural-similar',
      strength: 'strong'
    }
  ],
  overallSimilarity: 0.65,
  clusters: [
    { members: [0, 1], size: 2, averageSimilarity: 0.78 }
  ]
}
```

getSimilarity(code1, code2)

Calculates similarity score between two code pieces.

```javascript
const similarity = await intuition.getSimilarity(
  'function add(a, b) { return a + b; }',
  'function sum(x, y) { return x + y; }'
);
console.log(similarity); // 0.82
```

suggestRefactoring(code)

Provides refactoring suggestions based on learned patterns.

```javascript
const suggestions = await intuition.suggestRefactoring(complexCode);
```

🎓 Learning Capabilities

Pattern Types Learned

· Structural Patterns - Function declarations, class structures, control flow
· Semantic Patterns - Common algorithm implementations
· Architectural Patterns - Module organization, data flow
· Domain Patterns - Business logic patterns

Similarity Metrics

· Structural Similarity - Code organization and flow
· Keyword Similarity - Shared terminology and concepts
· Complexity Similarity - Similar cognitive complexity
· Functional Similarity - Similar purpose and behavior

🔧 Advanced Usage

Custom Pattern Learning

```javascript
import { PatternLearner } from 'intuition.js';

const learner = new PatternLearner({
  learningRate: 0.2,           // Faster learning
  confidenceThreshold: 0.6     // More sensitive recognition
});

// Train with custom patterns
await learner.train(customExamples, customLabels);
```

Relationship Analysis

```javascript
import { RelationshipFinder } from 'intuition.js';

const finder = new RelationshipFinder({
  similarityThreshold: 0.5,    // Broader relationship detection
  debug: true                  // Detailed analysis output
});

const analysis = await finder.analyze(codebaseSnippets);
```

📊 Relationship Types

Type Description Use Case
Duplicate Nearly identical code Code deduplication
Structural Similar Same code structure Pattern identification
Semantic Similar Similar concepts and terms Concept grouping
Related Some shared characteristics Code organization

📚 Examples

Check the examples/ directory for:

· Pattern learning from real codebases
· Relationship analysis across multiple files
· Similarity detection for code review
· Refactoring suggestion systems

🧪 Testing

```bash
npm test
```

🔗 Integration

intuition.js enhances:

· point.js - Add pattern awareness to purpose detection
· hunch.js - Provide learned patterns for anomaly detection
· insight.js - Contribute relationship analysis to holistic understanding

📖 Philosophy

intuition.js embodies the third layer of cognitive code analysis - developing the "How" understanding. It answers: "How does this code relate to other code I've seen?"

By learning from examples and recognizing patterns, it helps developers understand code in context and see relationships that might not be immediately obvious.

---

Part of the Insight Cognitive Suite - Understanding code at different cognitive levels.
END

```

## 2. Update insight.js README (Synthesis & Holistic View):
```bash
cd ../insight.js
cat > README.md << 'END'
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

```bash
npm install insight.js
```

```javascript
import InsightJS from 'insight.js';

const insight = new InsightJS();

// Complete holistic analysis
const analysis = await insight.understand(\`
  function processData(data) {
    if (!data || !data.values) {
      throw new Error('Invalid data');
    }
    return data.values.map(v => v * 2).filter(v => v > 10);
  }
\`);

console.log('Overall Score:', analysis.overallScore);
console.log('Purpose:', analysis.synthesis.purpose);
console.log('Recommendations:', analysis.recommendations);
```

✨ Features

· 🧠 Holistic Analysis - Combine all cognitive layers into unified understanding
· 📊 Comprehensive Scoring - Overall quality score with detailed breakdowns
· 🎯 Actionable Insights - Priority-based recommendations with specific actions
· 🔍 Deep Analysis - Multi-layer cognitive balance and relationship mapping
· ⚖️ Weighted Synthesis - Configurable importance for different analysis aspects

🚀 Core API

InsightJS Constructor

```javascript
const insight = new InsightJS({
  // Layer-specific configurations
  point: { confidenceThreshold: 0.6 },
  hunch: { similarityThreshold: 0.7 },
  intuition: { learningRate: 0.1 },
  
  // Synthesis weights (0-1, should sum to 1.0)
  weights: {
    purpose: 0.4,      // Purpose clarity importance
    anomalies: 0.3,    // Anomaly impact weight  
    patterns: 0.2,     // Pattern recognition value
    relationships: 0.1 // Relationship analysis weight
  },
  
  debug: false         // Enable detailed logging
});
```

Primary Methods

understand(code, context)

Performs complete holistic analysis of code.

```javascript
const analysis = await insight.understand(code, {
  fileType: 'javascript',
  projectContext: 'user-authentication'
});

// Returns:
{
  synthesis: {
    purpose: 'data-transformation',
    purposeConfidence: 0.85,
    anomalyCount: 2,
    criticalAnomalies: [],
    patternCount: 3,
    overallScore: 82,
    maintainability: 88,
    clarityScore: 90,
    confidence: 0.79
  },
  recommendations: [
    {
      priority: 'medium',
      category: 'complexity',
      message: 'Code is moderately complex',
      action: 'Consider breaking into smaller functions'
    }
  ],
  layers: {
    point: { /* point.js analysis results */ },
    hunch: { /* hunch.js analysis results */ },
    intuition: { /* intuition.js analysis results */ }
  },
  overallScore: 82
}
```

analyzeDeep(code, context)

Performs in-depth analysis with additional relationship mapping.

```javascript
const deepAnalysis = await insight.analyzeDeep(code);

// Includes additional:
{
  deepAnalysis: {
    relationships: { /* relationship analysis */ },
    intuitionScore: 0.75,
    cognitiveBalance: {
      purposeStrength: 0.85,
      anomalyAwareness: 0.72,
      patternRecognition: 0.68,
      balanced: true
    }
  }
}
```

getSuiteInfo()

Returns information about the complete Insight suite.

```javascript
const suiteInfo = insight.getSuiteInfo();

// Returns:
{
  suite: 'Insight Cognitive Code Analysis Suite',
  version: '0.1.0',
  layers: {
    point: '0.1.0',
    hunch: '0.1.0', 
    intuition: '0.1.0'
  },
  cognitiveStack: [
    'Purpose Detection',
    'Anomaly Detection', 
    'Pattern Learning',
    'Holistic Synthesis'
  ]
}
```

📊 Scoring System

Overall Quality Score (0-100)

· 90-100 🟢 Excellent - Well-structured, clear purpose, minimal issues
· 75-89 🟡 Good - Minor issues, generally solid code
· 60-74 🟠 Fair - Some concerns that need addressing
· 0-59 🔴 Poor - Significant issues requiring attention

Score Components

· Purpose Clarity (30%) - How well the code communicates its intent
· Code Health (30%) - Absence of anomalies and code smells
· Pattern Quality (20%) - Use of appropriate patterns and structures
· Maintainability (20%) - Ease of understanding and modification

🎯 Recommendation System

Priority Levels

· HIGH 🔴 - Critical issues affecting functionality or security
· MEDIUM 🟡 - Important improvements for quality and maintainability
· LOW 🔵 - Nice-to-have improvements and optimizations

Recommendation Categories

· Purpose - Improving code intent and documentation
· Quality - Addressing code smells and anomalies
· Complexity - Simplifying overly complex logic
· Patterns - Better use of design patterns
· Overall - General code quality improvements

🔧 Advanced Configuration

Custom Weighting

```javascript
const insight = new InsightJS({
  weights: {
    purpose: 0.5,      // Emphasize purpose clarity
    anomalies: 0.2,     // De-emphasize minor anomalies
    patterns: 0.2,      // Standard pattern importance
    relationships: 0.1  // Minimal relationship focus
  }
});
```

Layer-Specific Tuning

```javascript
const insight = new InsightJS({
  point: {
    confidenceThreshold: 0.7,    // Stricter purpose detection
    debug: true
  },
  hunch: {
    similarityThreshold: 0.6,    // Broader anomaly detection
    debug: false
  }
});
```

📚 Examples

Check the examples/ directory for:

· Complete analysis of real-world code examples
· Integration with development workflows
· Custom configuration scenarios
· Building automated code review systems

🧪 Testing

```bash
npm test
```

🔗 The Complete Cognitive Stack

insight.js represents the culmination of the cognitive approach:

1. 🧭 point.js → Understand the "Why"
2. 🔮 hunch.js → Sense the "What"
3. 🧠 intuition.js → Learn the "How"
4. 💡 insight.js → Synthesize the "So What"

📖 Philosophy

insight.js embodies the final layer of cognitive code analysis - achieving the "So What" understanding. It answers: "What does all this analysis mean, and what should I do about it?"

By synthesizing multiple cognitive perspectives, it provides the holistic understanding that developers need to make informed decisions about their code.

---

The final piece of the Insight Cognitive Suite - Complete cognitive code understanding.
