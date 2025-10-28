#!/usr/bin/env node

import fs from 'fs';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🔍 Diagnosing JS2UML file structure...\n');

function scanDir(dir, prefix = '') {
  const items = readdirSync(dir, { withFileTypes: true });
  
  items.forEach(item => {
    const fullPath = join(dir, item.name);
    console.log(`${prefix}${item.isDirectory() ? '📁' : '📄'} ${item.name}`);
    
    if (item.isDirectory()) {
      scanDir(fullPath, prefix + '  ');
    }
  });
}

// Scan current directory
console.log('📂 Current directory structure:');
scanDir(process.cwd());

// Check specific required files
console.log('\n🔎 Checking required files:');
const requiredFiles = [
  'src/index.js',
  'src/core/UMLGenerator.js', 
  'src/visualizers/index.js',
  'src/visualizers/MermaidVisualizer.js',
  'src/visualizers/ASCIIVisualizer.js',
  'src/visualizers/UniversalHTMLReport.js'
];

requiredFiles.forEach(file => {
  const exists = existsSync(join(process.cwd(), file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});
