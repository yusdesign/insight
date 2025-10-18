import { PurposeIdentifier } from './core/identifier.js';
import { GoalAligner } from './core/aligner.js';

/**
 * Point.js - Find your code's true north
 * A library for understanding code purpose and goal alignment
 */
class PointJS {
  constructor(options = {}) {
    this.identifier = new PurposeIdentifier(options);
    this.aligner = new GoalAligner(options);
    this.version = '0.1.0';
  }

  async identify(code, context = {}) {
    return await this.identifier.analyze(code, context);
  }

  async isAligned(goal, code, options = {}) {
    return await this.aligner.checkAlignment(goal, code, options);
  }

  async suggestPurpose(code, hints = []) {
    return await this.identifier.suggest(code, hints);
  }

  extractGoals(comments) {
    return this.aligner.parseComments(comments);
  }

  async measureDrift(requirements, currentCode) {
    return await this.aligner.measureDrift(requirements, currentCode);
  }

  getVersion() {
    return this.version;
  }
}

export default PointJS;
export { PurposeIdentifier, GoalAligner };

