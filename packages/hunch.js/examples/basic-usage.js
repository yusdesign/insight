import HunchJS from '../src/index.js';

const hunch = new HunchJS({ debug: true });

async function runExamples() {
  console.log('🔮 hunch.js Basic Examples\n');

  // Example 1: Detect anomalies in smelly code
  console.log('1. Anomaly Detection:');
  const smellyCode = `
    function processUserData(user) {
      if (user && user.profile && user.profile.preferences && user.profile.preferences.notifications) {
        if (user.profile.preferences.notifications.email) {
          if (user.profile.preferences.notifications.email.marketing) {
            if (user.profile.preferences.notifications.email.marketing.enabled) {
              sendEmail(user.email, 'Welcome!');
            }
          }
        }
      }
      
      // Magic numbers everywhere!
      let score = user.age * 123 + user.visits * 456;
      
      function nestedHell() {
        try {
          while (true) {
            for (let i = 0; i < 100; i++) {
              if (i % 2 === 0) {
                if (i % 3 === 0) {
                  console.log(i);
                }
              }
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
      
      return score > 1000 ? 'premium' : 'basic';
    }
  `;

  const anomalies = await hunch.detectAnomalies(smellyCode);
  console.log('Detected Anomalies:', anomalies.anomalies.length);
  console.log('Confidence:', anomalies.confidence);
  console.log('Summary:', anomalies.summary);
  
  anomalies.anomalies.forEach(anomaly => {
    console.log(`  - ${anomaly.type}: ${anomaly.description} (${anomaly.severity})`);
  });

  // Example 2: Detect specific code smells
  console.log('\n2. Specific Smell Detection:');
  const smells = await hunch.detectSmells(smellyCode, ['deep-nesting', 'magic-numbers']);
  console.log('Specific smells found:', smells.anomalies.map(a => a.type));

  // Example 3: Pattern recognition
  console.log('\n3. Pattern Recognition:');
  const patternCode = `
    class DatabaseConnection {
      static instance = null;
      
      static getInstance() {
        if (!DatabaseConnection.instance) {
          DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
      }
    }
    
    document.addEventListener('click', (event) => {
      console.log('Clicked at:', event.clientX, event.clientY);
    });
  `;

  const patterns = await hunch.findPatterns(patternCode);
  console.log('Detected Patterns:');
  patterns.patterns.forEach(pattern => {
    console.log(`  - ${pattern.type}: ${pattern.description} (${pattern.category})`);
  });

  // Example 4: Intuition score
  console.log('\n4. Intuition Score:');
  const intuitionScore = await hunch.getIntuitionScore(smellyCode);
  console.log('Gut feeling score:', intuitionScore.toFixed(2));

  console.log('\n✅ All hunch.js examples completed!');
}

runExamples().catch(console.error);
