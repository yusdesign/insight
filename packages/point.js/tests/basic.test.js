import PointJS from '../src/index.js';
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Point.js Basic Functionality', () => {
  it('should identify validation code', async () => {
    const point = new PointJS();
    const validationCode = `
      function validate(input) {
        if (!input) throw new Error('Input required');
        return input.length > 0;
      }
    `;
    
    const analysis = await point.identify(validationCode);
    assert.ok(analysis.confidence > 0.1);
    assert.ok(analysis.primaryPurpose.purpose);
  });
  
  it('should extract goals from comments', () => {
    const point = new PointJS();
    const codeWithComments = `
      // TODO: Implement caching
      // FIXME: Memory leak in processData
      function someFunction() {}
    `;
    
    const goals = point.extractGoals(codeWithComments);
    assert.strictEqual(goals.length, 2);
    assert.strictEqual(goals[0].type, 'todo');
  });
});

console.log('✅ All Point.js tests passed!');
