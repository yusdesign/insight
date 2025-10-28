#!/usr/bin/env node

import fs from 'fs';
import { readFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 Checking syntax of JS2UML files...');

const filesToCheck = [
  'src/index.js',
  'src/core/UMLGenerator.js',
  'src/visualizers/index.js'
];

filesToCheck.forEach(file => {
  const fullPath = join(process.cwd(), file);
  console.log(`\n📄 Checking: ${file}`);
  
  try {
    const content = readFileSync(fullPath, 'utf8');
    
    // Try to parse as module
    new Function('return async () => {' + content + '}')();
    console.log('✅ Syntax OK');
    
  } catch (error) {
    console.log('❌ Syntax error:', error.message);
    console.log('   Line might be around:', error.stack.split('\n')[1]);
  }
});

console.log('\n🎉 Syntax check completed!');
