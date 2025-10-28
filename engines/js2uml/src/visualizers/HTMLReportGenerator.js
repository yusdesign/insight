import { ASCIIVisualizer } from './ASCIIVisualizer.js';
import PlantUMLEncoder from 'plantuml-encoder';

export class HTMLReportGenerator {
    static generate(analysis, title = 'JS2UML Architecture Report') {
        const { classes, relationships, insights, uml } = analysis;
        
        // Generate ASCII diagram
        const asciiDiagram = ASCIIVisualizer.render(analysis);
        
        // Generate PlantUML image URL USING THE ENCODER
        const encodedUML = PlantUMLEncoder.encode(uml);
        const plantUMLImageUrl = `https://www.plantuml.com/plantuml/svg/${encodedUML}`;
        const plantUMLEditorUrl = `https://www.plantuml.com/plantuml/umla/${encodedUML}`;
        
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        .header {
            background: rgba(255,255,255,0.95);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
        }
        .header h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2.5em;
        }
        .header .subtitle {
            color: #666;
            font-size: 1.2em;
        }
        .dashboard {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        .card {
            background: rgba(255,255,255,0.95);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .card h2 {
            color: #333;
            margin-bottom: 15px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 5px;
        }
        .metrics {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }
        .metric {
            text-align: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .metric .value {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
        }
        .metric .label {
            font-size: 0.9em;
            color: #666;
        }
        .diagram-container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
        }
        .plantuml-image {
            max-width: 100%;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            background: white;
        }
        .plantuml-links {
            margin-top: 10px;
        }
        .plantuml-links a {
            display: inline-block;
            margin: 0 10px;
            padding: 8px 16px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .plantuml-links a:hover {
            background: #5a6fd8;
        }
        .ascii-diagram {
            background: #1e1e1e;
            color: #00ff00;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            white-space: pre;
            overflow-x: auto;
            margin-bottom: 20px;
            display: none;
        }
        .toggle-button {
            background: #667eea;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px 0;
        }
        .toggle-button:hover {
            background: #5a6fd8;
        }
        .plantuml-section {
            background: white;
            padding: 20px;
            border-radius: 10px;
        }
        .plantuml-code {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            margin-bottom: 10px;
            max-height: 400px;
            overflow-y: auto;
        }
        .classes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
        }
        .class-card {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .class-name {
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .method-list, .property-list {
            font-size: 0.9em;
        }
        .method-list li, .property-list li {
            margin-bottom: 5px;
            padding-left: 10px;
        }
        .quality-indicator {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            margin-left: 10px;
        }
        .quality-high { background: #d4edda; color: #155724; }
        .quality-medium { background: #fff3cd; color: #856404; }
        .quality-low { background: #f8d7da; color: #721c24; }
        .loading {
            color: #666;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏗️ ${title}</h1>
            <div class="subtitle">Generated by Insight Suite JS2UML</div>
        </div>

        <div class="dashboard">
            <div class="card">
                <h2>📊 Architecture Metrics</h2>
                <div class="metrics">
                    <div class="metric">
                        <div class="value">${insights.totalClasses}</div>
                        <div class="label">Classes</div>
                    </div>
                    <div class="metric">
                        <div class="value">${insights.totalMethods}</div>
                        <div class="label">Methods</div>
                    </div>
                    <div class="metric">
                        <div class="value">${insights.qualityScore}%</div>
                        <div class="label">Quality Score</div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h2>🔗 Relationships</h2>
                <div class="metric">
                    <div class="value">${relationships.length}</div>
                    <div class="label">Connections</div>
                </div>
            </div>

            <div class="card">
                <h2>🎯 Quality Assessment</h2>
                <div class="metric">
                    <div class="value">
                        ${insights.qualityScore >= 80 ? '🟢' : insights.qualityScore >= 60 ? '🟡' : '🔴'}
                    </div>
                    <div class="label">
                        ${insights.qualityScore >= 80 ? 'Excellent' : insights.qualityScore >= 60 ? 'Good' : 'Needs Improvement'}
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <h2>📐 PlantUML Architecture Diagram</h2>
            <div class="diagram-container">
                <div id="plantumlLoading" class="loading">Loading PlantUML diagram...</div>
                <img id="plantumlImage" src="${plantUMLImageUrl}" alt="PlantUML Architecture Diagram" class="plantuml-image" 
                     style="display: none;"
                     onload="document.getElementById('plantumlLoading').style.display='none'; this.style.display='block'"
                     onerror="document.getElementById('plantumlLoading').style.display='none'; document.getElementById('plantumlFallback').style.display='block'">
                <div id="plantumlFallback" style="display: none; color: #666; font-style: italic;">
                    ❌ PlantUML diagram could not be loaded. The PlantUML server might be unavailable.
                </div>
                
                <div class="plantuml-links">
                    <a href="${plantUMLImageUrl}" target="_blank">🖼️ View Image</a>
                    <a href="${plantUMLEditorUrl}" target="_blank">✏️ Open in Editor</a>
                </div>
            </div>
            
            <button class="toggle-button" onclick="toggleASCII()">📋 Toggle ASCII View</button>
            <div class="ascii-diagram" id="asciiDiagram">${asciiDiagram}</div>
        </div>

        <div class="card">
            <h2>🏛️ Classes Overview</h2>
            <div class="classes-grid">
                ${classes.map(cls => {
                    const classQuality = cls.methods.declared.length > 15 ? 'low' : 
                                       cls.methods.declared.length > 8 ? 'medium' : 'high';
                    const qualityClass = `quality-${classQuality}`;
                    return `
                    <div class="class-card">
                        <div class="class-name">
                            ${cls.name}
                            <span class="quality-indicator ${qualityClass}">
                                ${cls.methods.declared.length} methods
                            </span>
                        </div>
                        <div class="method-list">
                            <strong>Methods:</strong>
                            <ul>
                                ${cls.methods.declared.map(method => `
                                    <li>${method}()${method === 'constructor' ? ' 🏗️' : ''}</li>
                                `).join('')}
                            </ul>
                        </div>
                        ${cls.properties.length > 0 ? `
                        <div class="property-list">
                            <strong>Properties:</strong>
                            <ul>
                                ${cls.properties.map(prop => `<li>${prop}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        ${cls.methods.external.length > 0 ? `
                        <div class="property-list">
                            <strong>External Dependencies:</strong>
                            <ul>
                                ${cls.methods.external.slice(0, 3).map(ext => `<li>${ext}</li>`).join('')}
                                ${cls.methods.external.length > 3 ? `<li>... and ${cls.methods.external.length - 3} more</li>` : ''}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                `}).join('')}
            </div>
        </div>

        <div class="card plantuml-section">
            <h2>🌿 PlantUML Source Code</h2>
            <div class="plantuml-code">${uml}</div>
            <button class="toggle-button" onclick="copyPlantUML()">📋 Copy PlantUML Source</button>
            <div style="margin-top: 10px; font-size: 0.9em; color: #666;">
                Encoded URL: ${plantUMLImageUrl.substring(0, 100)}...
            </div>
        </div>
    </div>

    <script>
        function toggleASCII() {
            const asciiDiv = document.getElementById('asciiDiagram');
            asciiDiv.style.display = asciiDiv.style.display === 'none' ? 'block' : 'none';
        }

        function copyPlantUML() {
            const plantUMLCode = \`${uml}\`;
            navigator.clipboard.writeText(plantUMLCode).then(() => {
                alert('PlantUML code copied to clipboard!');
            });
        }

        // Add quality-based coloring
        document.querySelectorAll('.method-list li').forEach(li => {
            if (li.textContent.includes('constructor')) {
                li.style.color = '#e74c3c';
                li.style.fontWeight = 'bold';
            }
        });
    </script>
</body>
</html>
        `;
    }
}
