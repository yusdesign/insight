import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

console.log('🧮 oeis patterns');
console.log('seeing math as computation\n');

// OEIS sequences as computational patterns
const oeisSequences = [
  {
    id: "A000045",
    name: "Fibonacci",
    description: "Each number is the sum of the two preceding ones",
    code: `
    function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
    `,
    insight: "recursive self-reference creates emergent complexity"
  },
  {
    id: "000040", 
    name: "Prime Numbers",
    description: "Numbers greater than 1 with no positive divisors other than 1 and itself",
    code: `
    function isPrime(n) {
      if (n <= 1) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    }
    `,
    insight: "iterative refinement through elimination"
  },
  {
    id: "000142",
    name: "Factorial",
    description: "Product of all positive integers up to n", 
    code: `
    function factorial(n) {
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    }
    `,
    insight: "recursive accumulation through multiplication"
  },
  {
    id: "000217", 
    name: "Triangular Numbers",
    description: "Numbers that can form an equilateral triangle",
    code: `
    function triangular(n) {
      return n * (n + 1) / 2;
    }
    `,
    insight: "closed-form solutions from geometric relationships"
  }
];

async function analyzeOeisPatterns() {
  const bridge = new StandaloneBridge();
  
  for (const sequence of oeisSequences) {
    console.log(`${sequence.id} - ${sequence.name}`);
    console.log(sequence.description);
    console.log('─'.repeat(40));
    
    const result = await bridge.comprehensiveAnalysisWithDiscovery(
      sequence.code,
      { sequence: sequence.id, type: 'mathematical' }
    );
    
    const patterns = result.archetypal.matches || [];
    
    if (patterns.length > 0) {
      console.log('computation patterns:');
      patterns.forEach(pattern => {
        console.log(`  ${pattern.pattern} (${Math.floor(pattern.confidence * 100)}%)`);
      });
    }
    
    console.log(`insight: ${sequence.insight}`);
    console.log('---\n');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('mathematics as executable patterns');
  console.log('each sequence tells a computational story');
}

analyzeOeisPatterns().catch(console.error);
