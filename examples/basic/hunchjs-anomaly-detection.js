/**
 * Hunch.js Anomaly Detection Example
 * 
 * Demonstrates code quality assessment and intuitive analysis
 * using the hunch.js cognitive layer.
 */

import HunchJS from 'hunch.js';

// Create hunch.js instance with quality-focused configuration
const hunch = new HunchJS({
  confidenceThreshold: 0.5,    // More sensitive detection
  similarityThreshold: 0.6,    // Broader pattern matching
  debug: false
});

// Code examples with various quality issues
const codeExamples = {
  cleanCode: \`
    /**
     * Calculates the area of a rectangle
     * @param {number} width - The width of the rectangle
     * @param {number} height - The height of the rectangle  
     * @returns {number} The calculated area
     */
    function calculateArea(width, height) {
      if (typeof width !== 'number' || typeof height !== 'number') {
        throw new Error('Width and height must be numbers');
      }
      
      if (width <= 0 || height <= 0) {
        throw new Error('Dimensions must be positive numbers');
      }
      
      return width * height;
    }
  \`,
  
  smellyCode: \`
    function x(a,b,c){if(a){if(b){if(c){let d=123;let e=456;let f=789;let g=012;let h=345;let i=678;let j=901;let k=234;let l=567;let m=890;let n=123;let o=456;let p=789;let q=012;let r=345;let s=678;let t=901;let u=234;let v=567;let w=890;let x=123;let y=456;let z=789;return d+e+f+g+h+i+j+k+l+m+n+o+p+q+r+s+t+u+v+w+x+y+z}}}}
  \`,
  
  nestedCode: \`
    function processUserData(user) {
      if (user) {
        if (user.profile) {
          if (user.profile.settings) {
            if (user.profile.settings.notifications) {
              if (user.profile.settings.notifications.email) {
                return user.profile.settings.notifications.email.enabled;
              }
            }
          }
        }
      }
      return false;
    }
  \`,
  
  patternCode: \`
    class DatabaseConnection {
      static instance = null;
      
      static getInstance() {
        if (!DatabaseConnection.instance) {
          DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
      }
      
      constructor() {
        if (DatabaseConnection.instance) {
          throw new Error('Use getInstance() instead');
        }
        DatabaseConnection.instance = this;
      }
    }
    
    // Observer pattern example
    class EventEmitter {
      constructor() {
        this.listeners = {};
      }
      
      on(event, callback) {
        if (!this.listeners[event]) {
          this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
      }
      
      emit(event, data) {
        if (this.listeners[event]) {
          this.listeners[event].forEach(callback => callback(data));
        }
      }
    }
  \`
};

async function demonstrateAnomalyDetection() {
  console.log('🔮 Hunch.js - Anomaly Detection & Quality Assessment');
  console.log('=' .repeat(60));
  
  for (const [exampleName, code] of Object.entries(codeExamples)) {
    console.log(\`\\n📊 Analyzing \${exampleName}...\\n\`);
    
    try {
      // Detect anomalies and code smells
      const anomalyAnalysis = await hunch.detectAnomalies(code);
      
      // Display quality assessment
      console.log(\`🧪 Intuition Score: \${(await hunch.getIntuitionScore(code) * 100).toFixed(1)}/100\`);
      console.log(\`🎯 Analysis Confidence: \${(anomalyAnalysis.confidence * 100).toFixed(1)}%\`);
      
      // Show anomaly summary
      console.log(\`\\n🚨 ANOMALIES DETECTED: \${anomalyAnalysis.anomalies.length}\`);
      console.log(\`   🔴 Critical: \${anomalyAnalysis.summary.bySeverity.high}\`);
      console.log(\`   🟡 Medium: \${anomalyAnalysis.summary.bySeverity.medium}\`);
      console.log(\`   🔵 Low: \${anomalyAnalysis.summary.bySeverity.low}\`);
      
      // Display specific anomalies
      if (anomalyAnalysis.anomalies.length > 0) {
        console.log('\\n📋 Detailed Issues:');
        anomalyAnalysis.anomalies.forEach(anomaly => {
          const severityIcon = anomaly.severity === 'high' ? '🔴' : 
                             anomaly.severity === 'medium' ? '🟡' : '🔵';
          console.log(\`\${severityIcon} \${anomaly.type}: \${anomaly.description}\`);
          console.log(\`   Confidence: \${(anomaly.confidence * 100).toFixed(1)}%\`);
          console.log(\`   Occurrences: \${anomaly.matches}\`);
        });
      } else {
        console.log('✅ No code smells detected!');
      }
      
      // Detect design patterns
      const patternAnalysis = await hunch.findPatterns(code);
      
      if (patternAnalysis.patterns.length > 0) {
        console.log('\\n🧩 DESIGN PATTERNS IDENTIFIED:');
        patternAnalysis.patterns.forEach(pattern => {
          const categoryIcon = pattern.category === 'creational' ? '🏗️' :
                             pattern.category === 'structural' ? '🏛️' :
                             pattern.category === 'behavioral' ? '🎭' : '⚠️';
          console.log(\`\${categoryIcon} \${pattern.type}: \${pattern.description}\`);
          console.log(\`   Confidence: \${(pattern.confidence * 100).toFixed(1)}%\`);
          console.log(\`   Category: \${pattern.category}\`);
        });
      }
      
    } catch (error) {
      console.error(\`❌ Analysis failed for \${exampleName}:\`, error.message);
    }
    
    console.log('\\n' + '─'.repeat(50));
  }
}

// Additional demonstration: Targeted smell detection
async function demonstrateTargetedDetection() {
  console.log('\\n🎯 Targeted Smell Detection');
  console.log('=' .repeat(35));
  
  const complexCode = \`
    function handleUserRegistration(user) {
      // Deep nesting example
      if (user) {
        if (user.data) {
          if (user.data.profile) {
            if (user.data.profile.settings) {
              // Magic numbers everywhere!
              let score = user.age * 123 + user.visits * 456;
              
              // Long method continues...
              let a = 1, b = 2, c = 3, d = 4, e = 5, f = 6, g = 7, h = 8;
              let i = 9, j = 10, k = 11, l = 12, m = 13, n = 14, o = 15;
              let p = 16, q = 17, r = 18, s = 19, t = 20, u = 21, v = 22;
              
              return a + b + c + d + e + f + g + h + i + j + k + l + m + 
                     n + o + p + q + r + s + t + u + v + score;
            }
          }
        }
      }
      return 0;
    }
  \`;
  
  console.log('Looking for specific code smells...\\n');
  
  // Target specific smell types
  const targetedSmells = await hunch.detectSmells(complexCode, [
    'deep-nesting',
    'magic-numbers', 
    'long-method'
  ]);
  
  targetedSmells.anomalies.forEach(anomaly => {
    const severityColor = anomaly.severity === 'high' ? '\\x1b[31m' : 
                         anomaly.severity === 'medium' ? '\\x1b[33m' : '\\x1b[34m';
    console.log(\`\${severityColor}🔍 \${anomaly.type.toUpperCase()}: \${anomaly.description}\\x1b[0m\`);
    console.log(\`   Severity: \${anomaly.severity}\`);
    console.log(\`   Confidence: \${(anomaly.confidence * 100).toFixed(1)}%\`);
  });
}

// Quality scoring demonstration
async function demonstrateQualityScoring() {
  console.log('\\n📈 Quality Score Interpretation');
  console.log('=' .repeat(35));
  
  const testCodes = [
    { name: 'Excellent Code', code: codeExamples.cleanCode },
    { name: 'Problematic Code', code: codeExamples.smellyCode },
    { name: 'Nested Code', code: codeExamples.nestedCode }
  ];
  
  console.log('\\nQuality Assessment Scale:');
  console.log('🟢 80-100: Excellent - Minimal issues, well-structured');
  console.log('🟡 60-79: Good - Minor concerns, generally solid');
  console.log('🟠 40-59: Fair - Several issues needing attention');
  console.log('🔴 0-39: Poor - Significant quality problems\\n');
  
  for (const test of testCodes) {
    const score = await hunch.getIntuitionScore(test.code);
    const scaledScore = score * 100;
    
    let rating, icon;
    if (scaledScore >= 80) { rating = 'Excellent'; icon = '🟢'; }
    else if (scaledScore >= 60) { rating = 'Good'; icon = '🟡'; }
    else if (scaledScore >= 40) { rating = 'Fair'; icon = '🟠'; }
    else { rating = 'Poor'; icon = '🔴'; }
    
    console.log(\`\${icon} \${test.name}: \${scaledScore.toFixed(1)}/100 (\${rating})\`);
  }
}

// Run all demonstrations
async function runAllExamples() {
  await demonstrateAnomalyDetection();
  await demonstrateTargetedDetection(); 
  await demonstrateQualityScoring();
}

runAllExamples().catch(console.error);
