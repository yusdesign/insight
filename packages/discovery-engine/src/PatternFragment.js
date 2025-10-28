export class PatternFragment {
  constructor(observation, context = {}) {
    this.id = `frag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.observation = observation;
    this.context = context;
    this.confidence = 0.1; // Starting confidence
    this.connections = new Set();
    this.timestamp = Date.now();
    this.metadata = {
      linesOfCode: this.countLines(observation.code),
      hasAsync: observation.code.includes('async'),
      hasClass: observation.code.includes('class '),
      hasFunction: observation.code.includes('function') || observation.code.includes('=>')
    };
  }

  static createFromCode(code, context = {}) {
    const structure = PatternFragment.extractBasicStructure(code);
    return new PatternFragment({ code, structure }, context);
  }

  static extractBasicStructure(code) {
    const structures = [];
    
    if (code.includes('class ')) structures.push('class');
    if (code.includes('async ')) structures.push('async');
    if (code.includes('function')) structures.push('function');
    if (code.includes('=>')) structures.push('arrow-function');
    if (code.includes('constructor')) structures.push('constructor');
    if (code.includes('return ')) structures.push('return');
    
    return structures.join('|');
  }

  countLines(code) {
    return code.split('\n').length;
  }

  isValid() {
    return this.observation && 
           this.observation.code && 
           this.observation.code.length > 10 && // Minimum code size
           this.confidence >= 0;
  }

  reinforce() {
    // Slightly increase confidence when reinforced
    this.confidence = Math.min(1.0, this.confidence + 0.05);
    return this.confidence;
  }

  toJSON() {
    return {
      id: this.id,
      confidence: this.confidence,
      structure: this.observation.structure,
      metadata: this.metadata,
      timestamp: this.timestamp
    };
  }
}
