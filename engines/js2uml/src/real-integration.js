// For development: use direct imports
// For production: use @insight-suite/ packages once workspace is properly configured
// import PointJS from '../../../packages/point.js/src/index.js';
// import HunchJS from '../../../packages/hunch.js/src/index.js';
// import IntuitionJS from '../../../packages/intuition.js/src/index.js';
// import Insight from '../../../packages/insight.js/src/index.js';

import PointJS from '@insight-suite/point.js';
import HunchJS from '@insight-suite/hunch.js';
import IntuitionJS from '@insight-suite/intuition.js';
import Insight from '@insight-suite/insight.js';

export class RealInsightSuiteIntegration {
    constructor() {
        this.point = new PointJS();
        this.hunch = new HunchJS();
        this.intuition = new IntuitionJS();
        this.insight = new Insight();
    }
    
    async analyzeCode(code) {
        console.log('🎯 Running REAL Insight Suite Analysis...\n');
        
        const [purpose, anomalies, patterns, holistic, intuitionScore] = await Promise.all([
            this.analyzePurpose(code),
            this.analyzeAnomalies(code),
            this.analyzePatterns(code),
            this.analyzeHolistic(code),
            this.getIntuitionScore(code)
        ]);
        
        return {
            purpose,
            anomalies,
            patterns,
            holistic,
            intuitionScore
        };
    }
    
    async analyzePurpose(code) {
        try {
            const result = await this.point.identify(code);
            return {
                type: result.primaryPurpose?.purpose || 'unknown',
                description: result.primaryPurpose?.description || 'No description',
                confidence: result.confidence || 0,
                fullAnalysis: result
            };
        } catch (error) {
            console.log('❌ PointJS analysis failed:', error.message);
            return { type: 'unknown', confidence: 0, description: 'Analysis failed' };
        }
    }
    
    async analyzeAnomalies(code) {
        try {
            return await this.hunch.detectAnomalies(code);
        } catch (error) {
            console.log('❌ HunchJS analysis failed:', error.message);
            return [];
        }
    }
    
    async analyzePatterns(code) {
        try {
            return await this.intuition.learnPatterns(code);
        } catch (error) {
            console.log('❌ IntuitionJS analysis failed:', error.message);
            return [];
        }
    }
    
    async analyzeHolistic(code) {
        try {
            return await this.insight.analyze(code);
        } catch (error) {
            console.log('❌ Insight.js analysis failed:', error.message);
            return {};
        }
    }
    
    async getIntuitionScore(code) {
        try {
            return await this.hunch.getIntuitionScore(code);
        } catch (error) {
            console.log('❌ Intuition score failed:', error.message);
            return 0.5;
        }
    }
}
