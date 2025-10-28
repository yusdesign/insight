import fs from 'fs';
import path from 'path';

async function checkPackageJsons() {
    console.log('📦 Checking Insight Suite Package.json Structure...\n');
    
    const packages = [
        'point.js',
        'hunch.js', 
        'intuition.js',
        'insight.js'
    ];
    
    for (const pkgName of packages) {
        const pkgPath = path.join('..', '..', 'packages', pkgName, 'package.json');
        
        try {
            const pkgContent = fs.readFileSync(pkgPath, 'utf8');
            const pkg = JSON.parse(pkgContent);
            
            console.log(`📁 ${pkgName}:`);
            console.log(`   Name: ${pkg.name}`);
            console.log(`   Main: ${pkg.main || 'Not specified'}`);
            console.log(`   Type: ${pkg.type || 'CommonJS'}`);
            console.log(`   Exports: ${pkg.exports ? 'Yes' : 'No'}`);
            
            if (pkg.exports) {
                console.log(`   Export Keys:`, Object.keys(pkg.exports));
            }
            console.log('');
            
        } catch (error) {
            console.log(`❌ ${pkgName}: Cannot read package.json - ${error.message}`);
        }
    }
}

checkPackageJsons();
