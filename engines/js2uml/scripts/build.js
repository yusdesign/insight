#!/usr/bin/env node

import fs from 'fs';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🏗️ Building @insight-suite/js2uml...');

// Use absolute paths from current working directory
const baseDir = process.cwd();
console.log(`📁 Building from: ${baseDir}\n`);

// 1. Verify all required files exist
const requiredFiles = [
  'src/index.js',
  'src/core/UMLGenerator.js', 
  'src/visualizers/index.js',
  'src/visualizers/MermaidVisualizer.js',
  'src/visualizers/ASCIIVisualizer.js',
  'src/visualizers/UniversalHTMLReport.js'
];

let allFilesExist = true;
console.log('🔍 Checking required files:');
requiredFiles.forEach(file => {
  const fullPath = join(baseDir, file);
  if (!existsSync(fullPath)) {
    console.log(`❌ Missing: ${file}`);
    allFilesExist = false;
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

if (!allFilesExist) {
  console.log('\n🚨 Build failed: Missing required files');
  process.exit(1);
}

// 2. Test Mermaid import
console.log('\n🔧 Testing Mermaid integration...');
try {
  const mermaid = await import('mermaid');
  console.log(`✅ Mermaid v${mermaid.default.version} available`);
} catch (error) {
  console.log('❌ Mermaid import failed:', error.message);
  process.exit(1);
}

// 3. Test core module imports
console.log('\n🔧 Testing module imports...');
try {
  // Test visualizers
  const { MermaidVisualizer } = await import(join(baseDir, 'src/visualizers/MermaidVisualizer.js'));
  console.log('✅ MermaidVisualizer imports successfully');
  
  const { ASCIIVisualizer } = await import(join(baseDir, 'src/visualizers/ASCIIVisualizer.js'));
  console.log('✅ ASCIIVisualizer imports successfully');
  
  const { UniversalHTMLReport } = await import(join(baseDir, 'src/visualizers/UniversalHTMLReport.js'));
  console.log('✅ UniversalHTMLReport imports successfully');
  
  // Test main index
  const mainModule = await import(join(baseDir, 'src/index.js'));
  console.log('✅ Main index.js imports successfully');
  
  if (mainModule.UMLGenerator) {
    console.log('✅ UMLGenerator export found');
  }
  
} catch (error) {
  console.log('❌ Module import failed:', error.message);
  process.exit(1);
}

// 4. Create a simple test to verify functionality
console.log('\n🧪 Running functionality test...');
try {
  const testCode = `
class TestClass {
  constructor() {
    this.value = 42;
  }
  
  testMethod() {
    return this.value;
  }
}
`;

  const { UMLGenerator } = await import(join(baseDir, 'src/index.js'));
  const generator = new UMLGenerator();
  const result = await generator.generate({ code: testCode });
  
  console.log('✅ UML generation test passed');
  console.log(`   Generated ${result.classes.length} classes`);
  console.log(`   Mermaid output: ${result.mermaid ? '✅' : '❌'}`);
  console.log(`   ASCII output: ${result.ascii ? '✅' : '❌'}`);
  
} catch (error) {
  console.log('❌ Functionality test failed:', error.message);
  process.exit(1);
}

console.log('\n🎉 @insight-suite/js2uml build completed successfully!');
console.log('💡 Now available for import in Insight Suite examples:');
console.log('   import { JS2UML } from "@insight-suite/js2uml"');
console.log('   import { analyze } from "@insight-suite/js2uml"');
