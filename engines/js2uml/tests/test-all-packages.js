async function checkAllPackages() {
    console.log('🔍 Checking ALL Insight Suite Package Exports...\n');
    
    const packages = [
        { name: 'PointJS', path: '../../packages/point.js/src/index.js' },
        { name: 'HunchJS', path: '../../packages/hunch.js/src/index.js' },
        { name: 'IntuitionJS', path: '../../packages/intuition.js/src/index.js' },
        { name: 'Insight.js', path: '../../packages/insight.js/src/index.js' }
    ];
    
    for (const pkg of packages) {
        try {
            const module = await import(pkg.path);
            console.log(`📦 ${pkg.name} exports:`, Object.keys(module));
            
            // Check if it has a default export
            if (module.default) {
                console.log(`   ✅ Has default export`);
                const instance = new module.default();
                console.log(`   🎯 Instance methods:`, Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter(m => m !== 'constructor'));
            }
            
        } catch (error) {
            console.log(`❌ ${pkg.name} error:`, error.message);
        }
        console.log('');
    }
}

checkAllPackages();
