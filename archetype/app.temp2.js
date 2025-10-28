// archetype/app.js - Updated for Single Window View with GitHub Dark Theme
class InsightPlayground {
    constructor() {
        this.currentStage = 'point';
        this.examples = this.loadExamples();
        this.initializeApp();
        this.loadExample('welcome');
    }

    initializeApp() {
        this.setupEventListeners();
        this.renderExampleSelector();
        this.initializeMermaid();
    }

    loadExamples() {
        return {
            'welcome': {
                name: 'Welcome Guide',
                code: `// Welcome to Insight Suite Archetype Playground!
// This tool helps you analyze code through different cognitive stages:

// POINT → Identify key code elements and patterns
// HUNCH → Form initial hypotheses about code behavior  
// INTUITION → Develop deeper understanding of relationships
// INSIGHT → Gain comprehensive architectural understanding

// Select an example from the dropdown or paste your own code to begin!`,
                category: 'guides'
            },
            'basic': {
                'hello-world': {
                    name: 'Hello World',
                    code: `function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Developer"));`,
                    category: 'basic'
                },
                'calculator': {
                    name: 'Simple Calculator',
                    code: `class Calculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) { 
        if (b === 0) throw new Error("Cannot divide by zero");
        return a / b; 
    }
}

const calc = new Calculator();
console.log(calc.add(5, 3));`,
                    category: 'basic'
                }
            },
            'advanced': {
                'promise-chain': {
                    name: 'Promise Chain',
                    code: `function fetchUserData(userId) {
    return fetch(\`/api/users/\${userId}\`)
        .then(response => {
            if (!response.ok) throw new Error('User not found');
            return response.json();
        })
        .then(user => {
            return fetch(\`/api/profile/\${user.profileId}\`);
        })
        .then(profileResponse => profileResponse.json())
        .then(profile => {
            return { user: user, profile: profile };
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}`,
                    category: 'advanced'
                }
            },
            'real-world': {
                'react-component': {
                    name: 'React Component',
                    code: `import React, { useState, useEffect } from 'react';

function UserDashboard({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser(userId).then(setUser).finally(() => setLoading(false));
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    
    return (
        <div className="dashboard">
            <h1>Welcome, {user.name}</h1>
            <UserProfile user={user} />
        </div>
    );
}`,
                    category: 'real-world'
                },
                'express-server': {
                    name: 'Express Server',
                    code: `const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});`,
                    category: 'real-world'
                }
            },
            'packages': {
                'point-example': {
                    name: 'Point.js Example',
                    code: `// Point.js code pattern detection
const { PointAnalyzer } = require('@insight-suite/point.js');

const analyzer = new PointAnalyzer();
const patterns = analyzer.analyze(code);

// Detects: Functions, Classes, Variables, Imports, etc.
console.log(patterns);`,
                    category: 'packages'
                }
            }
        };
    }

    renderExampleSelector() {
        const selector = document.getElementById('exampleSelector');
        selector.innerHTML = '';

        // Welcome option
        const welcomeOption = document.createElement('option');
        welcomeOption.value = 'welcome';
        welcomeOption.textContent = '📚 Welcome Guide';
        selector.appendChild(welcomeOption);

        // Basic examples
        const basicGroup = document.createElement('optgroup');
        basicGroup.label = '🟢 Basic Examples';
        Object.entries(this.examples.basic).forEach(([key, example]) => {
            const option = document.createElement('option');
            option.value = `basic.${key}`;
            option.textContent = example.name;
            basicGroup.appendChild(option);
        });
        selector.appendChild(basicGroup);

        // Advanced examples
        const advancedGroup = document.createElement('optgroup');
        advancedGroup.label = '🟡 Advanced Examples';
        Object.entries(this.examples.advanced).forEach(([key, example]) => {
            const option = document.createElement('option');
            option.value = `advanced.${key}`;
            option.textContent = example.name;
            advancedGroup.appendChild(option);
        });
        selector.appendChild(advancedGroup);

        // Real-world examples
        const realWorldGroup = document.createElement('optgroup');
        realWorldGroup.label = '🔴 Real World Examples';
        Object.entries(this.examples['real-world']).forEach(([key, example]) => {
            const option = document.createElement('option');
            option.value = `real-world.${key}`;
            option.textContent = example.name;
            realWorldGroup.appendChild(option);
        });
        selector.appendChild(realWorldGroup);

        // Package examples
        const packageGroup = document.createElement('optgroup');
        packageGroup.label = '📦 Package Examples';
        Object.entries(this.examples.packages).forEach(([key, example]) => {
            const option = document.createElement('option');
            option.value = `packages.${key}`;
            option.textContent = example.name;
            packageGroup.appendChild(option);
        });
        selector.appendChild(packageGroup);
    }

    setupEventListeners() {
        document.getElementById('exampleSelector').addEventListener('change', (e) => {
            this.loadExample(e.target.value);
        });

        document.getElementById('analyzeBtn').addEventListener('click', () => {
            this.analyzeCode();
        });

        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                this.analyzeCode();
            }
        });
    }

    loadExample(examplePath) {
        let code = '';
        let name = 'Custom Code';

        if (examplePath === 'welcome') {
            code = this.examples.welcome.code;
            name = this.examples.welcome.name;
        } else if (examplePath.includes('.')) {
            const [category, key] = examplePath.split('.');
            if (this.examples[category] && this.examples[category][key]) {
                code = this.examples[category][key].code;
                name = this.examples[category][key].name;
            }
        }

        document.getElementById('codeInput').value = code;
        this.updateProgressionTracker('point');
        this.showWelcomeMessage(name);
    }

    showWelcomeMessage(exampleName) {
        const results = document.getElementById('results');
        results.innerHTML = `
            <div class="welcome-message">
                <h4>🧠 ${exampleName}</h4>
                <p>Click "Analyze Code" or press Ctrl+Enter to begin analysis</p>
                <div class="progression-mini">
                    ${this.renderMiniProgression()}
                </div>
            </div>
        `;
    }

    renderMiniProgression() {
        const stages = [
            { id: 'point', emoji: '📍', name: 'Point', desc: 'Identify key elements' },
            { id: 'hunch', emoji: '💡', name: 'Hunch', desc: 'Form hypotheses' },
            { id: 'intuition', emoji: '🎯', name: 'Intuition', desc: 'Understand relationships' },
            { id: 'insight', emoji: '🧩', name: 'Insight', desc: 'Architectural understanding' }
        ];

        return stages.map(stage => `
            <div class="stage-mini ${this.currentStage === stage.id ? 'active' : ''}" 
                 data-stage="${stage.id}">
                <span class="stage-emoji-mini">${stage.emoji}</span>
                <div class="stage-info-mini">
                    <div class="stage-name-mini">${stage.name}</div>
                    <div class="stage-desc-mini">${stage.desc}</div>
                </div>
            </div>
        `).join('');
    }

    updateProgressionTracker(stage) {
        this.currentStage = stage;
        
        // Update main progression tracker
        document.querySelectorAll('.stage').forEach(stageEl => {
            stageEl.classList.remove('active');
        });
        document.querySelector(`.stage.${stage}`).classList.add('active');

        // Update mini progression in results
        const miniProgression = document.querySelector('.progression-mini');
        if (miniProgression) {
            miniProgression.innerHTML = this.renderMiniProgression();
        }
    }

    async analyzeCode() {
        const code = document.getElementById('codeInput').value;
        if (!code.trim()) return;

        // Simulate analysis progression
        const stages = ['point', 'hunch', 'intuition', 'insight'];
        
        for (const stage of stages) {
            this.updateProgressionTracker(stage);
            await this.delay(800); // Simulate processing time
            
            const results = this.generateStageResults(stage, code);
            this.displayResults(stage, results);
            
            if (stage === 'insight') {
                await this.generateMermaidChart(code);
            }
        }
    }

    generateStageResults(stage, code) {
        const results = {
            point: {
                elements: this.analyzeCodeElements(code),
                patterns: this.detectPatterns(code)
            },
            hunch: {
                hypotheses: this.generateHypotheses(code),
                relationships: this.identifyRelationships(code)
            },
            intuition: {
                architecture: this.analyzeArchitecture(code),
                flow: this.analyzeDataFlow(code)
            },
            insight: {
                summary: this.generateInsightSummary(code),
                recommendations: this.generateRecommendations(code)
            }
        };

        return results[stage];
    }

    displayResults(stage, results) {
        const resultsContainer = document.getElementById('results');
        
        if (stage === 'point') {
            resultsContainer.innerHTML = this.renderResultsLayout();
        }

        const stageContainer = document.getElementById(`${stage}Results`);
        if (stageContainer) {
            stageContainer.innerHTML = this.renderStageResults(stage, results);
            stageContainer.classList.add('active');
        }
    }

    renderResultsLayout() {
        return `
            <div class="results-layout">
                <div class="progression-mini">
                    ${this.renderMiniProgression()}
                </div>
                <div class="stage-results">
                    <div id="pointResults" class="result-stage active"></div>
                    <div id="hunchResults" class="result-stage"></div>
                    <div id="intuitionResults" class="result-stage"></div>
                    <div id="insightResults" class="result-stage"></div>
                </div>
            </div>
        `;
    }

    renderStageResults(stage, results) {
        const templates = {
            point: `
                <div class="result-card">
                    <h4>📍 Code Elements</h4>
                    <div class="elements-grid">
                        ${results.elements.map(el => `
                            <div class="element-item">
                                <span class="element-type">${el.type}</span>
                                <span class="element-name">${el.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="result-card">
                    <h4>🔍 Detected Patterns</h4>
                    <ul class="patterns-list">
                        ${results.patterns.map(pattern => `
                            <li>${pattern}</li>
                        `).join('')}
                    </ul>
                </div>
            `,
            hunch: `
                <div class="result-card">
                    <h4>💡 Initial Hypotheses</h4>
                    <div class="hypotheses">
                        ${results.hypotheses.map(hypo => `
                            <div class="hypothesis-item">
                                <div class="hypothesis-text">${hypo.text}</div>
                                <div class="confidence">${hypo.confidence}% confidence</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `,
            insight: `
                <div class="result-card">
                    <h4>🧩 Architectural Insight</h4>
                    <div class="insight-summary">
                        ${results.summary}
                    </div>
                </div>
                <div class="result-card">
                    <h4>🚀 Recommendations</h4>
                    <ul class="recommendations">
                        ${results.recommendations.map(rec => `
                            <li>${rec}</li>
                        `).join('')}
                    </ul>
                </div>
            `
        };

        return templates[stage] || `<div class="result-card"><h4>${stage} Analysis</h4><pre>${JSON.stringify(results, null, 2)}</pre></div>`;
    }

    // Analysis methods (simplified for demo)
    analyzeCodeElements(code) {
        const elements = [];
        if (code.includes('function')) elements.push({ type: 'function', name: 'Function declaration' });
        if (code.includes('class')) elements.push({ type: 'class', name: 'Class definition' });
        if (code.includes('const') || code.includes('let')) elements.push({ type: 'variable', name: 'Variable' });
        if (code.includes('import') || code.includes('require')) elements.push({ type: 'import', name: 'Module import' });
        return elements.slice(0, 4);
    }

    detectPatterns(code) {
        const patterns = [];
        if (code.includes('async') && code.includes('await')) patterns.push('Async/Await pattern');
        if (code.includes('.then(')) patterns.push('Promise chain');
        if (code.includes('useState') || code.includes('useEffect')) patterns.push('React Hooks');
        if (code.includes('app.get') || code.includes('app.post')) patterns.push('Express.js routes');
        return patterns.length ? patterns : ['Basic procedural pattern'];
    }

    generateHypotheses(code) {
        return [
            { text: 'This appears to be a modular component with clear responsibilities', confidence: 85 },
            { text: 'Code follows common patterns for its domain', confidence: 78 },
            { text: 'Good separation of concerns evident in structure', confidence: 92 }
        ];
    }

    generateInsightSummary(code) {
        if (code.includes('React')) {
            return 'This React component demonstrates proper hook usage and state management. The component follows React best practices with clear separation of concerns.';
        } else if (code.includes('express') || code.includes('app.')) {
            return 'Express.js server with RESTful API patterns. Middleware and route handling are properly structured for scalability.';
        } else {
            return 'Well-structured code with clear intent and good organization. Follows common JavaScript patterns and practices.';
        }
    }

    generateRecommendations(code) {
        const recommendations = [
            'Consider adding error handling for edge cases',
            'Document complex functions with JSDoc comments',
            'Extract reusable logic into helper functions'
        ];
        
        if (code.includes('async')) {
            recommendations.push('Add proper error handling for async operations');
        }
        
        return recommendations;
    }

    async generateMermaidChart(code) {
        const mermaidContainer = document.getElementById('mermaidChart');
        
        try {
            // Generate both suite flow and sequence diagram
            const mermaidCode = this.generateCombinedMermaid(code);
            
            // Clear previous content
            mermaidContainer.innerHTML = '<div class="mermaid-loading">Generating visualization...</div>';
            
            // Wait for mermaid to process
            await this.delay(100);
            
            // Render with dark theme
            mermaidContainer.innerHTML = `<div class="mermaid">${mermaidCode}</div>`;
            
            // Initialize mermaid with dark theme
            mermaid.initialize({
                startOnLoad: true,
                theme: 'dark',
                securityLevel: 'loose',
                themeVariables: {
                    darkMode: true,
                    background: '#0d1117',
                    primaryColor: '#161b22',
                    primaryBorderColor: '#30363d',
                    primaryTextColor: '#c9d1d9',
                    lineColor: '#58a6ff'
                }
            });
            
            await mermaid.run({ querySelector: '.mermaid' });
            
        } catch (error) {
            console.error('Mermaid rendering error:', error);
            mermaidContainer.innerHTML = `
                <div class="welcome-chart">
                    <h4>🔮 Code Architecture</h4>
                    <p>Visualization will appear here after analysis</p>
                    <div class="chart-placeholder">
                        <div class="architecture-flow">
                            <div class="flow-item">Input → Processing → Output</div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    generateCombinedMermaid(code) {
        // Generate suite analysis flow
        let mermaidCode = `
            graph TD
                A[📝 Code Input] --> B[📍 Point Analysis]
                B --> C[💡 Hunch Generation]
                C --> D[🎯 Intuition Development]
                D --> E[🧩 Insight Synthesis]
                E --> F[🚀 Recommendations]
                
                style A fill:#161b22,stroke:#58a6ff,stroke-width:2px
                style B fill:#161b22,stroke:#e74c3c,stroke-width:2px
                style C fill:#161b22,stroke:#f39c12,stroke-width:2px
                style D fill:#161b22,stroke:#9b59b6,stroke-width:2px
                style E fill:#161b22,stroke:#3498db,stroke-width:2px
                style F fill:#161b22,stroke:#2ecc71,stroke-width:2px
        `;

        // Add sequence diagram based on code content
        if (code.includes('fetch') || code.includes('async')) {
            mermaidCode += `
                
                sequenceDiagram
                    participant User
                    participant App
                    participant API
                    
                    User->>App: Trigger Action
                    App->>API: HTTP Request
                    API-->>App: JSON Response
                    App-->>User: Update UI
                    
                    Note over App,API: Async Operation
            `;
        }

        return mermaidCode;
    }

    initializeMermaid() {
        // Mermaid is already loaded via CDN in index.html
        if (typeof mermaid !== 'undefined') {
            mermaid.initialize({
                startOnLoad: true,
                theme: 'dark',
                securityLevel: 'loose',
                themeVariables: {
                    darkMode: true,
                    background: '#0d1117',
                    primaryColor: '#161b22',
                    primaryBorderColor: '#30363d',
                    primaryTextColor: '#c9d1d9',
                    lineColor: '#58a6ff'
                }
            });
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.insightPlayground = new InsightPlayground();
});
