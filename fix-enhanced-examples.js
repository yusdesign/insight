#!/usr/bin/env node

import fs from 'fs';
import { readFileSync, writeFileSync } from 'fs';

console.log('🔧 Fixing enhanced examples imports...');

const examplesToFix = [
  'examples/basic/pointjs-purpose-detection.js',
  'examples/basic/hunchjs-anomaly-detection.js', 
  'examples/basic/intuitionjs-pattern-learning.js',
  'examples/basic/insightjs-holistic-analysis.js'
];

examplesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      let content = readFileSync(file, 'utf8');
      
      // Replace JS2UML class imports with function imports
      content = content.replace(
        /import { JS2UML } from '@insight-suite\/js2uml';/g,
        `import { analyze, generateReport, UMLGenerator } from '@insight-suite/js2uml';`
      );
      
      // Replace JS2UML.analyze with analyze
      content = content.replace(/JS2UML\.analyze/g, 'analyze');
      
      // Replace JS2UML.generateReport with generateReport  
      content = content.replace(/JS2UML\.generateReport/g, 'generateReport');
      
      writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed: ${file}`);
    } catch (error) {
      console.log(`❌ Error fixing ${file}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log('🎉 Enhanced examples imports fixed!');
