import PointJS from '../../packages/point.js/src/index.js';

const testCode = `
class UserService {
    constructor() {
        this.users = new Map();
    }
    
    getUser(id) {
        return this.users.get(id);
    }
    
    addUser(user) {
        this.users.set(user.id, user);
    }
}

class DataProcessor {
    process(data) {
        return data.map(item => this.transform(item));
    }
    
    transform(item) {
        return { ...item, processed: true };
    }
}
`;

async function testPointJS() {
    console.log('🎯 Testing PointJS Integration\n');
    
    try {
        const point = new PointJS();
        console.log('✅ PointJS instance created');
        
        console.log('🔍 Analyzing code with PointJS...');
        const purpose = await point.identify(testCode);
        
        console.log('📊 PointJS Analysis Result:');
        console.log('Purpose:', purpose);
        console.log('Type:', typeof purpose);
        
        if (purpose && typeof purpose === 'object') {
            console.log('Object keys:', Object.keys(purpose));
        }
        
    } catch (error) {
        console.log('❌ PointJS Error:', error.message);
        console.log('Stack:', error.stack);
    }
}

testPointJS();
