import fs from 'fs';
import path from 'path';

function updatePackageExports() {
    console.log('📦 Adding exports fields to Insight Suite packages...\n');
    
    const packages = [
        'point.js',
        'hunch.js',
        'intuition.js', 
        'insight.js'
    ];
    
    packages.forEach(pkgName => {
        const pkgPath = path.join('..', '..', 'packages', pkgName, 'package.json');
        
        try {
            const pkgContent = fs.readFileSync(pkgPath, 'utf8');
            const pkg = JSON.parse(pkgContent);
            
            // Add exports field if it doesn't exist
            if (!pkg.exports) {
                pkg.exports = {
                    ".": "./src/index.js",
                    "./package.json": "./package.json"
                };
                
                // Write updated package.json
                fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
                console.log(`✅ Updated ${pkgName} with exports field`);
            } else {
                console.log(`ℹ️  ${pkgName} already has exports field`);
            }
            
        } catch (error) {
            console.log(`❌ Failed to update ${pkgName}: ${error.message}`);
        }
    });
    
    console.log('\n🎉 All packages updated!');
}

updatePackageExports();
