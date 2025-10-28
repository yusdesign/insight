export class JS2UMLParser {
    constructor() {
        this.classes = [];
        this.relationships = [];
    }

    parseCode(code) {
        this.classes = this.extractClasses(code);
        this.relationships = this.findRelationships(this.classes);
        return this;
    }

    extractClasses(code) {
        const classes = [];
        
        // Match class declarations
        const classRegex = /class\s+(\w+)(?:\s+extends\s+(\w+))?\s*\{([\s\S]*?)\}/g;
        let match;
        
        while ((match = classRegex.exec(code)) !== null) {
            const [_, className, extendsClass, classBody] = match;
            
            const methods = this.extractMethods(classBody);
            const properties = this.extractProperties(classBody);
            
            classes.push({
                name: className,
                extends: extendsClass || null,
                methods,
                properties,
                visibility: 'public' // Default
            });
        }
        
        return classes;
    }

    extractMethods(classBody) {
        const methods = [];
        const methodRegex = /(?:async\s+)?(\w+)\s*\([^)]*\)\s*\{[^}]*\}/g;
        let match;
        
        while ((match = methodRegex.exec(classBody)) !== null) {
            methods.push({
                name: match[1],
                isAsync: match[0].includes('async'),
                visibility: this.detectVisibility(match[0])
            });
        }
        
        // Also get method signatures without bodies
        const methodSigRegex = /(?:async\s+)?(\w+)\s*\([^)]*\)(?:\s*:\s*\w+)?\s*(?=\{|;)/g;
        while ((match = methodSigRegex.exec(classBody)) !== null) {
            if (!methods.some(m => m.name === match[1])) {
                methods.push({
                    name: match[1],
                    isAsync: match[0].includes('async'),
                    visibility: this.detectVisibility(match[0])
                });
            }
        }
        
        return methods;
    }

    extractProperties(classBody) {
        const properties = [];
        const propRegex = /(?:this\.)?(\w+)\s*=\s*[^;]+;|(?:const|let|var)\s+(\w+)\s*[=;]|(?:#|\/\/\s*[+-])\s*(\w+)/g;
        let match;
        
        while ((match = propRegex.exec(classBody)) !== null) {
            const propName = match[1] || match[2] || match[3];
            if (propName && !['function', 'class', 'if', 'for', 'while'].includes(propName)) {
                properties.push({
                    name: propName,
                    visibility: this.detectVisibility(match[0])
                });
            }
        }
        
        return properties;
    }

    detectVisibility(codeSnippet) {
        if (codeSnippet.includes('#') || codeSnippet.trim().startsWith('#')) {
            return 'private';
        } else if (codeSnippet.includes('_') && codeSnippet.split('_')[0] === '') {
            return 'protected';
        }
        return 'public';
    }

    findRelationships(classes) {
        const relationships = [];
        
        // Inheritance relationships
        classes.forEach(cls => {
            if (cls.extends) {
                relationships.push({
                    from: cls.name,
                    to: cls.extends,
                    type: 'inheritance',
                    label: 'extends'
                });
            }
        });
        
        // Composition relationships (based on property types)
        classes.forEach(cls => {
            cls.properties.forEach(prop => {
                const targetClass = classes.find(c => 
                    prop.name.toLowerCase().includes(c.name.toLowerCase()) ||
                    prop.type === c.name
                );
                if (targetClass && targetClass.name !== cls.name) {
                    relationships.push({
                        from: cls.name,
                        to: targetClass.name,
                        type: 'composition',
                        label: 'uses'
                    });
                }
            });
        });
        
        return relationships;
    }
}
