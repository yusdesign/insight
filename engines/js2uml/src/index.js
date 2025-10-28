// Clean minimal version of JS2UML - Mermaid only
import { UMLGenerator } from './core/UMLGenerator.js';
import { MermaidVisualizer, ASCIIVisualizer, UniversalHTMLReport } from './visualizers/index.js';

// Export core components
export { UMLGenerator };
export { MermaidVisualizer, ASCIIVisualizer, UniversalHTMLReport };

// Main analysis function
export async function analyze(code, options = {}) {
    const generator = new UMLGenerator();
    return await generator.generate({ code, ...options });
}

// Generate HTML report
export async function generateReport(analysis, title = 'Architecture Report') {
    return UniversalHTMLReport.generate(analysis, title);
}

// Simple default export
const JS2UML = {
    analyze,
    generateReport,
    UMLGenerator,
    MermaidVisualizer, 
    ASCIIVisualizer,
    UniversalHTMLReport
};

export default JS2UML;
