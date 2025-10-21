import { cpSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function copyBuild() {
  const packageName = __dirname.split('/').pop();
  console.log(`📦 Building ${packageName}...`);
  
  try {
    const srcDir = join(__dirname, 'src');
    const distDir = join(__dirname, 'dist');
    
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }
    
    cpSync(srcDir, distDir, { recursive: true });
    console.log(`✅ ${packageName} build completed!`);
    return true;
  } catch (error) {
    console.error(`❌ ${packageName} build failed:`, error.message);
    return false;
  }
}

const success = copyBuild();
process.exit(success ? 0 : 1);
