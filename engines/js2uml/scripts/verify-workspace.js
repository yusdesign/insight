import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function verifyWorkspace() {
    console.log('🔍 Verifying npm Workspace Setup...\n');
    
    try {
        // Check root package.json
        const rootPkgPath = resolve(__dirname, '../../package.json');
        const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf8'));
        
        console.log('📦 Root Package:');
        console.log(`   Name: ${rootPkg.name}`);
        console.log(`   Workspaces: ${rootPkg.workspaces?.join(', ') || 'None'}`);
        
        // Check if js2uml can resolve workspace packages using import()
        const packages = [
            '@insight-suite/point.js',
            '@insight-suite/hunch.js', 
            '@insight-suite/intuition.js',
            '@insight-suite/insight.js'
        ];
        
        console.log('\n🔗 Workspace Package Resolution:');
        
        for (const pkg of packages) {
            try {
                // Try to dynamically import the package
                const module = await import(pkg);
                console.log(`   ✅ ${pkg} -> Successfully imported`);
                console.log(`      Default export: ${typeof module.default}`);
            } catch (error) {
                console.log(`   ❌ ${pkg} -> ${error.message}`);
            }
        }
        
        // Check node_modules resolution
        console.log('\n📁 Node Modules Resolution:');
        try {
            const pointPath = resolve(__dirname, '../../node_modules/@insight-suite/point.js');
            console.log(`   📍 Point.js path: ${pointPath}`);
            
            const pointPkg = JSON.parse(readFileSync(resolve(pointPath, 'package.json'), 'utf8'));
            console.log(`   📦 Point.js package: ${pointPkg.name}@${pointPkg.version}`);
        } catch (error) {
            console.log(`   ❌ Cannot resolve node_modules: ${error.message}`);
        }
        
    } catch (error) {
        console.log('❌ Workspace verification failed:', error.message);
    }
}

verifyWorkspace();
