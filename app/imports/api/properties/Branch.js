import SimpleSchema from 'simpl-schema';
import STORAGE_LIMITS from '/imports/constants/STORAGE_LIMITS.js';
import createPropertySchema from '/imports/api/properties/subSchemas/createPropertySchema.js';

let BranchSchema = createPropertySchema({
	branchType: {
		type: String,
    allowedValues: [
      // Uses the condition field to determine whether to apply children
      'if',
      // Attack
      'hit',
      'miss',
      // Save
      'failedSave',
      'successfulSave',
      // Iterate through targets
      'eachTarget',
      // if it has option children, asks to select one
      // Otherwise presents its own text with yes/no
      //'choice',
      //'option',
    ],
	},
  text: {
    type: String,
    optional: true,
    max: STORAGE_LIMITS.name,
  },
  condition: {
    type: 'fieldToCompute',
    optional: true,
    parseLevel: 'compile',
  },
});

let ComputedOnlyBranchSchema = createPropertySchema({
  condition: {
    type: 'computedOnlyField',
    optional: true,
    parseLevel: 'compile',
  },
});

const ComputedBranchSchema = new SimpleSchema()
  .extend(BranchSchema)
  .extend(ComputedOnlyBranchSchema);

export { BranchSchema, ComputedBranchSchema, ComputedOnlyBranchSchema }
