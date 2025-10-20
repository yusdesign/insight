/**
 * Jump Helper - Safe Navigation Between Insight Suite Examples
 * 
 * Features:
 * - Health checks before running examples
 * - Safe error handling and recovery
 * - Progress tracking and timeouts
 * - Dependency verification
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir, access } from 'fs/promises';
import { createSpinner } from 'nanospinner';

const execAsync = promisify(exec);

// Configuration
const config = {
  timeout: 30000, // 30 seconds per example
  healthCheckTimeout: 5000, // 5 seconds for health checks
};

const exampleMap = {
  // Basic examples
  'point': { 
    path: 'examples/basic/pointjs-purpose-detection.js',
    description: 'Purpose detection with point.js',
    dependencies: ['point.js']
  },
  'hunch': { 
    path: 'examples/basic/hunchjs-anomaly-detection.js',
    description: 'Anomaly detection with hunch.js',
    dependencies: ['hunch.js']
  },
  'intuition': { 
    path: 'examples/basic/intuitionjs-pattern-learning.js',
    description: 'Pattern learning with intuition.js', 
    dependencies: ['intuition.js']
  },
  'insight': { 
    path: 'examples/basic/insightjs-holistic-analysis.js',
    description: 'Holistic analysis with insight.js',
    dependencies: ['insight.js']
  },
  
  // Categories
  'basic': {
    path: 'examples/basic',
    description: 'All basic examples',
    type: 'directory'
  }
};

class SafeExampleRunner {
  constructor() {
    this.stats = {
      total: 0,
      successful: 0,
      failed: 0,
      skipped: 0
    };
  }

  async healthCheck() {
    const spinner = createSpinner('Running health checks...').start();
    
    try {
      // Check if we're in the right directory
      await access('package.json');
      await access('examples');
      
      spinner.success({ text: '✅ Project structure looks good' });
      return true;
    } catch (error) {
      spinner.error({ text: '❌ Health check failed' });
      console.error('Please run from the insight project root directory');
      return false;
    }
  }

  async checkDependencies(dependencies) {
    if (!dependencies || dependencies.length === 0) return true;

    const spinner = createSpinner('Checking dependencies...').start();
    
    try {
      for (const dep of dependencies) {
        // Try to import the dependency
        await import(dep);
      }
      spinner.success({ text: '✅ All dependencies available' });
      return true;
    } catch (error) {
      spinner.error({ text: `❌ Missing dependency: ${dependencies.join(', ')}` });
      console.error('Run: npm install', dependencies.join(' '));
      return false;
    }
  }

  async runWithTimeout(command, timeout) {
    return new Promise((resolve, reject) => {
      const childProcess = exec(command, (error, stdout, stderr) => {
        clearTimeout(timeoutId);
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });

      const timeoutId = setTimeout(() => {
        childProcess.kill();
        reject(new Error(`Timeout after ${timeout}ms`));
      }, timeout);
    });
  }

  async runExample(exampleConfig) {
    const { path, description, dependencies } = exampleConfig;
    
    console.log(`\\n🚀 ${description}`);
    console.log('='.repeat(50));

    // Check dependencies
    if (dependencies && !(await this.checkDependencies(dependencies))) {
      this.stats.skipped++;
      return false;
    }

    const spinner = createSpinner(`Running ${path}...`).start();
    
    try {
      const { stdout, stderr } = await this.runWithTimeout(
        `node ${path}`,
        config.timeout
      );

      spinner.success({ text: '✅ Completed successfully' });

      if (stdout) {
        console.log('\\n📋 Output:');
        console.log(stdout);
      }

      if (stderr) {
        console.log('\\n⚠️  Warnings:');
        console.log(stderr);
      }

      this.stats.successful++;
      return true;

    } catch (error) {
      spinner.error({ text: '❌ Execution failed' });
      
      if (error.message.includes('Timeout')) {
        console.error('⏰ Example timed out - it may be stuck in an infinite loop');
      } else {
        console.error('💥 Error:', error.message);
      }

      this.stats.failed++;
      return false;
    }
  }

  async runAllInDirectory(directoryPath) {
    console.log(`\\n📁 Running all examples in: ${directoryPath}`);
    
    try {
      const files = await readdir(directoryPath);
      const jsFiles = files.filter(file => file.endsWith('.js'));
      
      this.stats.total = jsFiles.length;
      
      for (const file of jsFiles) {
        const filePath = `${directoryPath}/${file}`;
        const exampleName = file.replace('.js', '');
        
        await this.runExample({
          path: filePath,
          description: `Running ${exampleName}`,
          dependencies: [] // Check will happen in individual examples
        });
        
        console.log('─'.repeat(50));
        
        // Small delay between examples
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error) {
      console.error(`❌ Cannot read directory ${directoryPath}:`, error.message);
    }
  }

  printStats() {
    console.log('\\n📊 EXECUTION SUMMARY:');
    console.log('='.repeat(25));
    console.log(`✅ Successful: ${this.stats.successful}`);
    console.log(`❌ Failed: ${this.stats.failed}`);
    console.log(`⏭️  Skipped: ${this.stats.skipped}`);
    console.log(`📈 Total: ${this.stats.total}`);
    
    if (this.stats.failed === 0 && this.stats.skipped === 0) {
      console.log('\\n🎉 All examples completed successfully!');
    } else {
      console.log('\\n⚠️  Some examples had issues. Check the logs above.');
    }
  }
}

async function showAvailableExamples() {
  console.log('🎯 Safe Insight Suite Examples Runner');
  console.log('='.repeat(45));
  
  console.log('\\n📚 INDIVIDUAL EXAMPLES:');
  for (const [key, config] of Object.entries(exampleMap)) {
    if (config.type !== 'directory') {
      console.log(`  ${key.padEnd(12)} - ${config.description}`);
    }
  }
  
  console.log('\\n📁 CATEGORIES:');
  for (const [key, config] of Object.entries(exampleMap)) {
    if (config.type === 'directory') {
      console.log(`  ${key.padEnd(12)} - ${config.description}`);
    }
  }
  
  console.log('\\n🔧 USAGE:');
  console.log('  node jump.js [example-name]');
  console.log('  node jump.js basic          # Run all basic examples');
  console.log('  node jump.js all            # Run everything!');
  console.log('  node jump.js health         # Run health checks only');
  
  console.log('\\n🛡️  SAFETY FEATURES:');
  console.log('  • 30-second timeouts per example');
  console.log('  • Dependency verification');
  console.log('  • Health checks before execution');
  console.log('  • Progress tracking and statistics');
  console.log('  • Graceful error handling');
}

async function runHealthCheck() {
  const runner = new SafeExampleRunner();
  console.log('🏥 Running comprehensive health checks...\\n');
  
  const healthy = await runner.healthCheck();
  
  if (healthy) {
    console.log('\\n✅ System is healthy and ready for examples!');
  } else {
    console.log('\\n❌ Health checks failed. Please fix issues before running examples.');
  }
  
  return healthy;
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  const runner = new SafeExampleRunner();
  
  // Handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    console.log('\\n\\n🛑 Execution interrupted by user');
    runner.printStats();
    process.exit(0);
  });

  switch (command) {
    case 'health':
      await runHealthCheck();
      break;
      
    case 'point':
    case 'hunch':
    case 'intuition':
    case 'insight':
      if (await runHealthCheck()) {
        await runner.runExample(exampleMap[command]);
      }
      break;
      
    case 'basic':
      if (await runHealthCheck()) {
        await runner.runAllInDirectory(exampleMap.basic.path);
        runner.printStats();
      }
      break;
      
    case 'all':
      if (await runHealthCheck()) {
        console.log('🏃‍♂️ Running ALL Insight Suite Examples!\\n');
        await runner.runAllInDirectory(exampleMap.basic.path);
        // Add other categories as they're created
        runner.printStats();
      }
      break;
      
    case 'help':
    default:
      await showAvailableExamples();
      break;
  }
}

// Check if nanospinner is available, provide fallback
if (typeof createSpinner === 'undefined') {
  global.createSpinner = (text) => ({
    start: () => ({ 
      success: (opts) => console.log(`✅ ${opts?.text || text}`),
      error: (opts) => console.log(`❌ ${opts?.text || text}`)
    })
  });
}

main().catch(console.error);
