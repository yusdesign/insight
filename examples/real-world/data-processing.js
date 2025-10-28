// Real-world data processing pipeline
class DataProcessor {
  constructor(options = {}) {
    this.filters = options.filters || [];
    this.transformers = options.transformers || [];
    this.validators = options.validators || [];
  }

  async process(data) {
    try {
      // Step 1: Filter data
      let filteredData = this.applyFilters(data);
      
      // Step 2: Transform data
      let transformedData = this.applyTransformers(filteredData);
      
      // Step 3: Validate data
      const isValid = await this.validateData(transformedData);
      
      if (!isValid) {
        throw new Error('Data validation failed');
      }
      
      return transformedData;
    } catch (error) {
      console.error('Data processing error:', error);
      throw error;
    }
  }

  applyFilters(data) {
    return this.filters.reduce((result, filter) => {
      return filter(result);
    }, data);
  }

  applyTransformers(data) {
    return this.transformers.reduce((result, transformer) => {
      return transformer(result);
    }, data);
  }

  async validateData(data) {
    for (const validator of this.validators) {
      const isValid = await validator(data);
      if (!isValid) return false;
    }
    return true;
  }
}