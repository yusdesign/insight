import { StandaloneBridge } from '../src/integration/StandaloneBridge.js';

console.log('🔷 geometry patterns');
console.log('spatial relationships as code\n');

// Geometric structures as computational patterns
const geometricFigures = [
  {
    name: "Icosahedron",
    description: "20 faces, 12 vertices, 30 edges",
    code: `
    class Icosahedron {
      constructor() {
        this.faces = 20;
        this.vertices = 12; 
        this.edges = 30;
      }
      
      verifyEuler() {
        // V - E + F = 2
        return this.vertices - this.edges + this.faces === 2;
      }
      
      getVertexCoordinates() {
        // Golden ratio relationships
        const phi = (1 + Math.sqrt(5)) / 2;
        return [
          [0, ±1, ±phi], [±1, ±phi, 0], [±phi, 0, ±1]
        ];
      }
    }
    `,
    insight: "topological constraints create invariant relationships"
  },
  {
    name: "Circle",
    description: "All points equidistant from center", 
    code: `
    class Circle {
      constructor(radius) {
        this.radius = radius;
      }
      
      area() {
        return Math.PI * this.radius * this.radius;
      }
      
      circumference() {
        return 2 * Math.PI * this.radius;
      }
      
      containsPoint(x, y, centerX = 0, centerY = 0) {
        const dx = x - centerX;
        const dy = y - centerY;
        return dx * dx + dy * dy <= this.radius * this.radius;
      }
    }
    `,
    insight: "symmetry enables simple containment checks"
  },
  {
    name: "Transformations",
    description: "Moving shapes in space",
    code: `
    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    }
    
    class Transformer {
      rotate(point, angle, center = new Point(0, 0)) {
        const dx = point.x - center.x;
        const dy = point.y - center.y;
        return new Point(
          center.x + dx * Math.cos(angle) - dy * Math.sin(angle),
          center.y + dx * Math.sin(angle) + dy * Math.cos(angle)
        );
      }
      
      scale(point, factor, center = new Point(0, 0)) {
        const dx = point.x - center.x;
        const dy = point.y - center.y;
        return new Point(
          center.x + dx * factor,
          center.y + dy * factor  
        );
      }
      
      translate(point, dx, dy) {
        return new Point(point.x + dx, point.y + dy);
      }
    }
    `,
    insight: "coordinate transformations preserve spatial relationships"
  }
];

async function analyzeGeometryPatterns() {
  const bridge = new StandaloneBridge();
  
  for (const figure of geometricFigures) {
    console.log(figure.name);
    console.log(figure.description);
    console.log('─'.repeat(40));
    
    const result = await bridge.comprehensiveAnalysisWithDiscovery(
      figure.code,
      { figure: figure.name, type: 'geometric' }
    );
    
    const patterns = result.archetypal.matches || [];
    
    if (patterns.length > 0) {
      console.log('structural patterns:');
      patterns.forEach(pattern => {
        console.log(`  ${pattern.pattern} (${Math.floor(pattern.confidence * 100)}%)`);
      });
    }
    
    console.log(`insight: ${figure.insight}`);
    console.log('---\n');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('geometry as computational constraints');
  console.log('space becomes rules, relationships become code');
}

analyzeGeometryPatterns().catch(console.error);
