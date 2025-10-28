import { UMLGenerator } from './src/core/UMLGenerator.js';
import { PlantUMLVisualizer } from './src/visualizers/PlantUMLVisualizer.js';
import { ASCIIVisualizer } from './src/visualizers/ASCIIVisualizer.js';

// Mock Insight Suite packages for now
class MockPointJS {
    async identify(code) {
        return { type: 'Data Processing', confidence: 0.85 };
    }
}

class MockHunchJS {
    async detectAnomalies(code) {
        return [
            { type: 'Memory', message: 'Potential memory leak in cache' },
            { type: 'Validation', message: 'Missing input validation' }
        ];
    }
    
    async getIntuitionScore(code) {
        return 0.72;
    }
}

class MockIntuitionJS {
    async findPatterns(code) {
        return [
            { name: 'Repository Pattern', confidence: 0.9 },
            { name: 'Processor Pipeline', confidence: 0.8 }
        ];
    }
}

class MockInsight {
    async analyze(code) {
        return {
            complexity: 'medium',
            maintainability: 'high',
            testability: 'medium'
        };
    }
}

class SafeJS2UMLEngine {
    constructor(useMocks = true) {
        if (useMocks) {
            console.log('🔧 Using mocked Insight Suite packages');
            this.point = new MockPointJS();
            this.hunch = new MockHunchJS();
            this.intuition = new MockIntuitionJS();
            this.insight = new MockInsight();
        } else {
            // Try to load real packages
            try {
                import('../../packages/point.js/src/index.js').then(module => {
                    this.point = new module.default();
                });
            } catch (error) {
                console.log('⚠️  Using mock for PointJS');
                this.point = new MockPointJS();
            }
            // Similar for other packages...
        }
        
        this.umlGenerator = new UMLGenerator();
        this.visualizers = {
            plantuml: new PlantUMLVisualizer(),
            ascii: new ASCIIVisualizer()
        };
    }
    
    async analyzeCodebase(code, visualizationType = 'plantuml') {
        console.log('🎯 Safe JS2UML Analysis Started...\n');
        
        // Get insights (from mocks or real packages)
        const insights = await this.getInsightSuiteAnalysis(code);
        
        // Generate UML with insights
        const umlResult = await this.umlGenerator.generate({
            code,
            purposeAnalysis: insights.purpose,
            qualityAnalysis: insights.anomalies,
            patternAnalysis: insights.patterns,
            intuitionScore: insights.intuitionScore,
            architecturalInsights: insights.architecturalInsights
        });
        
        // Generate visualizations
        const visualizations = await this.generateVisualizations(
            umlResult.uml, 
            insights, 
            visualizationType
        );
        
        return {
            insights,
            uml: umlResult.uml,
            visualizations,
            classes: umlResult.classes,
            relationships: umlResult.relationships,
            recommendations: this.generateRecommendations(insights, umlResult)
        };
    }
    
    async getInsightSuiteAnalysis(code) {
        const [purpose, anomalies, patterns, intuitionScore, holisticAnalysis] = await Promise.all([
            this.point.identify(code),
            this.hunch.detectAnomalies(code),
            this.intuition.findPatterns(code),
            this.hunch.getIntuitionScore(code),
            this.insight.analyze(code)
        ]);
        
        return {
            purpose,
            anomalies,
            patterns,
            intuitionScore,
            holisticAnalysis,
            architecturalInsights: this.generateArchitecturalInsights(purpose, patterns, anomalies)
        };
    }
    
    async generateVisualizations(uml, insights, type = 'plantuml') {
        const result = {};
        
        result.plantuml = this.visualizers.plantuml.generateHTMLView(
            uml, 
            `Insight Suite Analysis - ${insights.purpose.type}`
        );
        
        result.ascii = this.visualizers.ascii.generateASCIIView(uml, insights);
        result.enhanced = this.generateEnhancedVisualization(uml, insights);
        
        return result;
    }
    
    generateEnhancedVisualization(uml, insights) {
        let enhancedUML = uml.replace('@startuml', `@startuml\n\n' === INSIGHT SUITE ANALYSIS ===\n`);
        enhancedUML += `' PURPOSE: ${insights.purpose.type}\n`;
        enhancedUML += `' CONFIDENCE: ${insights.purpose.confidence}\n`;
        enhancedUML += `' INTUITION SCORE: ${insights.intuitionScore}\n\n`;
        
        if (insights.anomalies.length > 0) {
            enhancedUML += `' 🚨 DETECTED ANOMALIES:\n`;
            insights.anomalies.forEach(anomaly => {
                enhancedUML += `' • ${anomaly.type}: ${anomaly.message}\n`;
            });
        }
        
        if (insights.patterns.length > 0) {
            enhancedUML += `\n' 🎯 ARCHITECTURE PATTERNS:\n`;
            insights.patterns.forEach(pattern => {
                enhancedUML += `' • ${pattern.name} (${pattern.confidence}%)\n`;
            });
        }
        
        return enhancedUML;
    }
    
    generateArchitecturalInsights(purpose, patterns, anomalies, holisticAnalysis) {
        return [
            `Primary purpose: ${purpose.type}`,
            `Detected patterns: ${patterns.length}`,
            `Anomalies found: ${anomalies.length}`
        ];
    }
    
    generateRecommendations(insights, umlResult) {
        const recommendations = [];
        
        if (insights.anomalies.length > 0) {
            recommendations.push('Address the detected anomalies before further development');
        }
        
        if (insights.intuitionScore < 0.8) {
            recommendations.push('Consider refactoring to improve intuition score');
        }
        
        return recommendations;
    }
}

// Test code
const testCode = `
class DataProcessor {
    constructor() {
        this.cache = new Map();
    }
    
    process(data) {
        return data.map(item => this.transform(item));
    }
    
    transform(item) {
        return { ...item, processed: true };
    }
}
`;

async function runSafeTest() {
    console.log('🚀 Safe JS2UML Integration Test\n');
    
    const engine = new SafeJS2UMLEngine(true); // Use mocks for now
    
    try {
        const result = await engine.analyzeCodebase(testCode);
        
        console.log('📊 ANALYSIS RESULTS:');
        console.log('='.repeat(50));
        console.log('Purpose:', result.insights.purpose.type);
        console.log('Intuition Score:', result.insights.intuitionScore);
        console.log('Patterns:', result.insights.patterns.length);
        console.log('Anomalies:', result.insights.anomalies.length);
        
        console.log('\n📋 ASCII PREVIEW:');
        console.log('='.repeat(50));
        console.log(result.visualizations.ascii);
        
        // Save outputs
        const fs = await import('fs');
        fs.mkdirSync('./outputs', { recursive: true });
        fs.writeFileSync('./outputs/safe-analysis.html', result.visualizations.plantuml);
        fs.writeFileSync('./outputs/safe-analysis.txt', result.visualizations.ascii);
        
        console.log('💾 Saved: outputs/safe-analysis.html & .txt');
        
    } catch (error) {
        console.log('💥 Test error:', error.message);
    }
}

export default SafeJS2UMLEngine;
runSafeTest();
