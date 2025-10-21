/**
 * Jump Helper - Professional Navigation Between Insight Suite Examples
 * 
 * Uses nanospinner for better UX and proper health checks
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir, access } from 'fs/promises';
import { createSpinner } from 'nanospinner';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const execAsync = promisify(exec);

// Configuration
const config = {
  timeout: 30000,
};

const exampleMap = {
  'point': { 
    path: 'basic/pointjs-purpose-detection.js',
    description: 'Purpose detection with point.js',
    health: 'purpose-analysis'
  },
  'hunch': { 
    path: 'basic/hunchjs-anomaly-detection.js',
    description: 'Anomaly detection with hunch.js', 
    health: 'quality-analysis'
  },
  'intuition': { 
    path: 'basic/intuitionjs-pattern-learning.js',
    description: 'Pattern learning with intuition.js',
    health: 'pattern-analysis'
  },
  'insight': { 
    path: 'basic/insightjs-holistic-analysis.js',
    description: 'Holistic analysis with insight.js',
    health: 'holistic-analysis'
  },
  'basic': {
    path: 'basic',
    description: 'All basic examples',
    type: 'directory'
  }
};

class ProfessionalExampleRunner {
  constructor() {
    this.stats = {
      total: 0,
      successful: 0,
      failed: 0,
      skipped: 0
    };
  }

  async healthCheck(type = 'general') {
    const spinner = createSpinner('Running health checks...').start();
    
    try {
      // 1. File system health
      await access('jump.js');
      await access('basic');
      spinner.success({ text: '✅ File system healthy' });

      // 2. Package health (different checks for different types)
      const packageSpinner = createSpinner('Checking package availability...').start();
      
      try {
        // Try to import packages based on health type
        if (type === 'purpose-analysis' || type === 'general') {
          await import('../packages/point.js/src/index.js');
        }
        if (type === 'quality-analysis' || type === 'general') {
          await import('../packages/hunch.js/src/index.js');
        }
        if (type === 'pattern-analysis' || type === 'general') {
          await import('../packages/intuition.js/src/index.js');
        }
        if (type === 'holistic-analysis' || type === 'general') {
          await import('../packages/insight.js/src/index.js');
        }
        
        packageSpinner.success({ text: '✅ Packages available' });
        return true;
        
      } catch (error) {
        packageSpinner.error({ text: '❌ Packages not available' });
        console.log('💡 Run: npm install from the insight root directory');
        return false;
      }

    } catch (error) {
      spinner.error({ text: '❌ File system issues' });
      console.error('Please run from the examples directory');
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
    const { path, description, health } = exampleConfig;
    const fullPath = join(__dirname, path);
    
    console.log(`\n🚀 ${description}`);
    console.log('='.repeat(50));

    // Health check for this specific example type
    if (!(await this.healthCheck(health))) {
      this.stats.skipped++;
      return false;
    }

    const spinner = createSpinner(`Running ${path}...`).start();
    
    try {
      const { stdout, stderr } = await this.runWithTimeout(
        `node ${fullPath}`,
        config.timeout
      );

      spinner.success({ text: '✅ Completed successfully' });

      if (stdout) {
        console.log('\n📋 Output:');
        console.log(stdout);
      }

      if (stderr) {
        console.log('\n⚠️  Warnings:');
        console.log(stderr);
      }

      this.stats.successful++;
      return true;

    } catch (error) {
      spinner.error({ text: '❌ Execution failed' });
      
      if (error.message.includes('Timeout')) {
        console.error('⏰ Example timed out');
      } else {
        console.error('💥 Error:', error.message);
      }

      this.stats.failed++;
      return false;
    }
  }

  async runAllInDirectory(directoryPath) {
    const fullPath = join(__dirname, directoryPath);
    console.log(`\n📁 Running all examples in: ${directoryPath}`);
    
    try {
      const files = await readdir(fullPath);
      const jsFiles = files.filter(file => file.endsWith('.js'));
      
      this.stats.total = jsFiles.length;
      
      for (const file of jsFiles) {
        const filePath = `${directoryPath}/${file}`;
        const exampleName = file.replace('.js', '');
        
        await this.runExample({
          path: filePath,
          description: `Running ${exampleName}`,
          health: 'general'
        });
        
        console.log('─'.repeat(50));
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error) {
      console.error(`❌ Cannot read directory ${directoryPath}:`, error.message);
    }
  }

  printStats() {
    console.log('\n📊 EXECUTION SUMMARY:');
    console.log('='.repeat(25));
    console.log(`✅ Successful: ${this.stats.successful}`);
    console.log(`❌ Failed: ${this.stats.failed}`);
    console.log(`⏭️  Skipped: ${this.stats.skipped}`);
    console.log(`📈 Total: ${this.stats.total}`);
    
    const successRate = this.stats.total > 0 ? (this.stats.successful / this.stats.total) * 100 : 0;
    console.log(`🎯 Success Rate: ${successRate.toFixed(1)}%`);
    
    if (this.stats.failed === 0 && this.stats.skipped === 0) {
      console.log('\n🎉 All examples completed successfully!');
    } else if (this.stats.skipped > 0) {
      console.log('\n⚠️  Some examples skipped due to health issues');
    } else {
      console.log('\n❌ Some examples failed. Check logs above.');
    }
  }
}

// Health check types demonstration
async function demonstrateHealthTypes() {
  console.log('🏥 Insight Suite Health Check Types');
  console.log('='.repeat(45));
  
  const healthTypes = {
    'purpose-analysis': '🧭 Checks point.js for purpose detection capability',
    'quality-analysis': '🔮 Checks hunch.js for anomaly detection', 
    'pattern-analysis': '🧠 Checks intuition.js for pattern learning',
    'holistic-analysis': '💡 Checks insight.js for complete analysis',
    'code-health': '📊 General code quality and structure checks',
    'system-health': '⚙️  Environment and dependency checks'
  };
  
  for (const [type, description] of Object.entries(healthTypes)) {
    console.log(`\n${type}:`);
    console.log(`  ${description}`);
  }
}

async function showAvailableExamples() {
  console.log('🎯 Professional Insight Suite Examples Runner');
  console.log('='.repeat(50));
  
  console.log('\n📚 INDIVIDUAL EXAMPLES:');
  for (const [key, config] of Object.entries(exampleMap)) {
    if (config.type !== 'directory') {
      console.log(`  ${key.padEnd(12)} - ${config.description}`);
    }
  }
  
  console.log('\n📁 CATEGORIES:');
  for (const [key, config] of Object.entries(exampleMap)) {
    if (config.type === 'directory') {
      console.log(`  ${key.padEnd(12)} - ${config.description}`);
    }
  }
  
  console.log('\n🔧 USAGE:');
  console.log('  node jump.js [example-name]');
  console.log('  node jump.js basic');
  console.log('  node jump.js health-types');
  
  console.log('\n🛡️  FEATURES:');
  console.log('  • Type-specific health checks');
  console.log('  • Professional progress indicators');
  console.log('  • Success rate tracking');
  console.log('  • Smart package verification');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  const runner = new ProfessionalExampleRunner();
  
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Execution interrupted by user');
    runner.printStats();
    process.exit(0);
  });

  switch (command) {
    case 'health':
      await runner.healthCheck('general');
      break;
      
    case 'health-types':
      await demonstrateHealthTypes();
      break;
      
    case 'point':
    case 'hunch':
    case 'intuition':
    case 'insight':
      await runner.runExample(exampleMap[command]);
      break;
      
    case 'basic':
      await runner.runAllInDirectory(exampleMap.basic.path);
      runner.printStats();
      break;
      
    case 'help':
    default:
      await showAvailableExamples();
      break;
  }
}

main().catch(console.error);
