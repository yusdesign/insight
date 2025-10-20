# intuition.js API Reference 🧠

**Pattern learning and relationship analysis**

## 🏗️ Constructor

### `new IntuitionJS(options?)`
Creates a new IntuitionJS instance for pattern learning and relationship analysis.

**Parameters:**
- `options` (Object, optional) - Configuration options
  - `learningRate` (number) - How quickly patterns are learned (default: `0.1`)
  - `confidenceThreshold` (number) - Minimum confidence for pattern recognition (default: `0.7`)
  - `debug` (boolean) - Enable debug logging (default: `false`)

**Returns:** `IntuitionJS` instance

**Example:**
```javascript
const intuition = new IntuitionJS({
  learningRate: 0.2,           // Faster pattern learning
  confidenceThreshold: 0.6,    // More sensitive recognition
  debug: true
});
```

🔧 Core Methods

intuition.learnPatterns(examples, labels)

Trains the system with code examples and their associated categories.

Parameters:

· examples (string[]) - Array of code examples to learn from
· labels (Object) - Label mapping: {exampleIndex: 'categoryName'}

Returns: Promise<LearningResult>

Example:

```javascript
const trainingResult = await intuition.learnPatterns([
  \`function validateEmail(email) {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
  }\`,
  \`function checkPassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password);
  }\`,
  \`function calculateArea(width, height) {
    return width * height;
  }\`
], {
  0: 'validation-pattern',
  1: 'validation-pattern', 
  2: 'calculation-pattern'
});

console.log('Patterns learned:', trainingResult.learnedPatterns);
console.log('Overall confidence:', trainingResult.confidence);
```

intuition.recognizePatterns(code, context?)

Identifies learned patterns in new, unseen code.

Parameters:

· code (string) - The code to analyze for pattern recognition
· context (Object, optional) - Additional context for recognition
  · hints (string[]) - Additional pattern hints
  · similarityBoost (boolean) - Boost similar patterns (default: true)

Returns: Promise<PatternRecognition>

Example:

```javascript
const recognition = await intuition.recognizePatterns(\`
  function verifyAge(age) {
    return age >= 18;
  }
\`, {
  hints: ['validation', 'user']
});

recognition.recognizedPatterns.forEach(pattern => {
  console.log(\`\${pattern.label}: \${pattern.confidence.toFixed(2)} confidence\`);
});
```

intuition.findRelationships(codeSnippets)

Analyzes relationships and similarities between multiple code snippets.

Parameters:

· codeSnippets (string[]) - Array of code snippets to compare

Returns: Promise<RelationshipAnalysis>

Example:

```javascript
const relationships = await intuition.findRelationships([
  \`function add(a, b) { return a + b; }\`,
  \`function multiply(x, y) { return x * y; }\`,
  \`function processUser(user) { return user.name.toUpperCase(); }\`,
  \`function formatText(text) { return text.trim().toLowerCase(); }\`
]);

console.log('Overall similarity:', relationships.overallSimilarity.toFixed(2));
relationships.relationships.forEach(rel => {
  console.log(\`Snippet \${rel.snippet1} ↔ Snippet \${rel.snippet2}: \${rel.similarity.toFixed(2)} (\${rel.type})\`);
});
```

intuition.getSimilarity(code1, code2)

Calculates similarity score between two code pieces.

Parameters:

· code1 (string) - First code snippet
· code2 (string) - Second code snippet

Returns: Promise<number> - Similarity score (0-1)

Example:

```javascript
const similarity = await intuition.getSimilarity(
  \`function calculateSum(a, b) { return a + b; }\`,
  \`function computeTotal(x, y) { return x + y; }\`
);

console.log('Code similarity:', similarity.toFixed(2)); // 0.82

if (similarity > 0.8) {
  console.log('Code pieces are very similar - potential duplication');
}
```

intuition.suggestRefactoring(code)

Provides intelligent refactoring suggestions based on learned patterns.

Parameters:

· code (string) - The code to analyze for refactoring opportunities

Returns: Promise<RefactoringSuggestions>

Example:

```javascript
const suggestions = await intuition.suggestRefactoring(\`
  function handleUserData(user) {
    if (user) {
      if (user.profile) {
        if (user.profile.settings) {
          return user.profile.settings.notifications;
        }
      }
    }
    return false;
  }
\`);

console.log('Refactoring confidence:', suggestions.refactoringConfidence);
suggestions.suggestions.forEach(suggestion => {
  console.log('💡', suggestion);
});
```

📊 Return Types

LearningResult

```typescript
interface LearningResult {
  learnedPatterns: number;
  patterns: LearnedPattern[];
  confidence: number;
}

interface LearnedPattern {
  label: string;
  pattern: string;  // Serialized pattern data
  examples: number;
  confidence: number;
  lastTrained: Date;
}
```

PatternRecognition

```typescript
interface PatternRecognition {
  recognizedPatterns: RecognizedPattern[];
  confidence: number;
  suggestions: string[];
}

interface RecognizedPattern {
  label: string;
  confidence: number;
  pattern: string;
  examples: number;
}
```

RelationshipAnalysis

```typescript
interface RelationshipAnalysis {
  relationships: CodeRelationship[];
  overallSimilarity: number;
  clusters: CodeCluster[];
}

interface CodeRelationship {
  snippet1: number;
  snippet2: number;
  similarity: number;
  type: 'duplicate' | 'structural-similar' | 'semantic-similar' | 'related';
  strength: 'strong' | 'medium' | 'weak';
}

interface CodeCluster {
  members: number[];
  size: number;
  averageSimilarity: number;
}
```

RefactoringSuggestions

```typescript
interface RefactoringSuggestions {
  originalCode: string;
  suggestions: string[];
  patterns: RecognizedPattern[];
  refactoringConfidence: number;
}
```

🎓 Pattern Learning Capabilities

Structural Pattern Recognition

intuition.js learns these code structure patterns:

Pattern Type Description Learning Indicators
Function Patterns Common function structures and signatures Parameter patterns, return types, complexity
Class Patterns Object-oriented class structures Inheritance, encapsulation, method organization
Control Flow Conditional and looping structures If/else chains, switch statements, loop types
Error Handling Exception and error management patterns Try/catch blocks, error propagation

Semantic Pattern Recognition

Pattern Type Description Learning Indicators
Algorithm Patterns Common algorithmic approaches Sorting, searching, transformation logic
Data Processing Data transformation pipelines Map/filter/reduce, data validation, formatting
API Patterns Service communication patterns HTTP methods, error handling, data serialization
Domain Patterns Business logic implementations Validation rules, workflow steps, business rules

Architectural Pattern Detection

Pattern Type Description Detection Signals
Module Organization Code modularization approaches Import/export patterns, namespace usage
Data Flow How data moves through the system Prop drilling, event emission, state updates
Separation of Concerns Responsibility division Single responsibility, interface segregation

🔗 Relationship Analysis Types

Similarity Detection

intuition.js identifies these relationship types:

Relationship Similarity Range Description Use Cases
Duplicate 0.8-1.0 Nearly identical code Code deduplication, copy-paste detection
Structural Similar 0.6-0.8 Same code structure Pattern identification, refactoring candidates
Semantic Similar 0.4-0.6 Similar concepts and purpose Feature grouping, architecture analysis
Related 0.2-0.4 Some shared characteristics Code organization, learning pathways

Cluster Analysis

The system automatically groups related code into clusters:

· High-Cohesion Clusters - Tightly related functionality
· Domain Clusters - Business logic groupings
· Utility Clusters - Helper function groupings
· Architectural Clusters - Structural component groups

🔧 Advanced Usage

Custom Pattern Learning

```javascript
import { PatternLearner } from 'intuition.js';

const learner = new PatternLearner({
  learningRate: 0.3,           // Accelerated learning
  confidenceThreshold: 0.5,     // Broader pattern recognition
  debug: true
});

// Train with domain-specific examples
await learner.train(domainExamples, domainLabels);

// Export learned patterns for reuse
const learnedPatterns = learner.getLearnedPatterns();
localStorage.setItem('code-patterns', JSON.stringify(learnedPatterns));
```

Advanced Relationship Finding

```javascript
import { RelationshipFinder } from 'intuition.js';

const finder = new RelationshipFinder({
  similarityThreshold: 0.4,     // Broader relationship detection
  debug: true
});

// Analyze codebase structure
const analysis = await finder.analyze(entireCodebase, {
  includeSemanticAnalysis: true,
  useAdvancedClustering: true
});
```

Pattern Persistence

```javascript
// Save and load learned patterns
async function savePatterns(intuition, filename) {
  const patterns = intuition.getLearnedPatterns();
  await fs.writeFile(filename, JSON.stringify(patterns));
}

async function loadPatterns(intuition, filename) {
  const patternsData = await fs.readFile(filename);
  const patterns = JSON.parse(patternsData);
  
  // Reconstruct pattern knowledge
  patterns.forEach(pattern => {
    intuition.patterns.set(pattern.label, pattern);
  });
}
```

Batch Similarity Analysis

```javascript
// Compare multiple codebases
async function compareCodebases(codebaseA, codebaseB) {
  const similarities = [];
  
  for (const fileA of codebaseA) {
    for (const fileB of codebaseB) {
      const similarity = await intuition.getSimilarity(fileA.content, fileB.content);
      similarities.push({
        fileA: fileA.name,
        fileB: fileB.name, 
        similarity: similarity
      });
    }
  }
  
  return similarities.sort((a, b) => b.similarity - a.similarity);
}
```

📈 Similarity Scoring System

Scoring Components

The similarity score combines multiple factors:

Component Weight Description
Structural Similarity 30% Code organization, control flow, function structure
Keyword Similarity 30% Shared terminology, variable names, comments
Complexity Similarity 20% Cognitive complexity, nesting levels, conditionals
Functional Similarity 20% Purpose, input/output patterns, side effects

Score Interpretation

· 0.9-1.0 - Near duplicates or identical functionality
· 0.7-0.9 - Very similar structure and purpose
· 0.5-0.7 - Related functionality with shared patterns
· 0.3-0.5 - Some shared characteristics
· 0.0-0.3 - Mostly unrelated code

🧪 Error Handling

```javascript
try {
  const recognition = await intuition.recognizePatterns('');
} catch (error) {
  console.error('Pattern recognition failed:', error.message);
}

// Safe pattern learning
async function safeLearnPatterns(examples, labels) {
  if (!examples || examples.length === 0) {
    return {
      learnedPatterns: 0,
      patterns: [],
      confidence: 0,
      error: 'No examples provided'
    };
  }
  
  try {
    return await intuition.learnPatterns(examples, labels);
  } catch (error) {
    return {
      learnedPatterns: 0,
      patterns: [],
      confidence: 0,
      error: error.message
    };
  }
}
```

📚 Practical Examples

Real-World Usage Scenarios

1. Codebase Understanding

```javascript
// Learn patterns from existing codebase
await intuition.learnPatterns(existingCodeFiles, existingLabels);

// Analyze new code against learned patterns
const newCodeAnalysis = await intuition.recognizePatterns(newFeatureCode);

if (newCodeAnalysis.confidence < 0.5) {
  console.warn('New code does not match existing patterns - review needed');
}
```

2. Duplicate Code Detection

```javascript
// Find duplicate or similar code
const relationships = await intuition.findRelationships(allFunctions);
const duplicates = relationships.relationships.filter(
  rel => rel.type === 'duplicate' && rel.similarity > 0.9
);

console.log(\`Found \${duplicates.length} potential duplicates\`);
```

3. Architecture Consistency

```javascript
// Ensure new code follows architectural patterns
const patterns = await intuition.recognizePatterns(newModuleCode);
const hasCorrectPatterns = patterns.recognizedPatterns.some(
  pattern => pattern.label === 'module-pattern'
);

if (!hasCorrectPatterns) {
  console.error('New module does not follow architectural patterns');
}
```

4. Team Knowledge Transfer

```javascript
// Learn from senior developer patterns
await intuition.learnPatterns(seniorCodeExamples, {
  0: 'efficient-algorithm',
  1: 'clean-architecture',
  2: 'robust-error-handling'
});

// Guide junior developers
const juniorAnalysis = await intuition.recognizePatterns(juniorCode);
if (juniorAnalysis.confidence < 0.6) {
  console.log('Suggested patterns:', juniorAnalysis.suggestions);
}
```

Integration Examples

See the examples directory for complete working examples:

· basic-usage.js - Fundamental pattern learning
· relationship-analysis.js - Code similarity detection
· refactoring-suggestions.js - Intelligent refactoring
· codebase-clustering.js - Architectural analysis
· custom-patterns.js - Domain-specific learning

🚀 Performance Optimization

Incremental Learning

```javascript
// Learn patterns incrementally
async function incrementalLearn(newExamples, newLabels) {
  const existingPatterns = intuition.getLearnedPatterns();
  
  // Merge new patterns with existing knowledge
  const mergedExamples = [...existingPatterns.examples, ...newExamples];
  const mergedLabels = { ...existingPatterns.labels, ...newLabels };
  
  return await intuition.learnPatterns(mergedExamples, mergedLabels);
}
```

Pattern Caching

```javascript
// Cache pattern recognition for frequent code
const patternCache = new Map();

async function cachedRecognition(code) {
  const key = hash(code);
  if (patternCache.has(key)) {
    return patternCache.get(key);
  }
  
  const recognition = await intuition.recognizePatterns(code);
  patternCache.set(key, recognition);
  return recognition;
}
```

Batch Processing

```javascript
// Process large codebases in chunks
const chunkSize = 50;
const relationships = [];

for (let i = 0; i < codebase.length; i += chunkSize) {
  const chunk = codebase.slice(i, i + chunkSize);
  const chunkRelationships = await intuition.findRelationships(chunk);
  relationships.push(...chunkRelationships.relationships);
}
```

---

Next: Explore insight.js API for complete holistic code analysis.
