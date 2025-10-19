/**
 * RelationshipFinder - Finds connections between code elements
 */
export class RelationshipFinder {
  constructor(options = {}) {
    this.similarityThreshold = options.similarityThreshold || 0.6;
  }

  async analyze(codeSnippets) {
    if (!Array.isArray(codeSnippets) || codeSnippets.length < 2) {
      return { relationships: [], overallSimilarity: 0 };
    }

    const analysis = {
      relationships: [],
      overallSimilarity: 0,
      clusters: []
    };

    // Calculate pairwise relationships
    for (let i = 0; i < codeSnippets.length; i++) {
      for (let j = i + 1; j < codeSnippets.length; j++) {
        const similarity = await this.calculateSimilarity(codeSnippets[i], codeSnippets[j]);
        
        if (similarity >= this.similarityThreshold) {
          analysis.relationships.push({
            snippet1: i,
            snippet2: j,
            similarity: similarity,
            type: this.determineRelationshipType(codeSnippets[i], codeSnippets[j], similarity),
            strength: this.calculateRelationshipStrength(similarity)
          });
        }
      }
    }

    analysis.relationships.sort((a, b) => b.similarity - a.similarity);
    analysis.overallSimilarity = this.calculateOverallSimilarity(analysis.relationships);
    analysis.clusters = this.findClusters(analysis.relationships, codeSnippets.length);

    return analysis;
  }

  async calculateSimilarity(code1, code2) {
    if (!code1 || !code2) return 0;

    const features1 = this.extractFeatures(code1);
    const features2 = this.extractFeatures(code2);

    let similarity = 0;

    // Structural similarity
    const structuralOverlap = features1.structures.filter(s => 
      features2.structures.includes(s)
    ).length;
    similarity += (structuralOverlap / Math.max(features1.structures.length, features2.structures.length, 1)) * 0.3;

    // Keyword similarity
    const keywordOverlap = features1.keywords.filter(k => 
      features2.keywords.includes(k)
    ).length;
    similarity += (keywordOverlap / Math.max(features1.keywords.length, features2.keywords.length, 1)) * 0.3;

    // Complexity similarity
    const complexityDiff = Math.abs(features1.complexity - features2.complexity);
    similarity += (1 - Math.min(complexityDiff / 10, 1)) * 0.2;

    // Length similarity (normalized)
    const lengthRatio = Math.min(features1.length, features2.length) / Math.max(features1.length, features2.length);
    similarity += lengthRatio * 0.2;

    return Math.min(similarity, 1.0);
  }

  extractFeatures(code) {
    return {
      structures: this.extractStructures(code),
      keywords: this.extractKeywords(code),
      complexity: this.calculateComplexity(code),
      length: code.length
    };
  }

  extractStructures(code) {
    const structures = [];
    if (code.includes('function')) structures.push('function');
    if (code.includes('class')) structures.push('class');
    if (code.includes('=>')) structures.push('arrow-function');
    if (code.includes('import') || code.includes('require')) structures.push('module');
    if (code.includes('if') || code.includes('switch')) structures.push('conditional');
    if (code.includes('for') || code.includes('while')) structures.push('loop');
    if (code.includes('try') || code.includes('catch')) structures.push('error-handling');
    if (code.includes('async') || code.includes('await')) structures.push('async');
    return structures;
  }

  extractKeywords(code) {
    const keywords = code.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const stopWords = new Set([
      'function', 'const', 'let', 'var', 'return', 'if', 'else',
      'for', 'while', 'switch', 'case', 'default', 'try', 'catch'
    ]);
    return [...new Set(keywords.filter(word => 
      !stopWords.has(word) && word.length > 2
    ))].slice(0, 15);
  }

  calculateComplexity(code) {
    let complexity = 0;
    complexity += (code.match(/if|else|switch/g) || []).length;
    complexity += (code.match(/for|while|do/g) || []).length;
    complexity += (code.match(/&&|\|\|/g) || []).length;
    complexity += (code.match(/try|catch|finally/g) || []).length;
    return complexity;
  }

  determineRelationshipType(code1, code2, similarity) {
    const features1 = this.extractFeatures(code1);
    const features2 = this.extractFeatures(code2);

    if (similarity > 0.8) return 'duplicate';
    if (features1.structures.join() === features2.structures.join()) return 'structural-similar';
    if (this.calculateKeywordOverlap(features1.keywords, features2.keywords) > 0.7) return 'semantic-similar';
    
    return 'related';
  }

  calculateKeywordOverlap(keywords1, keywords2) {
    const overlap = keywords1.filter(k => keywords2.includes(k)).length;
    return overlap / Math.max(keywords1.length, keywords2.length, 1);
  }

  calculateRelationshipStrength(similarity) {
    if (similarity > 0.8) return 'strong';
    if (similarity > 0.6) return 'medium';
    return 'weak';
  }

  calculateOverallSimilarity(relationships) {
    if (relationships.length === 0) return 0;
    
    const totalSimilarity = relationships.reduce((sum, rel) => sum + rel.similarity, 0);
    return totalSimilarity / relationships.length;
  }

  findClusters(relationships, totalSnippets) {
    const clusters = [];
    const visited = new Set();

    for (let i = 0; i < totalSnippets; i++) {
      if (!visited.has(i)) {
        const cluster = this.buildCluster(i, relationships, visited);
        if (cluster.length > 1) {
          clusters.push({
            members: cluster,
            size: cluster.length,
            averageSimilarity: this.calculateClusterSimilarity(cluster, relationships)
          });
        }
      }
    }

    return clusters.sort((a, b) => b.size - a.size);
  }

  buildCluster(start, relationships, visited) {
    const cluster = [start];
    visited.add(start);
    const queue = [start];

    while (queue.length > 0) {
      const current = queue.shift();
      
      relationships.forEach(rel => {
        if (rel.snippet1 === current && !visited.has(rel.snippet2)) {
          cluster.push(rel.snippet2);
          visited.add(rel.snippet2);
          queue.push(rel.snippet2);
        } else if (rel.snippet2 === current && !visited.has(rel.snippet1)) {
          cluster.push(rel.snippet1);
          visited.add(rel.snippet1);
          queue.push(rel.snippet1);
        }
      });
    }

    return cluster;
  }

  calculateClusterSimilarity(cluster, relationships) {
    let totalSimilarity = 0;
    let count = 0;

    for (let i = 0; i < cluster.length; i++) {
      for (let j = i + 1; j < cluster.length; j++) {
        const rel = relationships.find(r => 
          (r.snippet1 === cluster[i] && r.snippet2 === cluster[j]) ||
          (r.snippet1 === cluster[j] && r.snippet2 === cluster[i])
        );
        if (rel) {
          totalSimilarity += rel.similarity;
          count++;
        }
      }
    }

    return count > 0 ? totalSimilarity / count : 0;
  }
}
