#!/usr/bin/env node

console.log('🧪 Testing Insight Suite Workspace Imports...\n');

async function testImports() {
  try {
    // Test JS2UML import
    console.log('📦 Testing @insight-suite/js2uml...');
    const { analyze } = await import('@insight-suite/js2uml');
    console.log('✅ JS2UML imports successfully');
    
    // Test with simple code
    const testCode = `
      class TestClass {
        testMethod() { return true; }
      }
    `;
    
    const result = await analyze(testCode);
    console.log('✅ JS2UML analysis works');
    console.log(`   Classes: ${result.classes.length}`);
    console.log(`   Mermaid output: ${result.mermaid ? '✅' : '❌'}`);
    
  } catch (error) {
    console.log('❌ Import failed:', error.message);
    console.log('💡 Make sure you have run: npm install in the monorepo root');
  }
}

testImports().catch(console.error);
