import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

console.log('🚶 pattern walk');
console.log('just seeing what patterns appear\n');

const simpleCodes = [
  `// a function that adds numbers
  function add(a, b) {
    return a + b;
  }`,
  
  `// a class that holds data
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }`,
  
  `// async data fetching
  async function getUser(id) {
    const response = await fetch('/users/' + id);
    return response.json();
  }`
];

async function takePatternWalk() {
  const bridge = new StandaloneBridge();
  
  for (let i = 0; i < simpleCodes.length; i++) {
    const code = simpleCodes[i];
    console.log(`sample ${i + 1}:`);
    console.log(code.split('\n')[0]); // just first line
    
    const result = await bridge.comprehensiveAnalysisWithDiscovery(code);
    
    const patterns = result.archetypal.matches || [];
    if (patterns.length > 0) {
      console.log('patterns: ', patterns.map(p => p.pattern).join(', '));
    } else {
      console.log('patterns: (none detected)');
    }
    
    console.log('---');
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('walk complete');
  console.log('patterns are just patterns');
}

takePatternWalk().catch(console.error);
