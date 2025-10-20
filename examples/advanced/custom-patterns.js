/**
 * Advanced: Custom Pattern Learning
 * 
 * Demonstrates domain-specific pattern training and advanced configuration
 * for specialized code analysis scenarios.
 */

import { PointJS, PurposeIdentifier } from 'point.js';
import { HunchJS, AnomalyDetector } from 'hunch.js';
import { IntuitionJS, PatternLearner } from 'intuition.js';
import InsightJS from 'insight.js';

// Domain-specific code examples for e-commerce
const ecommerceExamples = {
  pricing: [
    \`function calculateDiscountedPrice(originalPrice, discountPercent) {
      if (originalPrice <= 0 || discountPercent < 0 || discountPercent > 100) {
        throw new Error('Invalid price or discount');
      }
      return originalPrice * (1 - discountPercent / 100);
    }\`,
    
    \`function applyTax(price, taxRate) {
      return price * (1 + taxRate);
    }\`,
    
    \`function calculateShipping(cartTotal, destination) {
      const baseShipping = 5.99;
      const freeShippingThreshold = 50.00;
      
      if (cartTotal >= freeShippingThreshold) {
        return 0;
      }
      
      // International shipping logic
      if (destination === 'international') {
        return baseShipping * 2;
      }
      
      return baseShipping;
    }\`
  ],
  
  inventory: [
    \`function checkStockLevel(productId, requestedQuantity) {
      const currentStock = getStockFromDatabase(productId);
      return currentStock >= requestedQuantity;
    }\`,
    
    \`function updateInventory(productId, soldQuantity) {
      const currentStock = getStockFromDatabase(productId);
      const newStock = currentStock - soldQuantity;
      
      if (newStock < 0) {
        throw new Error('Insufficient stock');
      }
      
      updateStockInDatabase(productId, newStock);
      return newStock;
    }\`,
    
    \`function getLowStockAlert(threshold = 10) {
      const allProducts = getAllProducts();
      return allProducts.filter(product => product.stock <= threshold);
    }\`
  ],
  
  validation: [
    \`function validateCreditCard(cardNumber, expiryDate, cvv) {
      // Basic format validation
      if (!/^\\d{16}$/.test(cardNumber.replace(/\\s/g, ''))) {
        return false;
      }
      
      // Expiry date validation
      const [month, year] = expiryDate.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expiry < new Date()) {
        return false;
      }
      
      // CVV validation
      if (!/^\\d{3,4}$/.test(cvv)) {
        return false;
      }
      
      return true;
    }\`,
    
    \`function validateAddress(address) {
      const requiredFields = ['street', 'city', 'postalCode', 'country'];
      const missingFields = requiredFields.filter(field => !address[field]);
      
      if (missingFields.length > 0) {
        throw new Error(\`Missing required fields: \${missingFields.join(', ')}\`);
      }
      
      // Basic format validation
      if (!/^[A-Z0-9\\s]+$/i.test(address.postalCode)) {
        throw new Error('Invalid postal code format');
      }
      
      return true;
    }\`
  ]
};

class DomainSpecificAnalyzer {
  constructor(domain) {
    this.domain = domain;
    this.setupDomainSpecificConfiguration();
  }
  
  setupDomainSpecificConfiguration() {
    // Domain-specific point.js configuration
    this.point = new PointJS({
      confidenceThreshold: 0.7,
      similarityThreshold: 0.8
    });
    
    // Add domain-specific purpose patterns
    this.addDomainPurposePatterns();
    
    // Domain-specific hunch.js configuration
    this.hunch = new HunchJS({
      confidenceThreshold: 0.6,
      similarityThreshold: 0.7
    });
    
    // Add domain-specific code smells
    this.addDomainAnomalyPatterns();
    
    // Domain-specific intuition.js configuration  
    this.intuition = new IntuitionJS({
      learningRate: 0.2,  // Faster learning for domain patterns
      confidenceThreshold: 0.65
    });
    
    // Domain-specific insight.js configuration
    this.insight = new InsightJS({
      weights: {
        purpose: 0.5,      // Emphasize domain purpose understanding
        anomalies: 0.3,     // Domain-specific quality
        patterns: 0.15,     // Domain patterns
        relationships: 0.05 // Less emphasis on general relationships
      },
      point: { confidenceThreshold: 0.7 },
      hunch: { confidenceThreshold: 0.6 },
      intuition: { learningRate: 0.2 }
    });
  }
  
  addDomainPurposePatterns() {
    const identifier = new PurposeIdentifier();
    
    // E-commerce specific purposes
    identifier.patterns['pricing-calculation'] = {
      indicators: ['calculate', 'price', 'discount', 'tax', 'shipping', 'total'],
      patterns: [
        /price.*\\*/,
        /discount.*%/,
        /tax.*rate/,
        /shipping.*cost/
      ],
      weight: 1.0,
      description: 'Calculates product pricing, discounts, taxes, or shipping'
    };
    
    identifier.patterns['inventory-management'] = {
      indicators: ['stock', 'inventory', 'quantity', 'updateStock', 'checkStock'],
      patterns: [
        /stock.*level/,
        /inventory.*update/,
        /quantity.*check/,
        /getStock|updateStock/
      ],
      weight: 0.9,
      description: 'Manages product inventory and stock levels'
    };
    
    identifier.patterns['payment-processing'] = {
      indicators: ['payment', 'creditcard', 'transaction', 'processPayment'],
      patterns: [
        /credit.*card/,
        /payment.*process/,
        /transaction.*id/,
        /processPayment/
      ],
      weight: 0.9,
      description: 'Handles payment processing and transaction management'
    };
    
    this.point.identifier = identifier;
  }
  
  addDomainAnomalyPatterns() {
    const detector = new AnomalyDetector();
    
    // E-commerce specific code smells
    detector.smellPatterns['hardcoded-pricing'] = {
      pattern: /\\b(?:\\d+\\.?\\d*)\\s*\\*\\s*(?:0\\.\\d+|\\d+\\.?\\d*)/g,
      description: 'Hardcoded pricing calculations - consider configurable pricing rules',
      severity: 'medium'
    };
    
    detector.smellPatterns['missing-currency'] = {
      pattern: /\\bprice\\b.*[^$€£¥]\\d+\\.?\\d*[^$€£¥]/gi,
      description: 'Price values without currency specification',
      severity: 'low'
    };
    
    detector.smellPatterns['insecure-payment'] = {
      pattern: /(?:cc|credit.?card).*\\b(\\d{16}|\\d{4}[ -]?\\d{4}[ -]?\\d{4}[ -]?\\d{4})\\b/gi,
      description: 'Potential credit card number exposure in code',
      severity: 'high'
    };
    
    this.hunch.detector = detector;
  }
  
  async trainDomainPatterns() {
    console.log(\`🎓 Training \${this.domain} domain patterns...\\n\`);
    
    let allExamples = [];
    let allLabels = {};
    let index = 0;
    
    for (const [category, examples] of Object.entries(ecommerceExamples)) {
      examples.forEach(example => {
        allExamples.push(example);
        allLabels[index] = \`\${this.domain}-\${category}\`;
        index++;
      });
    }
    
    const trainingResult = await this.intuition.learnPatterns(allExamples, allLabels);
    
    console.log(\`✅ Trained \${trainingResult.learnedPatterns} \${this.domain} patterns\`);
    console.log(\`📊 Training Confidence: \${(trainingResult.confidence * 100).toFixed(1)}%\`);
    
    return trainingResult;
  }
  
  async analyzeDomainCode(code, context = {}) {
    console.log('\\n🔍 Analyzing domain-specific code...');
    
    const analysis = await this.insight.understand(code, {
      ...context,
      domain: this.domain
    });
    
    // Enhance with domain-specific insights
    const domainEnhancedAnalysis = {
      ...analysis,
      domain: this.domain,
      domainRelevance: this.calculateDomainRelevance(analysis),
      domainSuggestions: this.generateDomainSuggestions(analysis)
    };
    
    return domainEnhancedAnalysis;
  }
  
  calculateDomainRelevance(analysis) {
    let relevance = 0;
    
    // Check if purposes match domain
    const domainPurposes = ['pricing-calculation', 'inventory-management', 'payment-processing'];
    if (analysis.synthesis.purpose && domainPurposes.includes(analysis.synthesis.purpose)) {
      relevance += 0.4;
    }
    
    // Check pattern confidence
    relevance += analysis.synthesis.patternConfidence * 0.3;
    
    // Check if patterns are domain-specific
    if (analysis.layers.intuition.recognizedPatterns) {
      const domainPatterns = analysis.layers.intuition.recognizedPatterns.filter(
        pattern => pattern.label.startsWith(this.domain)
      );
      relevance += (domainPatterns.length / analysis.layers.intuition.recognizedPatterns.length) * 0.3;
    }
    
    return Math.min(relevance, 1.0);
  }
  
  generateDomainSuggestions(analysis) {
    const suggestions = [];
    
    // Domain-specific quality suggestions
    if (analysis.synthesis.purpose === 'pricing-calculation') {
      suggestions.push('Consider using a pricing service for complex calculations');
      suggestions.push('Add currency formatting for international customers');
    }
    
    if (analysis.synthesis.purpose === 'inventory-management') {
      suggestions.push('Implement inventory caching for better performance');
      suggestions.push('Add low stock notifications for inventory alerts');
    }
    
    if (analysis.synthesis.anomalyCount > 2) {
      suggestions.push('Multiple quality issues detected - consider domain-specific refactoring');
    }
    
    return suggestions;
  }
}

// Demonstration
async function demonstrateDomainSpecificAnalysis() {
  console.log('🏪 Domain-Specific Analysis: E-Commerce');
  console.log('='.repeat(50));
  
  // Create domain-specific analyzer
  const ecommerceAnalyzer = new DomainSpecificAnalyzer('ecommerce');
  
  // Train with domain examples
  await ecommerceAnalyzer.trainDomainPatterns();
  
  // Test with new e-commerce code
  const testCodes = [
    {
      name: 'Complex Pricing Logic',
      code: \`
        function calculateOrderTotal(cartItems, customer, shippingMethod) {
          let subtotal = 0;
          
          // Calculate item prices
          for (const item of cartItems) {
            let itemPrice = item.price;
            
            // Apply customer-specific discounts
            if (customer.isPremium) {
              itemPrice *= 0.9; // 10% discount for premium
            }
            
            // Apply bulk discounts
            if (item.quantity >= 10) {
              itemPrice *= 0.85; // 15% bulk discount
            }
            
            subtotal += itemPrice * item.quantity;
          }
          
          // Calculate shipping
          let shippingCost = 0;
          if (shippingMethod === 'express') {
            shippingCost = 15.99;
          } else if (shippingMethod === 'standard') {
            shippingCost = 5.99;
          }
          
          // Apply free shipping threshold
          if (subtotal > 100) {
            shippingCost = 0;
          }
          
          // Calculate tax
          const taxRate = customer.country === 'US' ? 0.08 : 0.05;
          const tax = subtotal * taxRate;
          
          return {
            subtotal: Math.round(subtotal * 100) / 100,
            shipping: shippingCost,
            tax: Math.round(tax * 100) / 100,
            total: Math.round((subtotal + shippingCost + tax) * 100) / 100
          };
        }
      \`
    },
    {
      name: 'Inventory Management',
      code: \`
        class InventoryManager {
          constructor() {
            this.lowStockThreshold = 5;
            this.restockLevel = 20;
          }
          
          async processOrder(order) {
            // Check stock for all items
            for (const item of order.items) {
              const availableStock = await this.getStockLevel(item.productId);
              
              if (availableStock < item.quantity) {
                throw new Error(\`Insufficient stock for product \${item.productId}\`);
              }
            }
            
            // Update inventory
            for (const item of order.items) {
              await this.updateStock(item.productId, -item.quantity);
              
              // Check if restocking is needed
              const newStock = await this.getStockLevel(item.productId);
              if (newStock <= this.lowStockThreshold) {
                await this.triggerRestock(item.productId, this.restockLevel);
              }
            }
            
            return { success: true, message: 'Order processed successfully' };
          }
          
          async getStockLevel(productId) {
            // Database query would go here
            return Math.floor(Math.random() * 50) + 1;
          }
          
          async updateStock(productId, delta) {
            // Database update would go here
            console.log(\`Updating stock for \${productId} by \${delta}\`);
          }
          
          async triggerRestock(productId, quantity) {
            console.log(\`Restocking \${productId} with \${quantity} units\`);
          }
        }
      \`
    }
  ];
  
  for (const test of testCodes) {
    console.log(\`\\n📦 Analyzing: \${test.name}\`);
    console.log('─'.repeat(40));
    
    const analysis = await ecommerceAnalyzer.analyzeDomainCode(test.code);
    
    console.log(\`🎯 Primary Purpose: \${analysis.synthesis.purpose}\`);
    console.log(\`🏪 Domain Relevance: \${(analysis.domainRelevance * 100).toFixed(1)}%\`);
    console.log(\`📊 Overall Score: \${analysis.overallScore}/100\`);
    
    if (analysis.domainSuggestions.length > 0) {
      console.log('\\n💡 Domain-Specific Suggestions:');
      analysis.domainSuggestions.forEach(suggestion => {
        console.log(\`   • \${suggestion}\`);
      });
    }
    
    // Show domain-enhanced recommendations
    const domainRecommendations = analysis.recommendations.filter(rec => 
      rec.category === 'quality' || rec.priority === 'high'
    );
    
    if (domainRecommendations.length > 0) {
      console.log('\\n🚨 Domain Quality Issues:');
      domainRecommendations.forEach(rec => {
        const icon = rec.priority === 'high' ? '🔴' : '🟡';
        console.log(\`   \${icon} \${rec.message}\`);
      });
    }
  }
}

// Run the demonstration
demonstrateDomainSpecificAnalysis().catch(console.error);
