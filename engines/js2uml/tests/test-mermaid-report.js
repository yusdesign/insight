import { UMLGenerator } from '../src/index.js';
import { MarkdownReportGenerator } from '../src/visualizers/MarkdownReportGenerator.js';
import { MermaidVisualizer } from '../src/visualizers/MermaidVisualizer.js';

const EXPRESS_CODE = `
// Your Express.js code here...
`;

async function generateMermaidReport() {
    console.log('🎨 Generating Mermaid-based Report...\n');
    
    const generator = new UMLGenerator();
    const analysis = await generator.generate({
        code: EXPRESS_CODE,
        purposeAnalysis: { type: 'web-framework', confidence: 0.92 },
        patternAnalysis: { patterns: ['middleware', 'routing', 'request-response'] },
        intuitionScore: 88.2
    });
    
    // Generate Markdown with Mermaid
    const mdReport = MarkdownReportGenerator.generate(analysis, 'Express.js Architecture Analysis');
    const fs = await import('fs');
    fs.mkdirSync('./outputs', { recursive: true });
    fs.writeFileSync('./outputs/express-mermaid.md', mdReport);
    
    // Generate standalone HTML with Mermaid
    const mermaidHTML = MermaidVisualizer.generateHTML(analysis, 'Express.js Architecture');
    fs.writeFileSync('./outputs/express-mermaid.html', mermaidHTML);
    
    console.log('✅ Mermaid Reports Generated:');
    console.log('   📝 outputs/express-mermaid.md - Perfect for GitHub/GitLab');
    console.log('   📄 outputs/express-mermaid.html - Standalone viewer');
    console.log('\n🎉 Mermaid diagrams render natively in GitHub/GitLab!');
}

generateMermaidReport().catch(console.error);
