export class ASCIIVisualizer {
    static render(analysis) {
        const { classes, relationships, insights } = analysis;
        
        let ascii = '';
        ascii += '┌────────────────────────────────────────┐\n';
        ascii += '│           ARCHITECTURE DIAGRAM         │\n';
        ascii += '└────────────────────────────────────────┘\n\n';
        
        // Classes
        classes.forEach(cls => {
            ascii += this.renderClass(cls);
            ascii += '\n';
        });
        
        // Relationships
        if (relationships.length > 0) {
            ascii += 'RELATIONSHIPS:\n';
            ascii += '──────────────\n';
            relationships.forEach(rel => {
                ascii += `${rel.from} ──${this.getRelationSymbol(rel)}──> ${rel.to}\n`;
            });
            ascii += '\n';
        }
        
        // Insights
        ascii += 'INSIGHTS:\n';
        ascii += '─────────\n';
        ascii += `• Total Classes: ${insights.totalClasses}\n`;
        ascii += `• Total Methods: ${insights.totalMethods}\n`;
        ascii += `• Quality Score: ${insights.qualityScore}%\n`;
        
        return ascii;
    }
    
    static renderClass(cls) {
        let classBox = '';
        const boxWidth = 40;
        
        // Header
        classBox += `┌─ ${cls.name} ${'─'.repeat(boxWidth - cls.name.length - 4)}┐\n`;
        
        // Methods (only declared, filter out control structures)
        const cleanMethods = cls.methods.declared.filter(m => 
            !['if', 'else', 'catch', 'try', 'for', 'while'].includes(m)
        );
        
        if (cleanMethods.length > 0) {
            classBox += '│ Methods:\n';
            cleanMethods.forEach(method => {
                classBox += `│ ◉ ${method}()\n`;
            });
        }
        
        // Properties
        if (cls.properties.length > 0) {
            if (cleanMethods.length > 0) classBox += '│\n';
            classBox += '│ Properties:\n';
            cls.properties.forEach(prop => {
                classBox += `│ • ${prop}\n`;
            });
        }
        
        // Footer
        classBox += `└${'─'.repeat(boxWidth)}┘`;
        
        return classBox;
    }
    
    static getRelationSymbol(rel) {
        switch (rel.type) {
            case 'inheritance': return '▶│';
            case 'creation': return '◉│';
            case 'usage': return '──';
            case 'external': return '🌐';
            default: return '──';
        }
    }
}
