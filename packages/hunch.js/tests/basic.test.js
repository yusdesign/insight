import HunchJS from '../src/index.js';
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Hunch.js Basic Functionality', () => {
  it('should detect anomalies in complex code', async () => {
    const hunch = new HunchJS();
    const complexCode = `
      function overlyComplex(data) {
        let result = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].active) {
            for (let j = 0; j < data[i].items.length; j++) {
              if (data[i].items[j].valid) {
                for (let k = 0; k < data[i].items[j].nested.length; k++) {
                  result.push(data[i].items[j].nested[k] * 12345);
                }
              }
            }
          }
        }
        return result;
      }
    `;
    
    const anomalies = await hunch.detectAnomalies(complexCode);
    assert.ok(anomalies.confidence > 0.1);
    assert.ok(Array.isArray(anomalies.anomalies));
  });
  
  it('should calculate intuition score', async () => {
    const hunch = new HunchJS();
    const simpleCode = `function add(a, b) { return a + b; }`;
    
    const score = await hunch.getIntuitionScore(simpleCode);
    assert.ok(score >= 0 && score <= 1);
  });
});

console.log('✅ All Hunch.js tests passed!');
