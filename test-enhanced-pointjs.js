#!/usr/bin/env node

/**
 * Test Enhanced Point.js with JS2UML Integration
 * Simplified version for testing
 */

async function testEnhancedIntegration() {
  console.log('🧪 Testing Enhanced Point.js + JS2UML Integration\n');
  
  try {
    // Import the packages
    const PointJS = (await import('@insight-suite/point.js')).default;
    const { analyze } = await import('@insight-suite/js2uml');
    
    console.log('✅ Packages imported successfully');
    
    // Create instances
    const point = new PointJS({ debug: false });
    const testCode = `
      class EmailValidator {
        validate(email) {
          const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
          return regex.test(email);
        }
      }
      
      class ValidationError extends Error {
        constructor(message) {
          super(message);
          this.name = 'ValidationError';
        }
      }
    `;
    
    console.log('🔍 Running Point.js analysis...');
    const purposeAnalysis = await point.identify(testCode);
    console.log(`✅ Purpose analysis: ${purposeAnalysis.primaryPurpose?.purpose}`);
    
    console.log('🏗️ Running JS2UML analysis...');
    const umlAnalysis = await analyze(testCode);
    console.log(`✅ UML analysis: ${umlAnalysis.classes.length} classes`);
    
    console.log('📊 Integration Results:');
    console.log(`  Purpose: ${purposeAnalysis.primaryPurpose?.purpose}`);
    console.log(`  Confidence: ${(purposeAnalysis.confidence * 100).toFixed(1)}%`);
    console.log(`  Classes: ${umlAnalysis.classes.length}`);
    console.log(`  Methods: ${umlAnalysis.insights.totalMethods}`);
    console.log(`  Mermaid Diagram: ${umlAnalysis.mermaid.length} chars`);
    
    // Test if we can generate the combined output
    console.log('\n🎨 Testing combined visualization...');
    const combinedAnalysis = await analyze(testCode, {
      purposeAnalysis: purposeAnalysis
    });
    
    console.log('✅ Combined analysis successful!');
    console.log('🚀 Enhanced integration is working!');
    
  } catch (error) {
    console.log('❌ Integration test failed:', error.message);
    console.log('Stack:', error.stack);
  }
}

testEnhancedIntegration().catch(console.error);
