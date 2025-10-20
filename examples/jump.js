/**
 * Jump Helper - Navigate between Insight Suite Examples
 * 
 * Run: node jump.js [example-name]
 * 
 * Examples:
 *   node jump.js basic              # Run all basic examples
 *   node jump.js point              # Run point.js examples
 *   node jump.js hunch              # Run hunch.js examples  
 *   node jump.js intuition          # Run intuition.js examples
 *   node jump.js insight            # Run insight.js examples
 *   node jump.js all                # Run all examples
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir } from 'fs/promises';

const execAsync = promisify(exec);

const exampleMap = {
  // Basic examples
  'point': 'examples/basic/pointjs-purpose-detection.js',
  'hunch': 'examples/basic/hunchjs-anomaly-detection.js',
  'intuition': 'examples/basic/intuitionjs-pattern-learning.js',
  'insight': 'examples/basic/insightjs-holistic-analysis.js',
  
  // Categories
  'basic': 'examples/basic',
  'advanced': 'examples/advanced', 
  'integration': 'examples/integration',
  'real-world': 'examples/real-world',
  'educational': 'examples/educational'
};

async function runExample(examplePath) {
  console.log(\`🚀 Running: \${examplePath}\\n\`);
  console.log('=' .repeat(50));
  
  try {
    const { stdout, stderr } = await execAsync(\`node \${examplePath}\`);
    
    if (stdout) {
      console.log(stdout);
    }
    
    if (stderr) {
      console.error('Errors:', stderr);
    }
    
    console.log('\\n✅ Completed successfully!\\n');
    
  } catch (error) {
    console.error(\`❌ Failed to run \${examplePath}:\`, error.message);
  }
}

async function runAllInDirectory(directory) {
  console.log(\`📁 Running all examples in: \${directory}\\n\`);
  
  try {
    const files = await readdir(directory);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    
    for (const file of jsFiles) {
      const filePath = \`\${directory}/\${file}\`;
      await runExample(filePath);
      console.log('─'.repeat(50));
    }
    
  } catch (error) {
    console.error(\`❌ Cannot read directory \${directory}:\`, error.message);
  }
}

async function showAvailableExamples() {
  console.log('🎯 Available Insight Suite Examples');
  console.log('=' .repeat(40));
  
  console.log('\\n📚 INDIVIDUAL EXAMPLES:');
  console.log('  point       - Purpose detection with point.js');
  console.log('  hunch       - Anomaly detection with hunch.js');
  console.log('  intuition   - Pattern learning with intuition.js');
  console.log('  insight     - Holistic analysis with insight.js');
  
  console.log('\\n📁 CATEGORIES:');
  console.log('  basic       - All basic examples');
  console.log('  advanced    - Advanced usage patterns');
  console.log('  integration - Tool and workflow integration');
  console.log('  real-world  - Practical application scenarios');
  console.log('  educational - Learning and teaching examples');
  
  console.log('\\n🔧 USAGE:');
  console.log('  node jump.js [example-name]');
  console.log('  node jump.js all          # Run everything!');
  console.log('\\n💡 Tip: Start with "node jump.js basic" to see all basic examples');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  switch (command) {
    case 'point':
      await runExample(exampleMap.point);
      break;
      
    case 'hunch':
      await runExample(exampleMap.hunch);
      break;
      
    case 'intuition':
      await runExample(exampleMap.intuition);
      break;
      
    case 'insight':
      await runExample(exampleMap.insight);
      break;
      
    case 'basic':
      await runAllInDirectory(exampleMap.basic);
      break;
      
    case 'all':
      console.log('🏃‍♂️ Running ALL Insight Suite Examples!\\n');
      await runAllInDirectory(exampleMap.basic);
      // Add other categories as they're created
      break;
      
    case 'help':
    default:
      await showAvailableExamples();
      break;
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\\n\\n👋 Thanks for exploring the Insight Suite!');
  process.exit(0);
});

main().catch(console.error);
