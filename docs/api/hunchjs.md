# hunch.js API Reference 🔮

**Anomaly detection and intuitive code quality assessment**

## 🏗️ Constructor

### `new HunchJS(options?)`
Creates a new HunchJS instance for code quality analysis.

**Parameters:**
- `options` (Object, optional) - Configuration options
  - `confidenceThreshold` (number) - Minimum confidence for anomaly detection (default: `0.6`)
  - `similarityThreshold` (number) - Minimum similarity for pattern matching (default: `0.7`)
  - `debug` (boolean) - Enable debug logging (default: `false`)

**Returns:** `HunchJS` instance

**Example:**
```javascript
const hunch = new HunchJS({
  confidenceThreshold: 0.7,
  similarityThreshold: 0.8,
  debug: true
});
```

🔧 Core Methods

hunch.detectAnomalies(code, context?)

Detects code smells and anomalies in the given code.

Parameters:

· code (string) - The code to analyze for quality issues
· context (Object, optional) - Additional context for analysis
  · fileType (string) - Code file type
  · qualityStandards (string[]) - Specific quality standards to check

Returns: Promise<AnomalyAnalysis>

Example:

```javascript
const analysis = await hunch.detectAnomalies(\`
  function processData(data) {
    if (data) {
      if (data.values) {
        if (data.values.length) {
          return data.values.map(v => v * 123).filter(v => v > 456);
        }
      }
    }
  }
\`);

console.log('Anomalies found:', analysis.anomalies.length);
analysis.anomalies.forEach(anomaly => {
  console.log(\`\${anomaly.type}: \${anomaly.description} (\${anomaly.severity})\`);
});
```

hunch.detectSmells(code, smellTypes?)

Finds specific types of code smells.

Parameters:

· code (string) - The code to analyze
· smellTypes (string[], optional) - Specific smell types to check for

Returns: Promise<AnomalyAnalysis>

Example:

```javascript
const smells = await hunch.detectSmells(code, [
  'long-method',
  'deep-nesting', 
  'magic-numbers'
]);
```

hunch.findPatterns(code, patternTypes?)

Identifies design patterns and architectural structures.

Parameters:

· code (string) - The code to analyze
· patternTypes (string[], optional) - Specific pattern types to look for

Returns: Promise<PatternAnalysis>

Example:

```javascript
const patterns = await hunch.findPatterns(code, ['singleton', 'observer']);

patterns.patterns.forEach(pattern => {
  console.log(\`\${pattern.type}: \${pattern.description} (\${pattern.category})\`);
});
```

hunch.getIntuitionScore(code)

Calculates a gut feeling score (0-1) representing overall code quality intuition.

Parameters:

· code (string) - The code to assess

Returns: Promise<number>

Example:

```javascript
const score = await hunch.getIntuitionScore(code);

if (score < 0.5) {
  console.log('🔴 Code needs significant improvement');
} else if (score < 0.8) {
  console.log('🟡 Code has some concerns');
} else {
  console.log('🟢 Code quality is good');
}
```

📊 Return Types

AnomalyAnalysis

```typescript
interface AnomalyAnalysis {
  anomalies: Anomaly[];
  confidence: number;
  summary: AnomalySummary;
}

interface Anomaly {
  type: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  matches: number;
  confidence: number;
  examples: CodeExample[];
}

interface AnomalySummary {
  totalAnomalies: number;
  bySeverity: {
    high: number;
    medium: number; 
    low: number;
  };
}

interface CodeExample {
  index: number;
  context: string;
}
```

PatternAnalysis

```typescript
interface PatternAnalysis {
  patterns: CodePattern[];
  confidence: number;
  categories: Record<string, CodePattern[]>;
}

interface CodePattern {
  type: string;
  description: string;
  category: 'creational' | 'structural' | 'behavioral' | 'anti-pattern';
  matches: number;
  confidence: number;
  examples: CodeExample[];
}
```

🚨 Detected Anomalies & Code Smells

hunch.js identifies these common code quality issues:

Structural Issues

Anomaly Severity Description Example Indicators
long-method Medium Method/function is too long and complex 20+ lines, multiple responsibilities
deep-nesting High Excessive nesting of conditionals/loops 4+ levels deep, pyramid-shaped code
complex-condition Medium Overly complicated logical expressions Multiple AND/OR operators, long conditions

Data & Value Issues

Anomaly Severity Description Example Indicators
magic-numbers Low Unexplained numeric literals Random numbers without constants
duplicate-code Medium Repeated code patterns Similar logic in multiple places
unused-variables Low Declared but never used variables let unused = value;

Architectural Issues

Anomaly Severity Description Example Indicators
callback-hell High Deep nesting of asynchronous callbacks Multiple nested .then() or callbacks
god-object High Class/object with too many responsibilities 10+ methods, mixed concerns
feature-envy Medium Method uses another object's data excessively Frequent external property access

🧩 Recognized Design Patterns

Creational Patterns

Pattern Category Description Detection Indicators
singleton Creational Ensures single instance existence getInstance(), static instance, private constructor
factory Creational Centralized object creation createX(), factory classes, product families
builder Creational Step-by-step object construction Fluent interface, method chaining, build steps

Structural Patterns

Pattern Category Description Detection Indicators
module Structural Encapsulates related functionality IIFE, exports, namespace patterns
adapter Structural Bridges incompatible interfaces Wrapper classes, interface translation
decorator Structural Adds functionality dynamically Wrapper functions, composition

Behavioral Patterns

Pattern Category Description Detection Indicators
observer Behavioral Event notification system addEventListener(), pub/sub, callbacks
strategy Behavioral Interchangeable algorithms Function parameters, policy objects
command Behavioral Action encapsulation Execute methods, action objects

Anti-Patterns

Pattern Category Description Detection Indicators
callback-hell Anti-pattern Deep callback nesting Pyramid-shaped async code
god-object Anti-pattern Overly large classes 500+ lines, mixed responsibilities
spaghetti-code Anti-pattern Unstructured, tangled logic Goto-like flow, no clear structure

🔧 Advanced Usage

Custom Anomaly Detection

```javascript
import { AnomalyDetector } from 'hunch.js';

const detector = new AnomalyDetector();

// Add custom code smell patterns
detector.smellPatterns['custom-smell'] = {
  pattern: /customSmellIndicator/g,
  description: 'Description of the custom code smell',
  severity: 'medium'
};

// Domain-specific quality rules
detector.smellPatterns['security-concern'] = {
  pattern: /eval\(|innerHTML|document\.write/g,
  description: 'Potential security vulnerability',
  severity: 'high'
};
```

Pattern Recognition Configuration

```javascript
import { PatternMatcher } from 'hunch.js';

const matcher = new PatternMatcher({
  confidenceThreshold: 0.5,    // More sensitive pattern detection
  debug: true                  // Detailed pattern matching logs
});

// Add custom pattern recognition
matcher.patterns['custom-pattern'] = {
  pattern: /customPatternStructure/g,
  description: 'Custom architectural pattern',
  category: 'structural'
};
```

Quality Threshold Configuration

```javascript
const hunch = new HunchJS({
  // Stricter quality standards
  confidenceThreshold: 0.8,
  
  // Custom severity weights
  severityWeights: {
    high: 1.0,
    medium: 0.7, 
    low: 0.3
  }
});
```

📈 Intuition Scoring System

Score Interpretation

· 0.8-1.0 🟢 Excellent - Minimal issues, well-structured code
· 0.6-0.8 🟡 Good - Minor concerns, generally solid
· 0.4-0.6 🟠 Fair - Several issues needing attention
· 0.0-0.4 🔴 Poor - Significant quality problems

Scoring Factors

The intuition score combines:

· Anomaly Density - Issues per lines of code
· Severity Impact - Critical issues weighted heavier
· Pattern Quality - Good patterns boost score
· Structural Health - Complexity and organization

Custom Scoring

```javascript
// Custom scoring algorithm
const customScore = await hunch.getIntuitionScore(code, {
  weights: {
    anomalies: 0.4,      // Emphasize issue detection
    patterns: 0.3,       // Pattern quality importance
    structure: 0.2,      // Code organization
    complexity: 0.1      // Cognitive complexity
  }
});
```

🧪 Error Handling

```javascript
try {
  const analysis = await hunch.detectAnomalies('');
} catch (error) {
  console.error('Analysis failed:', error.message);
}

// Safe analysis with defaults
async function safeDetectAnomalies(code) {
  if (!code || code.trim().length === 0) {
    return {
      anomalies: [],
      confidence: 0,
      summary: { totalAnomalies: 0, bySeverity: { high: 0, medium: 0, low: 0 } }
    };
  }
  
  return await hunch.detectAnomalies(code);
}
```

📚 Practical Examples

Real-World Usage Scenarios

1. Code Review Automation

```javascript
// Automated quality gates in CI/CD
const analysis = await hunch.detectAnomalies(pullRequestCode);
const criticalIssues = analysis.anomalies.filter(a => a.severity === 'high');

if (criticalIssues.length > 0) {
  throw new Error(\`\${criticalIssues.length} critical issues found - review required\`);
}
```

2. Technical Debt Assessment

```javascript
// Quantify technical debt
const analysis = await hunch.detectAnomalies(legacyCode);
const debtScore = analysis.anomalies.reduce((score, anomaly) => {
  const weights = { high: 10, medium: 5, low: 2 };
  return score + (anomaly.confidence * weights[anomaly.severity]);
}, 0);

console.log(\`Technical debt score: \${debtScore}\`);
```

3. Architecture Validation

```javascript
// Ensure pattern compliance
const patterns = await hunch.findPatterns(moduleCode);
const hasAntiPatterns = patterns.patterns.some(p => p.category === 'anti-pattern');

if (hasAntiPatterns) {
  console.warn('Anti-patterns detected - consider refactoring');
}
```

4. Quality Trend Analysis

```javascript
// Track quality over time
const currentScore = await hunch.getIntuitionScore(currentCode);
const previousScore = await hunch.getIntuitionScore(previousVersion);

if (currentScore < previousScore) {
  console.warn('Code quality has decreased');
}
```

Integration Examples

See the examples directory for complete working examples:

· basic-usage.js - Fundamental anomaly detection
· pattern-recognition.js - Design pattern identification
· quality-gates.js - Automated quality checks
· technical-debt.js - Debt quantification
· custom-rules.js - Team-specific standards

🚀 Performance Optimization

Batch Analysis

```javascript
// Analyze multiple files efficiently
const analyses = await Promise.all(
  codeFiles.map(file => hunch.detectAnomalies(file.content))
);
```

Cached Analysis

```javascript
// Cache results for identical code
const analysisCache = new Map();

async function cachedAnalysis(code) {
  const key = hash(code);
  if (analysisCache.has(key)) {
    return analysisCache.get(key);
  }
  
  const analysis = await hunch.detectAnomalies(code);
  analysisCache.set(key, analysis);
  return analysis;
}
```

Incremental Analysis

```javascript
// Only analyze changed code
function analyzeChanges(previousCode, currentCode) {
  if (previousCode === currentCode) {
    return null; // No changes
  }
  
  return hunch.detectAnomalies(currentCode);
}
```

---

Next: Explore intuition.js API for pattern learning and relationship analysis.
