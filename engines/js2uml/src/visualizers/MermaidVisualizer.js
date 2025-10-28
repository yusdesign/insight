export class MermaidVisualizer {
    static generate(analysis) {
        const { classes, relationships, insights } = analysis;
        
        let mermaid = '```mermaid\n';
        mermaid += 'classDiagram\n';
        mermaid += `    %% JS2UML Analysis - ${insights.totalClasses} classes, ${insights.totalMethods} methods\n`;
        mermaid += `    %% Quality Score: ${insights.qualityScore}%\n\n`;
        
        // Direction for better layout
        mermaid += '    direction LR\n\n';
        
        // Classes with CLEAN methods and properties
        classes.forEach(cls => {
            mermaid += `    class ${cls.name} {\n`;
            
            // Clean properties (remove duplicates, limit)
            const cleanProps = [...new Set(cls.properties)]
                .filter(prop => prop && prop.length > 1)
                .slice(0, 5);
                
            if (cleanProps.length > 0) {
                cleanProps.forEach(prop => {
                    mermaid += `        -${prop}\n`;
                });
            }
            
            // Clean methods (remove control structures, limit)
            const cleanMethods = cls.methods.declared
                .filter(m => !['if', 'else', 'catch', 'try', 'for', 'while', 'switch'].includes(m))
                .slice(0, 6);
            
            if (cleanMethods.length > 0) {
                cleanMethods.forEach(method => {
                    mermaid += `        +${method}()\n`;
                });
            }
            
            mermaid += '    }\n';
        });
        
        // SIMPLIFIED Relationships (Mermaid is strict about syntax)
        if (relationships.length > 0) {
            mermaid += '\n    %% Relationships\n';
            relationships.forEach(rel => {
                // Only include relationships between actual classes
                const sourceExists = classes.some(c => c.name === rel.from);
                const targetExists = classes.some(c => c.name === rel.to);
                
                if (sourceExists && targetExists) {
                    switch (rel.type) {
                        case 'inheritance':
                            mermaid += `    ${rel.from} --|> ${rel.to}\n`;
                            break;
                        case 'creation':
                            mermaid += `    ${rel.from} ..> ${rel.to} : creates\n`;
                            break;
                        case 'usage':
                            mermaid += `    ${rel.from} --> ${rel.to}\n`;
                            break;
                        default:
                            mermaid += `    ${rel.from} --> ${rel.to}\n`;
                    }
                }
            });
        }
        
        mermaid += '```';
        return mermaid;
    }
    
    static generateHTML(analysis, title = 'Architecture Diagram') {
        const mermaidCode = this.generate(analysis)
            .replace('```mermaid\n', '')
            .replace('\n```', '');
        
        return `
<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
        mermaid.initialize({ 
            startOnLoad: true,
            theme: 'default'
        });
    </script>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .mermaid { 
            background: white; 
            padding: 20px; 
            border-radius: 8px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <div class="mermaid">
${mermaidCode}
    </div>
</body>
</html>`;
    }
}
