export class HybridVisualizer {
    generateHTMLView(umlCode, title = 'JS2UML Diagram') {
        const asciiArt = new ASCIIVisualizer().plantUMLToASCII(umlCode);
        const plantUMLEncoded = this.encodePlantUML(umlCode);
        const plantUMLUrl = `https://www.plantuml.com/plantuml/umla/${plantUMLEncoded}`;
        
        return `
<!DOCTYPE html>
<html>
<head>
    <title>${title}</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .mode-selector { margin: 20px 0; text-align: center; }
        .mode-btn { 
            padding: 10px 20px; margin: 5px; 
            background: #667eea; color: white; 
            border: none; border-radius: 5px; cursor: pointer;
        }
        .mode-btn.active { background: #4a5fc1; }
        .ascii-mode, .plantuml-mode { display: none; }
        .ascii-mode.active, .plantuml-mode.active { display: block; }
        .ascii-art { 
            background: #f5f5f5; padding: 20px; 
            font-family: 'Courier New', monospace; white-space: pre;
        }
        .plantuml-frame { width: 100%; height: 600px; border: 1px solid #ccc; }
    </style>
</head>
<body>
    <div class="container">
        <h1>${title}</h1>
        
        <div class="mode-selector">
            <button class="mode-btn active" onclick="showMode('ascii')">📱 ASCII (Instant)</button>
            <button class="mode-btn" onclick="showMode('plantuml')">🎨 PlantUML (Pretty)</button>
        </div>
        
        <div class="ascii-mode active">
            <h3>Instant ASCII Diagram</h3>
            <div class="ascii-art">${asciiArt}</div>
            <p><em>Works everywhere - copy and paste freely!</em></p>
        </div>
        
        <div class="plantuml-mode">
            <h3>PlantUML Diagram</h3>
            <iframe class="plantuml-frame" 
                    src="${plantUMLUrl}"
                    onerror="document.getElementById('plantuml-fallback').style.display='block'">
            </iframe>
            <div id="plantuml-fallback" style="display: none; color: red;">
                PlantUML failed to load. <a href="${plantUMLUrl}" target="_blank">Open in new tab</a>
            </div>
        </div>
        
        <div style="margin-top: 30px;">
            <h3>Export Options</h3>
            <button onclick="downloadASCII()">📥 Download ASCII</button>
            <a href="${plantUMLUrl}" target="_blank">🔗 Open PlantUML Editor</a>
            <a href="data:text/plain;charset=utf-8,${encodeURIComponent(umlCode)}" 
               download="diagram.puml">💾 Download PlantUML Source</a>
        </div>
    </div>
    
    <script>
        function showMode(mode) {
            document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.ascii-mode, .plantuml-mode').forEach(el => el.classList.remove('active'));
            
            document.querySelector(`.mode-btn[onclick="showMode('${mode}')"]`).classList.add('active');
            document.querySelector(`.${mode}-mode`).classList.add('active');
        }
        
        function downloadASCII() {
            const ascii = document.querySelector('.ascii-art').textContent;
            const blob = new Blob([ascii], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'architecture.txt';
            a.click();
        }
    </script>
</body>
</html>`;
    }
    
    encodePlantUML(umlCode) {
        return Buffer.from(umlCode).toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }
}
