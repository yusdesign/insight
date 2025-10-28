/**
 * Hunch.js Anomaly Detection Example with JS2UML Visualization
 */

import HunchJS from '@insight-suite/hunch.js';
import { analyze, generateReport } from '@insight-suite/js2uml';

// Create hunch.js instance
const hunch = new HunchJS({
  confidenceThreshold: 0.5,
  debug: false
});

// Simple code examples for testing
const codeExamples = {
  cleanCode: `
    class Calculator {
      add(a, b) { return a + b; }
      multiply(a, b) { return a * b; }
    }
  `,
  
  problematicCode: `
    class BadClass {
      doEverything(input) {
        if (input) {
          if (input.data) {
            if (input.data.values) {
              return input.data.values.length;
            }
          }
        }
        return null;
      }
    }
  `
};

async function demonstrateAnomalyDetection() {
  console.log('🔮 Hunch.js - Anomaly Detection with Visualization');
  console.log('='.repeat(60));
  
  for (const [exampleName, code] of Object.entries(codeExamples)) {
    console.log(`\n📝 Analyzing ${exampleName}...\n`);
    
    try {
      // Anomaly detection
      const anomalies = await hunch.detectAnomalies(code);
      const intuitionScore = await hunch.getIntuitionScore(code);
      
      console.log(`🧪 Intuition Score: ${(intuitionScore * 100).toFixed(1)}/100`);
      console.log(`🚨 Anomalies Found: ${anomalies.anomalies?.length || 0}`);
      
      if (anomalies.anomalies && anomalies.anomalies.length > 0) {
        anomalies.anomalies.slice(0, 3).forEach(anomaly => {
          console.log(`  - ${anomaly.type}: ${anomaly.description}`);
        });
      } else {
        console.log('  ✅ No anomalies detected');
      }
      
      // Architecture visualization
      const umlAnalysis = await analyze(code, {
        qualityAnalysis: { anomalies: anomalies.anomalies || [], intuitionScore },
        options: { format: ['mermaid', 'ascii'] }
      });
      
      console.log('\n📋 Architecture:');
      console.log(umlAnalysis.ascii);
      
      console.log(`\n🔍 Insights:`);
      console.log(`  Classes: ${umlAnalysis.classes.length}`);
      console.log(`  Methods: ${umlAnalysis.insights.totalMethods}`);
      console.log(`  Quality: ${umlAnalysis.insights.qualityScore}%`);
      
      // Save outputs
      const fs = await import('fs');
      fs.mkdirSync('./outputs/basic-examples', { recursive: true });
      
      const mermaidContent = `# ${exampleName}\n\n\`\`\`mermaid\n${umlAnalysis.mermaid}\n\`\`\`\n\n*Hunch.js Analysis*`;
      fs.writeFileSync(`./outputs/basic-examples/hunch-${exampleName}.mermaid`, mermaidContent);
      
      console.log(`\n💾 Saved: outputs/basic-examples/hunch-${exampleName}.mermaid`);
      
    } catch (error) {
      console.error(`❌ Analysis failed:`, error.message);
    }
    
    console.log('\n' + '-'.repeat(50));
  }
}

// Run the example
demonstrateAnomalyDetection().catch(console.error);
