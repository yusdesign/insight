import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

console.log('⚡ circuit patterns');
console.log('physical computation as algorithms\n');

// Electrical circuits as computational patterns
const circuits = [
  {
    name: "Voltage Divider",
    description: "Two resistors splitting voltage",
    code: `
    class VoltageDivider {
      calculateOutputVoltage(R1, R2, Vin) {
        // Vout = Vin * (R2 / (R1 + R2))
        return Vin * (R2 / (R1 + R2));
      }
      
      calculateCurrent(R1, R2, Vin) {
        // I = Vin / (R1 + R2)  
        return Vin / (R1 + R2);
      }
    }
    `,
    insight: "ratios distribute energy according to resistance"
  },
  {
    name: "RC Filter",
    description: "Resistor-Capacitor frequency filter", 
    code: `
    class RCFilter {
      constructor(R, C) {
        this.R = R; // resistance
        this.C = C; // capacitance
      }
      
      cutoffFrequency() {
        // fc = 1 / (2 * π * R * C)
        return 1 / (2 * Math.PI * this.R * this.C);
      }
      
      impedance(frequency) {
        // Z = √(R² + Xc²) where Xc = 1/(2πfC)
        const Xc = 1 / (2 * Math.PI * frequency * this.C);
        return Math.sqrt(this.R * this.R + Xc * Xc);
      }
    }
    `,
    insight: "time constants create frequency-dependent behavior"
  },
  {
    name: "Operational Amplifier",
    description: "Amplifies voltage difference between inputs",
    code: `
    class OpAmp {
      invertingAmplifier(Rf, Rin, Vin) {
        // Vout = -V_in * (Rf / Rin)
        return -Vin * (Rf / Rin);
      }
      
      nonInvertingAmplifier(Rf, Rin, Vin) {
        // Vout = V_in * (1 + Rf/Rin)  
        return Vin * (1 + (Rf / Rin));
      }
      
      voltageFollower(Vin) {
        // Vout = Vin (unity gain)
        return Vin;
      }
    }
    `,
    insight: "negative feedback creates precise amplification"
  },
  {
    name: "Logic Gates",
    description: "Boolean operations as physical switches", 
    code: `
    class LogicGate {
      AND(a, b) {
        return a && b;
      }
      
      OR(a, b) {
        return a || b;
      }
      
      NOT(a) {
        return !a;
      }
      
      XOR(a, b) {
        return a !== b;
      }
      
      NAND(a, b) {
        return !(a && b);
      }
    }
    `,
    insight: "physical switches implement logical decisions"
  }
];

async function analyzeCircuitPatterns() {
  const bridge = new StandaloneBridge();
  
  for (const circuit of circuits) {
    console.log(circuit.name);
    console.log(circuit.description);
    console.log('─'.repeat(40));
    
    const result = await bridge.comprehensiveAnalysisWithDiscovery(
      circuit.code,
      { circuit: circuit.name, type: 'electrical' }
    );
    
    const patterns = result.archetypal.matches || [];
    
    if (patterns.length > 0) {
      console.log('computation patterns:');
      patterns.forEach(pattern => {
        console.log(`  ${pattern.pattern} (${Math.floor(pattern.confidence * 100)}%)`);
      });
    }
    
    console.log(`insight: ${circuit.insight}`);
    console.log('---\n');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('electricity becomes logic');
  console.log('physical laws become computational rules');
}

analyzeCircuitPatterns().catch(console.error);
