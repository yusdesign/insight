import PointJS from '../src/index.js';

async function demonstratePointJS() {
  const point = new PointJS({ debug: true });
  
  const validationCode = `
    function validateEmail(email) {
      const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!regex.test(email)) {
        throw new Error('Invalid email format');
      }
      return true;
    }
  `;
  
  const analysis = await point.identify(validationCode);
  console.log('🎯 Purpose Analysis:', analysis);
  
  const goals = point.extractGoals(`
    // TODO: Add phone number validation
    // FIXME: Handle international email formats
    // OPTIMIZE: Cache regex compilation
  `);
  
  console.log('🎯 Extracted Goals:', goals);
}

demonstratePointJS().catch(console.error);
