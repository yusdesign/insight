import { stemmer } from 'stemmer';

export class CorrelationEngine {
  constructor(config = {}) {
    this.config = config;
    this.relationshipCache = new Map();
  }

  async findRelationships(codeSnippets, options = {}) {
    const relationships = [];
    let strongConnections = 0;
    let isolatedComponents = 0;

    // Analyze pairwise relationships
    for (let i = 0; i < codeSnippets.length; i++) {
      let hasConnections = false;
      
      for (let j = i + 1; j < codeSnippets.length; j++) {
        const relationship = await this.analyzeRelationship(
          codeSnippets[i], 
          codeSnippets[j],
          options
        );
        
        if (relationship.strength > 0.5) {
          strongConnections++;
          hasConnections = true;
        }
        
        relationships.push(relationship);
      }
      
      if (!hasConnections) {
        isolatedComponents++;
      }
    }

    return {
      connections: relationships,
      strongConnections,
      isolatedComponents,
      summary: this.generateRelationshipSummary(relationships),
      confidence: this.calculateRelationshipConfidence(relationships)
    };
  }

  async analyzeRelationship(snippet1, snippet2, options) {
    const structuralSimilarity = this.calculateStructuralSimilarity(snippet1, snippet2);
    const semanticSimilarity = this.calculateSemanticSimilarity(snippet1, snippet2);
    const dependencySimilarity = this.calculateDependencySimilarity(snippet1, snippet2);
    
    const overallStrength = (structuralSimilarity + semanticSimilarity + dependencySimilarity) / 3;
    
    return {
      source: snippet1.name || 'unknown',
      target: snippet2.name || 'unknown',
      strength: overallStrength,
      structural: structuralSimilarity,
      semantic: semanticSimilarity,
      dependency: dependencySimilarity,
      type: this.determineRelationshipType(overallStrength, structuralSimilarity, semanticSimilarity),
      confidence: this.calculateRelationshipConfidenceScore(structuralSimilarity, semanticSimilarity)
    };
  }

  calculateStructuralSimilarity(snippet1, snippet2) {
    const features1 = this.extractStructuralFeatures(snippet1.code);
    const features2 = this.extractStructuralFeatures(snippet2.code);
    
    return this.calculateFeatureSimilarity(features1, features2);
  }

  calculateSemanticSimilarity(snippet1, snippet2) {
    const concepts1 = this.extractSemanticConcepts(snippet1.code);
    const concepts2 = this.extractSemanticConcepts(snippet2.code);
    
    const intersection = concepts1.filter(concept => concepts2.includes(concept)).length;
    const union = new Set([...concepts1, ...concepts2]).size;
    
    return union > 0 ? intersection / union : 0;
  }

  calculateDependencySimilarity(snippet1, snippet2) {
    const deps1 = this.extractDependencies(snippet1.code);
    const deps2 = this.extractDependencies(snippet2.code);
    
    const commonDeps = deps1.filter(dep => deps2.includes(dep)).length;
    const totalDeps = new Set([...deps1, ...deps2]).size;
    
    return totalDeps > 0 ? commonDeps / totalDeps : 0;
  }

  extractStructuralFeatures(code) {
    return {
      hasFunctions: /function|=>/.test(code),
      hasClasses: /class|constructor/.test(code),
      hasAsync: /async|await/.test(code),
      hasLoops: /for|while|forEach/.test(code),
      hasConditionals: /if|else|switch/.test(code),
      lineCount: code.split('\n').length,
      complexity: this.calculateSimpleComplexity(code)
    };
  }

  extractSemanticConcepts(code) {
    const cleanCode = code
      .replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '')
      .replace(/['"`][^'"`]*['"`]/g, '');
    
    const words = cleanCode
      .toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3)
      .map(word => stemmer(word));
    
    return [...new Set(words)]; // Remove duplicates
  }

  extractDependencies(code) {
    const dependencies = [];
    
    // Extract import/require statements
    const imports = code.match(/(import|require).*from.*['"`]([^'"`]+)['"`]/g) || [];
    imports.forEach(imp => {
      const match = imp.match(/['"`]([^'"`]+)['"`]/);
      if (match) dependencies.push(match[1]);
    });
    
    // Extract function calls that might indicate dependencies
    const functionCalls = code.match(/\b\w+\.\w+\(/g) || [];
    functionCalls.forEach(call => {
      const parts = call.split('.');
      if (parts.length > 1) dependencies.push(parts[0]);
    });
    
    return [...new Set(dependencies)]; // Remove duplicates
  }

  calculateFeatureSimilarity(features1, features2) {
    const keys = new Set([...Object.keys(features1), ...Object.keys(features2)]);
    let similarity = 0;
    let total = 0;
    
    for (const key of keys) {
      if (features1[key] !== undefined && features2[key] !== undefined) {
        if (typeof features1[key] === 'boolean' && typeof features2[key] === 'boolean') {
          if (features1[key] === features2[key]) similarity++;
        } else if (typeof features1[key] === 'number' && typeof features2[key] === 'number') {
          const max = Math.max(features1[key], features2[key]);
          if (max > 0) {
            similarity += 1 - (Math.abs(features1[key] - features2[key]) / max);
          }
        }
        total++;
      }
    }
    
    return total > 0 ? similarity / total : 0;
  }

  determineRelationshipType(strength, structural, semantic) {
    if (strength > 0.8) return 'strong-coupling';
    if (strength > 0.6) return 'moderate-coupling';
    if (strength > 0.4) return 'weak-coupling';
    if (structural > semantic) return 'structural-similarity';
    if (semantic > structural) return 'semantic-similarity';
    return 'minimal-relationship';
  }

  calculateRelationshipConfidenceScore(structural, semantic) {
    return (structural + semantic) / 2;
  }

  calculateSimpleComplexity(code) {
    const decisionPoints = (code.match(/(if|else|case|\?|&&|\|\|)/g) || []).length;
    return Math.min(decisionPoints / 10, 1.0);
  }

  generateRelationshipSummary(relationships) {
    const types = {};
    relationships.forEach(rel => {
      types[rel.type] = (types[rel.type] || 0) + 1;
    });
    
    return {
      totalRelationships: relationships.length,
      averageStrength: relationships.reduce((sum, rel) => sum + rel.strength, 0) / relationships.length,
      relationshipTypes: types
    };
  }

  calculateRelationshipConfidence(relationships) {
    if (relationships.length === 0) return 0.3;
    
    const avgConfidence = relationships.reduce((sum, rel) => sum + rel.confidence, 0) / relationships.length;
    return Math.min(avgConfidence * 1.1, 0.95);
  }
}
