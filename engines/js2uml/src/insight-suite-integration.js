import PointJS from '../../../packages/point.js/src/index.js';
import HunchJS from '../../../packages/hunch.js/src/index.js';
import IntuitionJS from '../../../packages/intuition.js/src/index.js';
import Insight from '../../../packages/insight.js/src/index.js';

export class InsightSuiteIntegration {
    constructor() {
        this.point = new PointJS();
        // Initialize others once we know their structure
        this.hunch = new HunchJS();
        this.intuition = new IntuitionJS();
        this.insight = new Insight();
    }
    
    async analyzeCode(code) {
        console.log('🎯 Running Full Insight Suite Analysis...\n');
        
        const analyses = await Promise.allSettled([
            this.analyzePurpose(code),
            this.analyzeAnomalies(code),
            this.analyzePatterns(code),
            this.analyzeHolistic(code)
        ]);
        
        return {
            purpose: analyses[0].status === 'fulfilled' ? analyses[0].value : { type: 'unknown', confidence: 0 },
            anomalies: analyses[1].status === 'fulfilled' ? analyses[1].value : [],
            patterns: analyses[2].status === 'fulfilled' ? analyses[2].value : [],
            holistic: analyses[3].status === 'fulfilled' ? analyses[3].value : {},
            intuitionScore: analyses[1].status === 'fulfilled' ? await this.getIntuitionScore(code) : 0.5
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
            // Adjust based on actual HunchJS API
            return await this.hunch.detectAnomalies(code);
        } catch (error) {
            console.log('❌ HunchJS analysis failed:', error.message);
            return [];
        }
    }
    
    async analyzePatterns(code) {
        try {
            // Adjust based on actual IntuitionJS API
            return await this.intuition.findPatterns(code);
        } catch (error) {
            console.log('❌ IntuitionJS analysis failed:', error.message);
            return [];
        }
    }
    
    async analyzeHolistic(code) {
        try {
            // Adjust based on actual Insight.js API
            return await this.insight.analyze(code);
        } catch (error) {
            console.log('❌ Insight.js analysis failed:', error.message);
            return {};
        }
    }
    
    async getIntuitionScore(code) {
        try {
            // Adjust based on actual HunchJS API
            return await this.hunch.getIntuitionScore(code);
        } catch (error) {
            console.log('❌ Intuition score failed:', error.message);
            return 0.5;
        }
    }
}
