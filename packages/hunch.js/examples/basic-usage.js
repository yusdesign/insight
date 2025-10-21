import HunchJS from '../src/index.js';

async function demonstrateHunchJS() {
  const hunch = new HunchJS({ debug: true });
  
  const complexCode = `
    function processData(data) {
      let result = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].active) {
          for (let j = 0; j < data[i].items.length; j++) {
            if (data[i].items[j].valid) {
              result.push({
                id: data[i].id,
                value: data[i].items[j].value * 12345
              });
            }
          }
        }
      }
      return result;
    }
  `;
  
  const anomalies = await hunch.detectAnomalies(complexCode);
  console.log('🎯 Anomaly Detection:', anomalies);
  
  const intuitionScore = await hunch.getIntuitionScore(complexCode);
  console.log('🎯 Intuition Score:', intuitionScore);
}

demonstrateHunchJS().catch(console.error);
