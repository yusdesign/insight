export class RecommendationEngine {
    generateArchitectureRecommendations(insights, umlResult) {
        const recommendations = [];
        
        // Purpose-based recommendations
        if (insights.purpose.confidence < 0.6) {
            recommendations.push({
                type: 'purpose',
                priority: 'high',
                message: 'Code purpose is unclear - improve documentation and naming',
                suggestion: 'Add JSDoc comments and use more descriptive class/method names'
            });
        }
        
        // Anomaly-based recommendations
        insights.anomalies.forEach(anomaly => {
            recommendations.push({
                type: 'anomaly',
                priority: anomaly.type === 'Memory' ? 'high' : 'medium',
                message: anomaly.message,
                suggestion: this.getAnomalySuggestion(anomaly.type)
            });
        });
        
        // Pattern-based recommendations
        if (insights.patterns.length === 0) {
            recommendations.push({
                type: 'pattern',
                priority: 'low',
                message: 'No clear architecture patterns detected',
                suggestion: 'Consider implementing established patterns like Repository, Factory, or Strategy'
            });
        }
        
        // Relationship-based recommendations
        if (umlResult.relationships.length === 0) {
            recommendations.push({
                type: 'coupling',
                priority: 'medium',
                message: 'Code appears isolated with no dependencies',
                suggestion: 'Consider breaking into smaller, focused modules with clear interfaces'
            });
        }
        
        // Intuition score recommendations
        if (insights.intuitionScore < 0.7) {
            recommendations.push({
                type: 'quality',
                priority: 'medium',
                message: 'Code intuition score could be improved',
                suggestion: 'Refactor for better readability and maintainability'
            });
        }
        
        return recommendations.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }
    
    getAnomalySuggestion(anomalyType) {
        const suggestions = {
            'Memory': 'Implement proper resource cleanup and consider using weak references',
            'Validation': 'Add input validation and error handling',
            'Performance': 'Optimize algorithms and consider caching strategies',
            'Security': 'Implement security best practices and input sanitization'
        };
        
        return suggestions[anomalyType] || 'Review and address the identified issue';
    }
}
