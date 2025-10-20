# API Reference 🔧

**Complete API documentation for the Insight Cognitive Suite**

## 📚 Package APIs

### Core Libraries
- [point.js API](./pointjs.md) - Purpose detection and goal alignment
- [hunch.js API](./hunchjs.md) - Anomaly detection and pattern recognition  
- [intuition.js API](./intuitionjs.md) - Pattern learning and relationship finding
- [insight.js API](./insightjs.md) - Holistic synthesis and analysis

## 🎯 Common Patterns

### Basic Analysis Flow
```javascript
// Individual layer analysis
const purpose = await point.identify(code);
const anomalies = await hunch.detectAnomalies(code);
const patterns = await intuition.recognizePatterns(code);

// Or holistic analysis
const insight = await insight.understand(code);
```

Configuration Patterns

```javascript
// Basic configuration
const analyzer = new AnalyzerJS({
  confidenceThreshold: 0.7,
  debug: false
});

// Advanced layer configuration
const insight = new InsightJS({
  point: { /* point.js options */ },
  hunch: { /* hunch.js options */ },
  intuition: { /* intuition.js options */ }
});
```

🔧 Core Concepts

Analysis Results

All analysis methods return consistent result structures with:

· confidence scores (0-1)
· Detailed breakdowns
· Actionable suggestions
· Raw analysis data

Error Handling

```javascript
try {
  const analysis = await analyzer.analyze(code);
} catch (error) {
  if (error.name === 'AnalysisError') {
    console.error('Analysis failed:', error.message);
  }
}
```

Async Operations

All analysis methods are asynchronous and return Promises:

```javascript
// Using async/await
const result = await analyzer.analyze(code);

// Using Promises
analyzer.analyze(code).then(result => {
  console.log(result);
});
```

🚀 Quick Reference

point.js

```javascript
const point = new PointJS();
await point.identify(code);           // Purpose detection
await point.isAligned(goal, code);    // Goal alignment
point.extractGoals(comments);         // Comment analysis
```

hunch.js

```javascript
const hunch = new HunchJS();
await hunch.detectAnomalies(code);    // Code smell detection
await hunch.findPatterns(code);       // Pattern recognition
await hunch.getIntuitionScore(code);  // Gut feeling score
```

intuition.js

```javascript
const intuition = new IntuitionJS();
await intuition.learnPatterns(examples, labels);  // Pattern training
await intuition.recognizePatterns(code);          // Pattern recognition
await intuition.findRelationships(snippets);      // Relationship analysis
```

insight.js

```javascript
const insight = new InsightJS();
await insight.understand(code);       // Holistic analysis
await insight.analyzeDeep(code);      // Deep analysis
insight.getSuiteInfo();               // Suite information
```

📖 Type Definitions

Common Types

```typescript
interface AnalysisResult {
  confidence: number;
  details: object;
  suggestions?: string[];
}

interface PurposeAnalysis extends AnalysisResult {
  purposes: Purpose[];
  primaryPurpose: Purpose | null;
}

interface AnomalyAnalysis extends AnalysisResult {
  anomalies: Anomaly[];
  summary: AnomalySummary;
}
```

🔗 Integration Guides

· Web Applications
· CLI Tools
· CI/CD Pipelines
· Educational Tools

❓ Need Help?

· Check the package-specific documentation
· Review examples for practical usage
· Open an issue for bugs
· Join discussions for questions
  END

```

## 2. Create point.js API Documentation:
```bash
cat > docs/api/pointjs.md << 'END'
# point.js API Reference 🧭

**Purpose detection and goal alignment**

## 🏗️ Constructor

### `new PointJS(options?)`
Creates a new PointJS instance.

**Parameters:**
- `options` (Object, optional) - Configuration options
  - `confidenceThreshold` (number) - Minimum confidence for purpose detection (default: `0.6`)
  - `similarityThreshold` (number) - Minimum similarity for goal alignment (default: `0.7`)
  - `debug` (boolean) - Enable debug logging (default: `false`)

**Returns:** `PointJS` instance

**Example:**
```javascript
const point = new PointJS({
  confidenceThreshold: 0.7,
  similarityThreshold: 0.8,
  debug: true
});
```

🔧 Core Methods

point.identify(code, context?)

Identifies the purpose of the given code.

Parameters:

· code (string) - The code to analyze
· context (Object, optional) - Additional context for analysis
  · fileType (string) - Code file type (e.g., 'javascript', 'typescript')
  · projectContext (string) - Project or domain context
  · customPatterns (Object) - Additional purpose patterns

Returns: Promise<PurposeAnalysis>

Example:

```javascript
const analysis = await point.identify(\`
  function validateEmail(email) {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
  }
\`, {
  fileType: 'javascript',
  projectContext: 'user-validation'
});

console.log(analysis.primaryPurpose.purpose); // "data-validation"
```

point.isAligned(goal, code, options?)

Checks if code aligns with a specific goal.

Parameters:

· goal (string) - The intended goal or requirement
· code (string) - The code to check alignment against
· options (Object, optional) - Analysis options
  · strict (boolean) - Use stricter matching (default: false)
  · includeDetails (boolean) - Include detailed matching info (default: true)

Returns: Promise<AlignmentResult>

Example:

```javascript
const alignment = await point.isAligned(
  "Validate user email format and return boolean result",
  validationCode,
  { strict: true }
);

console.log(alignment.aligned); // true
console.log(alignment.score);   // 0.85
```

point.suggestPurpose(code, hints?)

Suggests possible purposes for code with optional hints.

Parameters:

· code (string) - The code to analyze
· hints (string[], optional) - Additional hints for analysis

Returns: Promise<PurposeAnalysis>

Example:

```javascript
const suggestions = await point.suggestPurpose(code, [
  'authentication',
  'user',
  'validation'
]);
```

point.extractGoals(comments)

Extracts goals and TODOs from code comments.

Parameters:

· comments (string) - Code comments to parse

Returns: Goal[]

Example:

```javascript
const goals = point.extractGoals(\`
  // TODO: Implement error handling for network failures
  // FIXME: Memory leak in data processing
  // NOTE: Temporary solution for demo
\`);

goals.forEach(goal => {
  console.log(\`[\${goal.type}] \${goal.goal} (priority: \${goal.priority})\`);
});
```

point.measureDrift(requirements, currentCode)

Measures how much code has drifted from requirements.

Parameters:

· requirements (Array<string | Requirement>) - Original requirements
· currentCode (string) - Current implementation code

Returns: Promise<DriftAnalysis>

Example:

```javascript
const drift = await point.measureDrift([
  "Validate email format",
  "Check domain validity",
  "Return validation result"
], currentImplementation);

console.log(\`Drift score: \${drift.driftScore}\`); // 0.67
```

📊 Return Types

PurposeAnalysis

```typescript
interface PurposeAnalysis {
  purposes: Purpose[];
  primaryPurpose: Purpose | null;
  confidence: number;
  details: {
    structure: string[];
    indicators: string[];
    patternMatches: number;
  };
  context?: object;
}

interface Purpose {
  purpose: string;
  confidence: number;
  indicators: string[];
  description: string;
}
```

AlignmentResult

```typescript
interface AlignmentResult {
  aligned: boolean;
  score: number;
  matches: Match[];
  mismatches: string[];
  suggestions: string[];
  goalKeywords: string[];
  codeAnalysis: {
    functionNames: string[];
    variables: string[];
    operations: string[];
  };
}

interface Match {
  goalKeyword: string;
  codeTerm: string;
  similarity: number;
}
```

Goal

```typescript
interface Goal {
  type: 'todo' | 'fixme' | 'hack' | 'optimize' | 'note';
  goal: string;
  priority: 'high' | 'medium' | 'low';
}
```

DriftAnalysis

```typescript
interface DriftAnalysis {
  totalRequirements: number;
  misaligned: number;
  driftScore: number;
  aligned: boolean;
  details: DriftDetail[];
}

interface DriftDetail {
  requirement: string;
  alignmentScore: number;
  issues: string[];
  suggestions: string[];
}
```

🎯 Supported Purposes

Purpose Description Common Indicators
data-validation Validates data format or constraints validate, check, verify, regex
data-transformation Transforms data between formats map, filter, reduce, transform
api-communication Handles API calls and networking fetch, api, axios, http
state-management Manages application state useState, redux, store, dispatch
error-handling Handles errors and exceptions try, catch, throw, Error
data-persistence Saves/retrieves persistent data localStorage, database, save
authentication Handles user auth and sessions login, token, auth, password
utility Provides utility functions helper, util, format, calculate

🔧 Advanced Usage

Custom Purpose Patterns

```javascript
import { PurposeIdentifier } from 'point.js';

const identifier = new PurposeIdentifier();
identifier.patterns['custom-pattern'] = {
  indicators: ['custom', 'pattern', 'words'],
  patterns: [/customPattern/g, /specific\.method\(/],
  weight: 1.0,
  description: 'My custom purpose pattern'
};
```

Low-Level Alignment

```javascript
import { GoalAligner } from 'point.js';

const aligner = new GoalAligner({
  similarityThreshold: 0.8,
  debug: true
});

const alignment = await aligner.checkAlignment(goal, code);
```

🧪 Error Handling

```javascript
try {
  const analysis = await point.identify('');
} catch (error) {
  if (error.message === 'Code must be a non-empty string') {
    console.error('Please provide code to analyze');
  }
}
```

📚 Examples

See the examples directory for:

· Basic purpose detection
· Goal alignment verification
· Comment goal extraction
· Requirement drift measurement
· Custom pattern development
