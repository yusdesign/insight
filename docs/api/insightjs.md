# insight.js API Reference 💡

**Holistic code understanding and synthesis**

## 🏗️ Constructor

### `new InsightJS(options?)`
Creates a new InsightJS instance for complete cognitive code analysis.

**Parameters:**
- `options` (Object, optional) - Configuration options
  - `point` (Object) - point.js configuration
  - `hunch` (Object) - hunch.js configuration  
  - `intuition` (Object) - intuition.js configuration
  - `weights` (Object) - Synthesis weight configuration
    - `purpose` (number) - Purpose clarity importance (default: `0.4`)
    - `anomalies` (number) - Anomaly impact weight (default: `0.3`)
    - `patterns` (number) - Pattern recognition value (default: `0.2`)
    - `relationships` (number) - Relationship analysis weight (default: `0.1`)
  - `debug` (boolean) - Enable debug logging (default: `false`)

**Returns:** `InsightJS` instance

**Example:**
```javascript
const insight = new InsightJS({
  // Layer-specific configurations
  point: {
    confidenceThreshold: 0.7,
    debug: false
  },
  hunch: {
    similarityThreshold: 0.6,
    debug: false
  },
  intuition: {
    learningRate: 0.1,
    debug: false
  },
  
  // Synthesis weights (should sum to 1.0)
  weights: {
    purpose: 0.5,      // Strong focus on intent clarity
    anomalies: 0.2,     // Reduced anomaly emphasis
    patterns: 0.2,      // Pattern importance
    relationships: 0.1  // Contextual understanding
  },
  
  debug: true
});
```

🔧 Core Methods

insight.understand(code, context?)

Performs complete holistic analysis by combining all cognitive layers.

Parameters:

· code (string) - The code to analyze holistically
· context (Object, optional) - Additional context for analysis
  · fileType (string) - Code file type
  · projectContext (string) - Project or domain context
  · qualityStandards (string[]) - Specific quality standards

Returns: Promise<HolisticAnalysis>

Example:

```javascript
const analysis = await insight.understand(\`
  function processUserRegistration(user) {
    // Validate input
    if (!user || !user.email) {
      throw new Error('User email is required');
    }
    
    // Check email format
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(user.email)) {
      throw new Error('Invalid email format');
    }
    
    // Process user data
    return {
      id: generateId(),
      email: user.email.toLowerCase(),
      createdAt: new Date()
    };
  }
\`, {
  fileType: 'javascript',
  projectContext: 'user-management'
});

console.log('Overall Score:', analysis.overallScore);
console.log('Primary Purpose:', analysis.synthesis.purpose);
console.log('Critical Anomalies:', analysis.synthesis.criticalAnomalies.length);

analysis.recommendations.forEach(rec => {
  console.log(\`[\${rec.priority}] \${rec.message}\`);
});
```

insight.analyzeDeep(code, context?)

Performs in-depth analysis with additional relationship mapping and cognitive balance assessment.

Parameters:

· code (string) - The code to analyze deeply
· context (Object, optional) - Additional context for deep analysis

Returns: Promise<DeepAnalysis>

Example:

```javascript
const deepAnalysis = await insight.analyzeDeep(code);

console.log('Intuition Score:', deepAnalysis.deepAnalysis.intuitionScore);
console.log('Cognitive Balance:', deepAnalysis.deepAnalysis.cognitiveBalance.balanced ? '✅ Balanced' : '❌ Imbalanced');

if (deepAnalysis.deepAnalysis.relationships) {
  console.log('Relationship Clusters:', deepAnalysis.deepAnalysis.relationships.clusters.length);
}
```

insight.getSuiteInfo()

Returns comprehensive information about the Insight cognitive suite.

Parameters: None

Returns: SuiteInfo

Example:

```javascript
const suiteInfo = insight.getSuiteInfo();

console.log('Suite:', suiteInfo.suite);
console.log('Version:', suiteInfo.version);
console.log('Cognitive Stack:');
suiteInfo.cognitiveStack.forEach((layer, index) => {
  console.log(\`  \${index + 1}. \${layer}\`);
});

console.log('Layer Versions:', suiteInfo.layers);
```

📊 Return Types

HolisticAnalysis

```typescript
interface HolisticAnalysis {
  synthesis: SynthesisResult;
  recommendations: Recommendation[];
  layers: {
    point: PurposeAnalysis;
    hunch: AnomalyAnalysis;
    intuition: PatternRecognition;
  };
  overallScore: number;
  confidence: number;
}

interface SynthesisResult {
  purpose: string;
  purposeConfidence: number;
  anomalyCount: number;
  criticalAnomalies: Anomaly[];
  patternCount: number;
  primaryPattern: RecognizedPattern | null;
  patternConfidence: number;
  codeComplexity: number;
  clarityScore: number;
  maintainability: number;
  confidence: number;
}

interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  category: 'purpose' | 'quality' | 'complexity' | 'patterns' | 'overall';
  message: string;
  action: string;
}
```

DeepAnalysis

```typescript
interface DeepAnalysis extends HolisticAnalysis {
  deepAnalysis: {
    relationships: RelationshipAnalysis;
    intuitionScore: number;
    cognitiveBalance: CognitiveBalance;
  };
}

interface CognitiveBalance {
  purposeStrength: number;
  anomalyAwareness: number;
  patternRecognition: number;
  balanced: boolean;
}
```

SuiteInfo

```typescript
interface SuiteInfo {
  suite: string;
  version: string;
  layers: {
    point: string;
    hunch: string;
    intuition: string;
  };
  cognitiveStack: string[];
}
```

🎯 Holistic Analysis Components

Synthesis Weights Configuration

The holistic analysis combines insights using configurable weights:

Component Default Weight Description When to Increase
Purpose 40% Code intent and goal clarity Understanding unfamiliar code, documentation
Anomalies 30% Code quality and smell detection Code review, quality gates, refactoring
Patterns 20% Design pattern recognition Architecture work, team consistency
Relationships 10% Code interrelationships System understanding, impact analysis

Overall Quality Scoring

The overall score (0-100) represents comprehensive code health:

Score Range Rating Description Typical Actions
90-100 🟢 Excellent Well-structured, clear purpose, minimal issues Maintain standards, document patterns
75-89 🟡 Good Minor concerns, generally solid code Address medium-priority recommendations
60-74 🟠 Fair Several issues needing attention Plan refactoring, review high-priority items
0-59 🔴 Poor Significant quality problems Major refactoring needed, architectural review

Recommendation Priority System

· HIGH 🔴 - Critical issues affecting functionality, security, or maintainability
· MEDIUM 🟡 - Important improvements for quality, clarity, or performance
· LOW 🔵 - Nice-to-have improvements, optimizations, or enhancements

🔧 Advanced Configuration

Custom Weighting Strategies

```javascript
// Different analysis focuses for different scenarios

// Code Review Focus
const reviewInsight = new InsightJS({
  weights: {
    purpose: 0.3,      // Standard purpose checking
    anomalies: 0.5,     // Emphasize quality issues
    patterns: 0.1,      // Light pattern awareness
    relationships: 0.1  // Basic context
  }
});

// Architecture Analysis Focus  
const architectureInsight = new InsightJS({
  weights: {
    purpose: 0.2,      // Light purpose checking
    anomalies: 0.2,     // Basic quality
    patterns: 0.4,      // Emphasize pattern recognition
    relationships: 0.2  // Strong relationship analysis
  }
});

// Learning & Documentation Focus
const learningInsight = new InsightJS({
  weights: {
    purpose: 0.6,      // Strong focus on understanding intent
    anomalies: 0.1,     // Minimal quality emphasis
    patterns: 0.2,      pattern awareness
    relationships: 0.1  // Context for learning
  }
});
```

Layer-Specific Tuning

```javascript
const insight = new InsightJS({
  // Fine-tune point.js for strict purpose detection
  point: {
    confidenceThreshold: 0.8,
    similarityThreshold: 0.8,
    debug: false
  },
  
  // Configure hunch.js for sensitive anomaly detection
  hunch: {
    confidenceThreshold: 0.5,
    similarityThreshold: 0.6,
    debug: false
  },
  
  // Set up intuition.js for rapid pattern learning
  intuition: {
    learningRate: 0.2,
    confidenceThreshold: 0.6,
    debug: false
  },
  
  // Balanced synthesis weights
  weights: {
    purpose: 0.35,
    anomalies: 0.35,
    patterns: 0.2,
    relationships: 0.1
  }
});
```

Dynamic Weight Adjustment

```javascript
// Adjust weights based on analysis context
function createContextAwareInsight(context) {
  const baseWeights = { purpose: 0.4, anomalies: 0.3, patterns: 0.2, relationships: 0.1 };
  
  switch (context) {
    case 'code-review':
      return new InsightJS({
        weights: { ...baseWeights, anomalies: 0.5, purpose: 0.3 }
      });
    case 'architecture':
      return new InsightJS({
        weights: { ...baseWeights, patterns: 0.4, relationships: 0.2, purpose: 0.2 }
      });
    case 'learning':
      return new InsightJS({
        weights: { ...baseWeights, purpose: 0.6, anomalies: 0.1 }
      });
    default:
      return new InsightJS({ weights: baseWeights });
  }
}
```

📈 Cognitive Balance Assessment

Balance Metrics

The cognitive balance analysis evaluates how well different understanding aspects align:

Metric Description Ideal Range
Purpose Strength Clarity of code intent and goals 0.7-1.0
Anomaly Awareness Detection of quality issues and smells 0.6-1.0
Pattern Recognition Understanding of code patterns and structures 0.5-1.0

Balance Interpretation

· ✅ Balanced - All metrics in healthy ranges, comprehensive understanding
· ❌ Imbalanced - Significant disparities between understanding aspects
· Purpose-Dominant - Clear intent but missed quality issues
· Quality-Obsessed - Focus on issues over understanding purpose
· Pattern-Blind - Misses architectural and structural patterns

🧪 Error Handling

```javascript
try {
  const analysis = await insight.understand('');
} catch (error) {
  console.error('Holistic analysis failed:', error.message);
}

// Safe analysis with comprehensive fallbacks
async function safeUnderstand(code, context = {}) {
  if (!code || code.trim().length === 0) {
    return {
      synthesis: {
        purpose: 'unknown',
        purposeConfidence: 0,
        anomalyCount: 0,
        criticalAnomalies: [],
        patternCount: 0,
        primaryPattern: null,
        codeComplexity: 0,
        clarityScore: 0,
        maintainability: 0,
        confidence: 0
      },
      recommendations: [{
        priority: 'high',
        category: 'overall',
        message: 'No code provided for analysis',
        action: 'Provide valid code to analyze'
      }],
      layers: { point: {}, hunch: {}, intuition: {} },
      overallScore: 0,
      confidence: 0,
      error: 'No code provided'
    };
  }
  
  try {
    return await insight.understand(code, context);
  } catch (error) {
    return {
      synthesis: {
        purpose: 'unknown',
        purposeConfidence: 0,
        anomalyCount: 0,
        criticalAnomalies: [],
        patternCount: 0,
        primaryPattern: null,
        codeComplexity: 0,
        clarityScore: 0,
        maintainability: 0,
        confidence: 0
      },
      recommendations: [{
        priority: 'high',
        category: 'overall', 
        message: 'Analysis failed: ' + error.message,
        action: 'Check code syntax and try again'
      }],
      layers: { point: {}, hunch: {}, intuition: {} },
      overallScore: 0,
      confidence: 0,
      error: error.message
    };
  }
}
```

📚 Practical Examples

Real-World Usage Scenarios

1. Automated Code Review

```javascript
// CI/CD quality gates
const analysis = await insight.understand(pullRequestCode);

// Block on critical issues
const criticalIssues = analysis.recommendations.filter(r => r.priority === 'high');
if (criticalIssues.length > 0) {
  throw new Error(\`\${criticalIssues.length} critical issues found:\n\${
    criticalIssues.map(issue => \`- \${issue.message}\`).join('\n')
  }\`);
}

// Warn on quality concerns
if (analysis.overallScore < 70) {
  console.warn(\`Code quality score \${analysis.overallScore} below threshold\`);
}
```

2. Technical Debt Assessment

```javascript
// Quantify and categorize technical debt
const analysis = await insight.understand(legacyCode);

const debtReport = {
  overallScore: analysis.overallScore,
  criticalIssues: analysis.synthesis.criticalAnomalies.length,
  purposeClarity: analysis.synthesis.purposeConfidence,
  maintainability: analysis.synthesis.maintainability,
  recommendations: analysis.recommendations
};

console.log('Technical Debt Assessment:');
console.log(\`- Overall Health: \${debtReport.overallScore}/100\`);
console.log(\`- Critical Issues: \${debtReport.criticalIssues}\`);
console.log(\`- Purpose Clarity: \${(debtReport.purposeClarity * 100).toFixed(0)}%\`);
console.log(\`- Maintainability: \${debtReport.maintainability}/100\`);
```

3. Team Quality Standards

```javascript
// Enforce team coding standards
const analysis = await insight.understand(newFeatureCode);

// Check against team standards
const passesStandards = 
  analysis.overallScore >= 75 &&
  analysis.synthesis.criticalAnomalies.length === 0 &&
  analysis.synthesis.purposeConfidence >= 0.7;

if (!passesStandards) {
  const issues = analysis.recommendations
    .filter(r => r.priority === 'high' || r.priority === 'medium')
    .map(r => \`\${r.priority.toUpperCase()}: \${r.message}\`)
    .join('\n');
    
  throw new Error(\`Code does not meet team standards:\\n\${issues}\`);
}
```

4. Educational Code Analysis

```javascript
// Provide learning feedback
const analysis = await insight.understand(studentCode);

console.log('Learning Assessment:');
console.log(\`- Understanding of Purpose: \${(analysis.synthesis.purposeConfidence * 100).toFixed(0)}%\`);
console.log(\`- Code Quality Awareness: \${(analysis.deepAnalysis.cognitiveBalance.anomalyAwareness * 100).toFixed(0)}%\`);
console.log(\`- Pattern Recognition: \${(analysis.deepAnalysis.cognitiveBalance.patternRecognition * 100).toFixed(0)}%\`);

// Provide constructive feedback
analysis.recommendations
  .filter(r => r.priority === 'high' || r.priority === 'medium')
  .forEach(rec => {
    console.log(\`💡 Learning Opportunity: \${rec.message}\`);
    console.log(\`   Action: \${rec.action}\`);
  });
```

Integration Examples

See the examples directory for complete working examples:

· basic-usage.js - Fundamental holistic analysis
· code-review.js - Automated quality gates
· technical-debt.js - Debt assessment and tracking
· team-standards.js - Quality standard enforcement
· learning-assessment.js - Educational feedback

🚀 Performance Optimization

Cached Analysis

```javascript
// Cache holistic analyses for identical code
const analysisCache = new Map();

async function cachedUnderstand(code, context) {
  const cacheKey = \`\${hash(code)}-\${JSON.stringify(context)}\`;
  if (analysisCache.has(cacheKey)) {
    return analysisCache.get(cacheKey);
  }
  
  const analysis = await insight.understand(code, context);
  analysisCache.set(cacheKey, analysis);
  return analysis;
}
```

Progressive Analysis

```javascript
// Start with quick analysis, then go deeper if needed
async function progressiveAnalyze(code, context) {
  // Quick initial assessment
  const quickAnalysis = await insight.understand(code, context);
  
  // Only do deep analysis if concerns found
  if (quickAnalysis.overallScore < 80 || quickAnalysis.synthesis.criticalAnomalies.length > 0) {
    return await insight.analyzeDeep(code, context);
  }
  
  return quickAnalysis;
}
```

Batch Processing

```javascript
// Analyze multiple files with shared context
async function analyzeCodebase(files, sharedContext) {
  const analyses = await Promise.all(
    files.map(file => insight.understand(file.content, {
      ...sharedContext,
      fileName: file.name
    }))
  );
  
  // Generate codebase-level insights
  const codebaseHealth = analyses.reduce((acc, analysis) => ({
    totalScore: acc.totalScore + analysis.overallScore,
    totalFiles: acc.totalFiles + 1,
    criticalIssues: acc.criticalIssues + analysis.synthesis.criticalAnomalies.length
  }), { totalScore: 0, totalFiles: 0, criticalIssues: 0 });
  
  return {
    averageScore: codebaseHealth.totalScore / codebaseHealth.totalFiles,
    totalCriticalIssues: codebaseHealth.criticalIssues,
    files: analyses
  };
}
```

---

Complete Cognitive Suite: You've now explored all four layers of the Insight cognitive code analysis system. Use individual layers for specific tasks or the complete suite for comprehensive understanding.
