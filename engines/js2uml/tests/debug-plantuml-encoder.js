import PlantUMLEncoder from 'plantuml-encoder';

// Simple test PlantUML code that we KNOW works
const simplePlantUML = `@startuml
class Calculator {
  - history: array
  + constructor()
  + add(a, b)
  + multiply(a, b)
}
@enduml`;

// Complex Express.js PlantUML (your generated one)
const expressPlantUML = `@startuml

title JS2UML Deep Analysis
Revealing Code Truths

' PURPOSE: web-framework
' CONFIDENCE: 92.0%
' PATTERNS: middleware, routing, request-response
' QUALITY ISSUES: 0
' INTUITION SCORE: 88.2

class Express {
  .. Properties ..
  -settings
  -engines
  -routes
  -server
  --
  .. Interface ..
  +constructor()
  +defaultConfiguration()
  +set()
  +enable()
  +disable()
  +engine()
  +use()
  +listen()
  --
  .. Internal Usage ..
  ~defaultConfiguration() <<internal>>
  ~enable() <<internal>>
  ~set() <<internal>>
}

class Router {
  .. Properties ..
  -options
  -stack
  -route
  -fn
  --
  .. Interface ..
  +constructor()
  +route()
  +use()
  +all()
  +get()
  +post()
  --
  .. Internal Usage ..
  ~route() <<internal>>
}

class Route {
  .. Properties ..
  -path
  -stack
  -methods
  -get
  -post
  -idx
  -layer
  -length
  --
  .. Interface ..
  +constructor()
  +use()
  +get()
  +post()
  +dispatch()
}

class Request {
  .. Properties ..
  -originalUrl
  -method
  -params
  -query
  -body
  --
  .. Interface ..
  +constructor()
  +get()
  +param()
}

class Response {
  .. Properties ..
  -statusCode
  -headers
  -body
  --
  .. Interface ..
  +constructor()
  +status()
  +send()
  +json()
  +end()
  +setHeader()
  --
  .. Internal Usage ..
  ~json() <<internal>>
  ~end() <<internal>>
  ~setHeader() <<internal>>
  --
  .. External Dependencies ..
  #console.log <<external>>
  #json.stringify <<external>>
}

class External_APIs {
  .. Global APIs ..
  +console.*
  +JSON.*
  +Math.*
  +Promise.*
  <<external>>
}

Router ..> Route <<creates>>#green
Response ..> External APIs <<external>> #red#gray

note bottom of Express
  ✅ Architecture Strengths:
  • No external dependencies
  • Clean state management
end note
note bottom of Router
  ✅ Architecture Strengths:
  • No external dependencies
  • Clean state management
end note
note bottom of Route
  ✅ Architecture Strengths:
  • No external dependencies
  • Clean public interface
end note
note bottom of Request
  ✅ Architecture Strengths:
  • No external dependencies
  • Clean public interface
end note
note bottom of Response
  ✅ Architecture Strengths:
  • Clean state management
end note

legend right
  🔍 Insight Suite Deep Analysis
  📝 Shows declared + used + external
  ⚠️  Reveals hidden dependencies
  🎯 Architecture quality insights
endlegend

@enduml`;

async function debugEncoder() {
    console.log('🔧 DEBUGGING PlantUML Encoder\n');
    
    // Test 1: Simple known-working diagram
    console.log('1. Testing with SIMPLE diagram:');
    const simpleEncoded = PlantUMLEncoder.encode(simplePlantUML);
    console.log('   Encoded length:', simpleEncoded.length);
    console.log('   First 50 chars:', simpleEncoded.substring(0, 50));
    console.log('   URL: https://www.plantuml.com/plantuml/svg/' + simpleEncoded);
    
    // Test 2: Complex Express diagram
    console.log('\n2. Testing with COMPLEX Express diagram:');
    const expressEncoded = PlantUMLEncoder.encode(expressPlantUML);
    console.log('   Encoded length:', expressEncoded.length);
    console.log('   First 50 chars:', expressEncoded.substring(0, 50));
    console.log('   URL: https://www.plantuml.com/plantuml/svg/' + expressEncoded);
    
    // Test 3: Check if encoder is actually working
    console.log('\n3. Encoder functionality test:');
    console.log('   Encoder type:', typeof PlantUMLEncoder);
    console.log('   Encoder function:', typeof PlantUMLEncoder.encode);
    
    // Create test HTML files
    const fs = await import('fs');
    fs.mkdirSync('./outputs', { recursive: true });
    
    // Simple test
    const simpleHTML = `
<!DOCTYPE html>
<html>
<body>
    <h1>Simple PlantUML Test</h1>
    <img src="https://www.plantuml.com/plantuml/svg/${simpleEncoded}" alt="Simple Diagram">
    <p><a href="https://www.plantuml.com/plantuml/umla/${simpleEncoded}" target="_blank">Open Simple in Editor</a></p>
</body>
</html>`;
    
    // Express test  
    const expressHTML = `
<!DOCTYPE html>
<html>
<body>
    <h1>Express.js PlantUML Test</h1>
    <img src="https://www.plantuml.com/plantuml/svg/${expressEncoded}" alt="Express Diagram">
    <p><a href="https://www.plantuml.com/plantuml/umla/${expressEncoded}" target="_blank">Open Express in Editor</a></p>
</body>
</html>`;
    
    fs.writeFileSync('./outputs/debug-simple.html', simpleHTML);
    fs.writeFileSync('./outputs/debug-express.html', expressHTML);
    
    console.log('\n✅ Test files created:');
    console.log('   📄 outputs/debug-simple.html');
    console.log('   📄 outputs/debug-express.html');
    console.log('\n🎯 Open these in browser to see if PlantUML renders!');
}

debugEncoder().catch(console.error);
