// Let's debug what exports are actually available
async function checkPackageExports() {
    console.log('🔍 Checking Insight Suite Package Exports...\n');
    
    try {
        // Check PointJS
        const PointJS = await import('../../../packages/point.js/src/index.js');
        console.log('📦 PointJS exports:', Object.keys(PointJS));
        
        // Check HunchJS  
        const HunchJS = await import('../../../packages/hunch.js/src/index.js');
        console.log('📦 HunchJS exports:', Object.keys(HunchJS));
        
        // Check IntuitionJS
        const IntuitionJS = await import('../../../packages/intuition.js/src/index.js');
        console.log('📦 IntuitionJS exports:', Object.keys(IntuitionJS));
        
        // Check Insight
        const Insight = await import('../../../packages/insight.js/src/index.js');
        console.log('📦 Insight exports:', Object.keys(Insight));
        
    } catch (error) {
        console.log('❌ Error checking packages:', error.message);
        console.log('Let me try relative paths from js2uml directory...');
        
        try {
            const PointJS = await import('../../packages/point.js/src/index.js');
            console.log('📦 PointJS exports (relative):', Object.keys(PointJS));
        } catch (e) {
            console.log('❌ Still cannot import packages');
            console.log('Let me check the file structure...');
            
            const fs = await import('fs');
            const path = await import('path');
            
            const packagesPath = '../../packages';
            if (fs.existsSync(packagesPath)) {
                const packages = fs.readdirSync(packagesPath);
                console.log('📁 Available packages:', packages);
                
                packages.forEach(pkg => {
                    const pkgPath = path.join(packagesPath, pkg, 'src', 'index.js');
                    console.log(`📄 ${pkg} index exists:`, fs.existsSync(pkgPath));
                });
            }
        }
    }
}

checkPackageExports();
