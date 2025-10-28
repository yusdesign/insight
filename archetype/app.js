// Insight Suite Playground Application
class InsightSuitePlayground {
    constructor() {
        this.stages = ['point', 'hunch', 'intuition', 'insight', 'archetype'];
        this.resetProgress();
        this.setupEventListeners();
        this.loadExamples();
        this.initializeMermaid11();
        this.showWelcomeFlow();
    }

    initializeMermaid11() {
        // Mermaid 11 specific initialization
        if (window.mermaid) {
            const config = {
                startOnLoad: true,
                theme: 'default',
                securityLevel: 'loose',
                flowchart: {
                    useMaxWidth: false,
                    htmlLabels: true,
                    curve: 'basis'
                },
                er: { useMaxWidth: false },
                sequence: { useMaxWidth: false },
                journey: { useMaxWidth: false }
            };
        
            mermaid.initialize(config);
            console.log('🎯 Mermaid 11.12.0 initialized with Insight Suite config');
        } else {
            console.warn('⚠️ Mermaid 11 not loaded - check CDN or network');
        }
    }

    showWelcomeFlow() {
        const welcomeFlow = `
    flowchart TD
        A[Welcome to Insight Suite!] --> B[Select an Example]
        B --> C[Or Write Your Own Code]
        C --> D[Click "Analyze Code"]
        D --> E[Watch the Magic Happen!]
    
        style A fill:#e1f5fe
        style E fill:#c8e6c9
        `;
    
        const mermaidContainer = document.getElementById('mermaidChart');
        mermaidContainer.innerHTML = `<div class="mermaid">${welcomeFlow}</div>`;
    
        // Render the welcome flow
        this.renderMermaid(mermaidContainer);
    }

    renderMermaid(container) {
        if (window.mermaid) {
            const mermaidDiv = container.querySelector('.mermaid');
            if (mermaidDiv) {
                try {
                    mermaid.run({
                        nodes: [mermaidDiv],
                        suppressErrors: true
                    }).catch(error => {
                        console.log('Mermaid render note:', error);
                    });
                } catch (error) {
                    console.log('Mermaid execution note:', error);
                }
            }
        }
    }

    resetProgress() {
        this.stages.forEach(stage => {
            this.updateStageProgress(stage, 0);
        });
        document.getElementById('overallConfidence').textContent = '0%';
    }

    setupEventListeners() {
        // Example selector
        document.getElementById('exampleSelector').addEventListener('change', (e) => {
            this.loadExample(e.target.value);
        });

        // Analysis type change
        document.getElementById('analysisType').addEventListener('change', () => {
            this.resetProgress();
        });
    }

    loadExamples() {
        this.examples = {
            builder: `
class UserBuilder {
    constructor() {
        this.user = {};
    }
    
    withName(name) {
        this.user.name = name;
        return this;
    }
    
    withEmail(email) {
        this.user.email = email;
        return this;
    }
    
    withAge(age) {
        this.user.age = age;
        return this;
    }
    
    build() {
        return this.user;
    }
}

// Usage
const user = new UserBuilder()
    .withName('John Doe')
    .withEmail('john@example.com')
    .withAge(30)
    .build();
            `,
            factory: `
class NotificationFactory {
    static createNotification(type) {
        switch(type) {
            case 'email':
                return new EmailNotification();
            case 'sms':
                return new SMSNotification();
            case 'push':
                return new PushNotification();
            default:
                throw new Error('Unknown notification type');
        }
    }
}

class EmailNotification {
    send(message) {
        console.log(\`Sending email: \${message}\`);
    }
}

class SMSNotification {
    send(message) {
        console.log(\`Sending SMS: \${message}\`);
    }
}
            `,
            async: `
class DataService {
    constructor() {
        this.cache = new Map();
    }
    
    async fetchUser(userId) {
        // Check cache first
        if (this.cache.has(userId)) {
            return this.cache.get(userId);
        }
        
        // Fetch from API
        try {
            const response = await fetch(\`/api/users/\${userId}\`);
            const userData = await response.json();
            
            // Cache the result
            this.cache.set(userId, userData);
            
            return userData;
        } catch (error) {
            console.error('Failed to fetch user:', error);
            throw new Error('User not found');
        }
    }
    
    async updateUser(userId, updates) {
        const response = await fetch(\`/api/users/\${userId}\`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        
        // Invalidate cache
        this.cache.delete(userId);
        
        return await response.json();
    }
}
            `,
            repository: `
class UserRepository {
    constructor(database) {
        this.database = database;
        this.users = new Map();
    }
    
    async findById(id) {
        if (this.users.has(id)) {
            return this.users.get(id);
        }
        
        const user = await this.database.query('SELECT * FROM users WHERE id = ?', [id]);
        if (user) {
            this.users.set(id, user);
        }
        return user;
    }
    
    async save(user) {
        if (user.id) {
            await this.database.query(
                'UPDATE users SET name = ?, email = ? WHERE id = ?',
                [user.name, user.email, user.id]
            );
        } else {
            const result = await this.database.query(
                'INSERT INTO users (name, email) VALUES (?, ?)',
                [user.name, user.email]
            );
            user.id = result.insertId;
        }
        
        this.users.set(user.id, user);
        return user;
    }
    
    async delete(id) {
        await this.database.query('DELETE FROM users WHERE id = ?', [id]);
        this.users.delete(id);
    }
    
    async findAll() {
        return await this.database.query('SELECT * FROM users');
    }
}
            `
        };
    }

    loadExample(exampleKey) {
        if (this.examples[exampleKey]) {
            document.getElementById('codeInput').value = this.examples[exampleKey];
            this.resetProgress();
        }
    }

    updateStageProgress(stage, confidence) {
        const stageElement = document.querySelector(`.stage[data-stage="${stage}"]`);
        const confidenceElement = stageElement.querySelector('.stage-confidence');
        const fillElement = stageElement.querySelector('.confidence-fill') || this.createConfidenceBar(stageElement);
        
        const percent = Math.round(confidence * 100);
        confidenceElement.textContent = `${percent}%`;
        fillElement.style.width = `${percent}%`;
        
        // Add active class for animation
        if (confidence > 0) {
            stageElement.classList.add('active');
            setTimeout(() => stageElement.classList.remove('active'), 500);
        }
    }

    createConfidenceBar(stageElement) {
        const bar = document.createElement('div');
        bar.className = 'confidence-bar';
        const fill = document.createElement('div');
        fill.className = 'confidence-fill';
        bar.appendChild(fill);
        stageElement.appendChild(bar);
        return fill;
    }

    async analyzeCode() {
        const code = document.getElementById('codeInput').value.trim();
        const analysisType = document.getElementById('analysisType').value;
        
        if (!code) {
            alert('Please enter some code to analyze!');
            return;
        }

        this.resetProgress();
        this.showLoading();

        try {
            // Simulate progressive analysis (replace with actual Insight Suite calls)
            const results = await this.simulateAnalysis(code, analysisType);
            this.displayResults(results);
            this.updateOverallConfidence(results);
            this.generateMermaidFlow(results);
        } catch (error) {
            this.displayError(error);
        }
    }

    async simulateAnalysis(code, analysisType) {
        const results = {};
        
        // Simulate PointJS analysis
        if (analysisType === 'full' || analysisType === 'point') {
            await this.delay(800);
            results.point = {
                primaryPurpose: { 
                    purpose: this.detectPurpose(code),
                    description: this.getPurposeDescription(code),
                    confidence: Math.random() * 0.3 + 0.6 // 0.6-0.9
                },
                confidence: Math.random() * 0.3 + 0.6
            };
            this.updateStageProgress('point', results.point.confidence);
        }

        // Simulate HunchJS analysis
        if (analysisType === 'full' || analysisType === 'hunch') {
            await this.delay(600);
            results.hunch = {
                intuitionScore: Math.random() * 0.4 + 0.5, // 0.5-0.9
                confidence: Math.random() * 0.3 + 0.6
            };
            this.updateStageProgress('hunch', results.hunch.intuitionScore);
        }

        // Simulate IntuitionJS analysis
        if (analysisType === 'full' || analysisType === 'intuition') {
            await this.delay(700);
            results.intuition = {
                prediction: this.predictPattern(code),
                confidence: Math.random() * 0.3 + 0.6,
                suggestions: this.generateSuggestions(code)
            };
            this.updateStageProgress('intuition', results.intuition.confidence);
        }

        // Simulate InsightJS analysis
        if (analysisType === 'full' || analysisType === 'insight') {
            await this.delay(900);
            results.insight = {
                summary: {
                    status: this.getCodeStatus(code),
                    totalFindings: Math.floor(Math.random() * 5) + 1,
                    criticalIssues: Math.floor(Math.random() * 2)
                },
                confidence: Math.random() * 0.3 + 0.6
            };
            this.updateStageProgress('insight', results.insight.confidence);
        }

        // Simulate Archetype analysis
        if (analysisType === 'full' || analysisType === 'archetype') {
            await this.delay(500);
            results.archetype = {
                matches: this.detectArchetypes(code),
                confidence: Math.random() * 0.3 + 0.6
            };
            this.updateStageProgress('archetype', results.archetype.confidence);
        }

        return results;
    }

    detectPurpose(code) {
        if (code.includes('class') && code.includes('build()') && code.includes('return this')) {
            return 'object_construction';
        } else if (code.includes('async') && code.includes('await') && code.includes('fetch')) {
            return 'data_retrieval';
        } else if (code.includes('static') && code.includes('create')) {
            return 'object_creation';
        } else if (code.includes('class') && code.includes('Repository')) {
            return 'data_access';
        } else {
            return 'general_computation';
        }
    }

    getPurposeDescription(purpose) {
        const descriptions = {
            'object_construction': 'Builds complex objects using fluent interface',
            'data_retrieval': 'Fetches and processes data asynchronously',
            'object_creation': 'Creates objects based on type or configuration',
            'data_access': 'Manages data storage and retrieval operations',
            'general_computation': 'Performs computational tasks'
        };
        return descriptions[purpose] || 'Performs various programming tasks';
    }

    predictPattern(code) {
        if (code.includes('return this') && code.includes('build()')) {
            return 'Builder Pattern';
        } else if (code.includes('static create') || code.includes('switch')) {
            return 'Factory Pattern';
        } else if (code.includes('async') && code.includes('cache')) {
            return 'Cached Data Service';
        } else if (code.includes('Repository') && code.includes('find') && code.includes('save')) {
            return 'Repository Pattern';
        } else {
            return 'Custom Implementation';
        }
    }

    generateSuggestions(code) {
        const suggestions = [];
        
        if (code.includes('async') && !code.includes('try') && !code.includes('catch')) {
            suggestions.push('Consider adding error handling for async operations');
        }
        
        if (code.includes('class') && code.split('class').length > 2) {
            suggestions.push('Multiple classes detected - consider separation of concerns');
        }
        
        if (code.includes('new ') && code.includes('class')) {
            suggestions.push('Using both classes and direct instantiation - consider consistency');
        }
        
        return suggestions.slice(0, 2); // Limit to 2 suggestions
    }

    getCodeStatus(code) {
        const lines = code.split('\n').length;
        if (lines > 50) return 'needs_attention';
        if (lines > 30) return 'satisfactory';
        return 'good';
    }

    detectArchetypes(code) {
        const archetypes = [];
        
        if (code.includes('return this') && code.includes('build()')) {
            archetypes.push({ pattern: 'BuilderPattern', confidence: 0.8 });
        }
        
        if (code.includes('static create') || (code.includes('new ') && code.includes('switch'))) {
            archetypes.push({ pattern: 'FactoryPattern', confidence: 0.7 });
        }
        
        if (code.includes('async') && code.includes('cache')) {
            archetypes.push({ pattern: 'CachedService', confidence: 0.6 });
        }
        
        if (code.includes('Repository') && code.includes('find') && code.includes('save')) {
            archetypes.push({ pattern: 'RepositoryPattern', confidence: 0.9 });
        }
        
        return archetypes.length > 0 ? archetypes : [{ pattern: 'CustomPattern', confidence: 0.4 }];
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('results');
        let html = '';

        if (results.point) {
            html += this.createResultCard('🎯 PointJS Analysis', results.point, `
                <p><strong>Primary Purpose:</strong> ${results.point.primaryPurpose.purpose}</p>
                <p><strong>Description:</strong> ${results.point.primaryPurpose.description}</p>
            `);
        }

        if (results.hunch) {
            html += this.createResultCard('🤔 HunchJS Analysis', results.hunch, `
                <p><strong>Intuition Score:</strong> ${(results.hunch.intuitionScore * 100).toFixed(1)}%</p>
                <p><strong>Interpretation:</strong> ${this.interpretIntuitionScore(results.hunch.intuitionScore)}</p>
            `);
        }

        if (results.intuition) {
            html += this.createResultCard('🔗 IntuitionJS Analysis', results.intuition, `
                <p><strong>Pattern Prediction:</strong> ${results.intuition.prediction}</p>
                ${results.intuition.suggestions.length > 0 ? `
                    <p><strong>Suggestions:</strong></p>
                    <ul>${results.intuition.suggestions.map(s => `<li>${s}</li>`).join('')}</ul>
                ` : ''}
            `);
        }

        if (results.insight) {
            html += this.createResultCard('🌌 InsightJS Analysis', results.insight, `
                <p><strong>Status:</strong> ${results.insight.summary.status}</p>
                <p><strong>Findings:</strong> ${results.insight.summary.totalFindings} total, ${results.insight.summary.criticalIssues} critical</p>
            `);
        }

        if (results.archetype) {
            const archetypes = results.archetype.matches.map(m => 
                `${m.pattern} (${(m.confidence * 100).toFixed(1)}%)`
            ).join(', ');
            
            html += this.createResultCard('🔍 Archetype Discovery', results.archetype, `
                <p><strong>Detected Patterns:</strong> ${archetypes}</p>
            `);
        }

        resultsContainer.innerHTML = html;
    }

    createResultCard(title, data, content) {
        const confidencePercent = Math.round((data.confidence || data.intuitionScore || 0) * 100);
        return `
            <div class="result-card">
                <h4>${title}</h4>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${confidencePercent}%"></div>
                </div>
                <p><strong>Confidence:</strong> ${confidencePercent}%</p>
                ${content}
            </div>
        `;
    }

    interpretIntuitionScore(score) {
        if (score >= 0.8) return 'Strong patterns detected - high confidence';
        if (score >= 0.6) return 'Good pattern recognition - medium confidence';
        if (score >= 0.4) return 'Some patterns detected - low confidence';
        return 'Limited pattern recognition - needs more data';
    }

    updateOverallConfidence(results) {
        const confidences = Object.values(results).map(r => r.confidence || r.intuitionScore || 0);
        const overall = confidences.length > 0 ? 
            confidences.reduce((a, b) => a + b, 0) / confidences.length : 0;
        
        document.getElementById('overallConfidence').textContent = 
            `${Math.round(overall * 100)}%`;
    }

    generateMermaidFlow(results) {
        // If no results (empty analysis), show welcome flow
        if (!results || Object.keys(results).length === 0) {
            this.showWelcomeFlow();
            return;
        }

        const purpose = results.point?.primaryPurpose.purpose || 'unknown';
        const intuition = results.hunch?.intuitionScore ? (results.hunch.intuitionScore * 100).toFixed(1) + '%' : 'N/A';
        const prediction = results.intuition?.prediction || 'unknown';
        const status = results.insight?.summary.status || 'unknown';
        const archetype = results.archetype?.matches[0]?.pattern || 'No pattern';
    
        const mermaidCode = `
    flowchart TD
        A[Code Input] --> B[🎯 PointJS]
        B --> C[Purpose: ${purpose}]
        C --> D[🤔 HunchJS]
        D --> E[Intuition: ${intuition}]
        E --> F[🔗 IntuitionJS]
        F --> G[Prediction: ${prediction}]
        G --> H[🌌 InsightJS]
        H --> I[Status: ${status}]
        I --> J[🔍 Archetype Discovery]
        J --> K[${archetype}]
    
        style A fill:#e1f5fe
        style K fill:#c8e6c9
        `;

        const mermaidContainer = document.getElementById('mermaidChart');
        mermaidContainer.innerHTML = `<div class="mermaid">${mermaidCode}</div>`;
    
        this.renderMermaid(mermaidContainer);
    }

    showMermaidFallback(container, mermaidCode) {
        container.innerHTML = `
            <div class="mermaid-fallback">
                <h4>📊 Analysis Flow (Text View)</h4>
                <pre>${mermaidCode}</pre>
                <p><small>Mermaid diagram not available - showing text representation</small></p>
            </div>
        `;
    }

    showLoading() {
        document.getElementById('results').innerHTML = `
            <div class="welcome-message">
                <h4>🔍 Analyzing Code...</h4>
                <p>Progressing through Insight Suite pipeline</p>
                <div style="margin: 20px auto; width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            </div>
        `;
    }

    displayError(error) {
        document.getElementById('results').innerHTML = `
            <div class="result-card" style="border-left: 4px solid #e74c3c;">
                <h4>❌ Analysis Error</h4>
                <p>${error.message || 'An unexpected error occurred during analysis.'}</p>
                <p>Please try again with different code.</p>
            </div>
        `;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the playground
const playground = new InsightSuitePlayground();

// Global function for the analyze button
function analyzeCode() {
    playground.analyzeCode();
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
