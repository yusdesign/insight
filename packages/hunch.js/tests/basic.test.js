import { AnomalyDetector } from '../src/core/detector.js';
import { PatternMatcher } from '../src/core/matcher.js';
import assert from 'assert';

// Test AnomalyDetector
async function testAnomalyDetector() {
  console.log('🧪 Testing AnomalyDetector...');
  const detector = new AnomalyDetector();

  // Test 1: Detect code smells
  const smellyCode = `
    function veryLongFunction() {
      let a = 1;
      let b = 2;
      let c = 3;
      let d = 4;
      let e = 5;
      let f = 6;
      let g = 7;
      let h = 8;
      let i = 9;
      let j = 10;
      let k = 11;
      let l = 12;
      let m = 13;
      let n = 14;
      let o = 15;
      let p = 16;
      let q = 17;
      let r = 18;
      let s = 19;
      let t = 20;
      let u = 21;
      let v = 22;
      let w = 23;
      let x = 24;
      let y = 25;
      let z = 26;
      return a + b + c + d + e + f + g + h + i + j + k + l + m + n + o + p + q + r + s + t + u + v + w + x + y + z;
    }
  `;

  const analysis = await detector.analyze(smellyCode);
  assert(analysis.anomalies.length > 0, 'Should detect anomalies in smelly code');
  assert(analysis.confidence > 0, 'Should have confidence score');
  console.log('✅ Anomaly detection test passed');

  // Test 2: Empty code handling
  const emptyAnalysis = await detector.analyze('');
  assert(emptyAnalysis.anomalies.length === 0, 'Empty code should have no anomalies');
  console.log('✅ Empty code test passed');
}

// Test PatternMatcher
async function testPatternMatcher() {
  console.log('🧪 Testing PatternMatcher...');
  const matcher = new PatternMatcher();

  // Test 1: Detect patterns
  const patternCode = `
    const Singleton = (function() {
      let instance;
      return {
        getInstance: function() {
          if (!instance) {
            instance = createInstance();
          }
          return instance;
        }
      };
    })();

    button.addEventListener('click', function() {
      console.log('Clicked!');
    });
  `;

  const patterns = await matcher.matchPatterns(patternCode);
  assert(patterns.patterns.length >= 1, 'Should detect at least one pattern');
  assert(patterns.patterns.some(p => p.type === 'observer'), 'Should detect observer pattern');
  console.log('✅ Pattern matching test passed');

  // Test 2: Specific pattern types
  const specificPatterns = await matcher.matchPatterns(patternCode, ['observer']);
  assert(specificPatterns.patterns.length > 0, 'Should return requested pattern types');
  console.log('✅ Specific pattern test passed');
}

// Run all tests
async function runTests() {
  try {
    await testAnomalyDetector();
    await testPatternMatcher();
    console.log('\n🎉 All hunch.js tests passed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();
