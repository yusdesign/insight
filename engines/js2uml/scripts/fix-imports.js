#!/usr/bin/env node

import fs from 'fs';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🔧 Fixing imports in JS2UML files...');

const filesToCheck = [
  'src/index.js',
  'src/core/UMLGenerator.js',
  'src/visualizers/index.js',
  'src/visualizers/MermaidVisualizer.js',
  'src/visualizers/ASCIIVisualizer.js',
  'src/visualizers/UniversalHTMLReport.js'
];

filesToCheck.forEach(file => {
  const fullPath = join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    try {
      let content = readFileSync(fullPath, 'utf8');
      
      // Fix common import issues
      const originalContent = content;
      
      // Replace PlantUML references if any remain
      content = content.replace(/PlantUMLVisualizer/g, 'MermaidVisualizer');
      content = content.replace(/plantuml/g, 'mermaid');
      content = content.replace(/PlantUML/g, 'Mermaid');
      
      // Ensure proper extension imports
      content = content.replace(/from '\.\/([^']+)'/g, "from './$1.js'");
      content = content.replace(/from '\.\.\/([^']+)'/g, "from '../$1.js'");
      
      if (content !== originalContent) {
        writeFileSync(fullPath, content, 'utf8');
        console.log(`✅ Fixed imports in: ${file}`);
      } else {
        console.log(`✅ No changes needed: ${file}`);
      }
      
    } catch (error) {
      console.log(`❌ Error processing ${file}:`, error.message);
    }
  }
});

console.log('🎉 Import fixes completed!');
