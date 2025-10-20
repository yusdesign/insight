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

🎯 Purpose Detection Capabilities

point.js automatically recognizes these common code purposes:

Data Operations

Purpose Description Example Code Patterns
data-validation Validates data format, constraints, or business rules validateEmail(), regex tests, input checks
data-transformation Converts data between formats or structures .map(), .filter(), .reduce(), data mapping
data-persistence Saves or retrieves data from storage localStorage, database queries, file I/O

Application Logic

Purpose Description Example Code Patterns
api-communication Handles HTTP requests and API interactions fetch(), axios, REST endpoints, WebSocket
state-management Manages application state and data flow useState, Redux, context, observable patterns
authentication Handles user identity and access control login(), JWT tokens, session management

System Operations

Purpose Description Example Code Patterns
error-handling Manages exceptions and error conditions try/catch, error boundaries, fallbacks
utility Provides helper functions and utilities formatters, calculators, helper methods
event-handling Processes user interactions and events click handlers, form submissions, event listeners

Business Logic

Purpose Description Example Code Patterns
business-rule Implements specific business requirements pricing rules, validation logic, workflows
calculation Performs mathematical or computational operations price calculations, statistics, algorithms

🔧 Advanced Usage

Custom Purpose Patterns

```javascript
import { PurposeIdentifier } from 'point.js';

const identifier = new PurposeIdentifier();

// Add custom purpose detection
identifier.patterns['payment-processing'] = {
  indicators: ['processPayment', 'charge', 'invoice', 'billing'],
  patterns: [/payment|charge|invoice|billing/i],
  weight: 1.0,
  description: 'Handles payment processing and transactions'
};

// Add industry-specific patterns
identifier.patterns['medical-validation'] = {
  indicators: ['validatePatient', 'checkDosage', 'medicalRecord'],
  patterns: [/patient|dosage|medical|healthcare/i],
  weight: 0.9,
  description: 'Validates medical data and healthcare rules'
};
```

Low-Level Alignment Analysis

```javascript
import { GoalAligner } from 'point.js';

const aligner = new GoalAligner({
  similarityThreshold: 0.8,    // Require strong matches
  debug: true                  // See detailed alignment process
});

const alignment = await aligner.checkAlignment(goal, code, {
  includeSemanticMatching: true,
  useStemming: true
});
```

Batch Analysis

```javascript
// Analyze multiple code snippets efficiently
const analyses = await Promise.all([
  point.identify(codeSnippet1),
  point.identify(codeSnippet2),
  point.identify(codeSnippet3)
]);

// Compare purposes across codebase
const purposes = analyses.map(a => a.primaryPurpose?.purpose);
console.log('Codebase purposes:', purposes);
```

🧪 Error Handling & Validation

```javascript
try {
  // Empty code handling
  const analysis = await point.identify('');
} catch (error) {
  console.error('Analysis error:', error.message);
  // "Code must be a non-empty string"
}

try {
  // Invalid goal alignment
  const alignment = await point.isAligned('', code);
} catch (error) {
  console.error('Alignment error:', error.message);
  // "Goal and code are required"
}

// Safe analysis with fallbacks
async function safeAnalyze(code) {
  if (!code || code.trim().length === 0) {
    return {
      purposes: [],
      primaryPurpose: null,
      confidence: 0,
      error: 'No code provided'
    };
  }
  
  try {
    return await point.identify(code);
  } catch (error) {
    return {
      purposes: [],
      primaryPurpose: null, 
      confidence: 0,
      error: error.message
    };
  }
}
```

📚 Practical Examples

Real-World Usage Scenarios

1. Code Review Automation

```javascript
// Automated purpose verification in PR reviews
const analysis = await point.identify(pullRequestCode);
if (analysis.primaryPurpose?.purpose !== 'data-validation') {
  console.warn('Unexpected code purpose detected');
  console.log('Expected: data-validation');
  console.log('Found:', analysis.primaryPurpose?.purpose);
}
```

2. Documentation Generation

```javascript
// Generate purpose-based documentation
const analysis = await point.identify(functionCode);
const documentation = {
  purpose: analysis.primaryPurpose?.purpose,
  description: analysis.primaryPurpose?.description,
  confidence: analysis.confidence,
  indicators: analysis.primaryPurpose?.indicators || []
};
```

3. Architecture Compliance

```javascript
// Ensure code follows architectural guidelines
const allowedPurposes = ['data-validation', 'utility', 'api-communication'];
const analysis = await point.identify(newFeatureCode);

if (!allowedPurposes.includes(analysis.primaryPurpose?.purpose)) {
  throw new Error(\`Code purpose '\${analysis.primaryPurpose?.purpose}' not allowed in this module\`);
}
```

4. Team Onboarding

```javascript
// Help new developers understand codebase structure
const moduleAnalysis = await point.identify(moduleCode);
console.log(\`This module primarily handles: \${moduleAnalysis.primaryPurpose?.description}\`);
console.log(\`Key functions: \${moduleAnalysis.primaryPurpose?.indicators.join(', ')}\`);
```

Integration Examples

See the examples directory for complete working examples:

· basic-usage.js - Fundamental purpose detection
· react-component.js - Component analysis
· goal-alignment.js - Requirement verification
· drift-measurement.js - Project evolution tracking
· custom-patterns.js - Domain-specific purposes

🚀 Performance Tips

Efficient Batch Processing

```javascript
// Process multiple files efficiently
const fileAnalyses = await Promise.all(
  codeFiles.map(file => point.identify(file.content))
);
```

Caching Strategies

```javascript
// Cache frequent analyses
const analysisCache = new Map();

async function cachedAnalyze(code) {
  const cacheKey = hashCode(code); // Simple hash function
  if (analysisCache.has(cacheKey)) {
    return analysisCache.get(cacheKey);
  }
  
  const analysis = await point.identify(code);
  analysisCache.set(cacheKey, analysis);
  return analysis;
}
```

Memory Management

```javascript
// For large codebases, analyze in chunks
const chunkSize = 10;
for (let i = 0; i < codeFiles.length; i += chunkSize) {
  const chunk = codeFiles.slice(i, i + chunkSize);
  const analyses = await Promise.all(
    chunk.map(file => point.identify(file.content))
  );
  // Process chunk results
}
```

---

Next: Check out hunch.js API for code quality and anomaly detection capabilities.
