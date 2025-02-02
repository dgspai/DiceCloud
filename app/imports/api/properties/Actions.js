import SimpleSchema from 'simpl-schema';
import createPropertySchema from '/imports/api/properties/subSchemas/createPropertySchema.js';
import { storedIconsSchema } from '/imports/api/icons/Icons.js';
import STORAGE_LIMITS from '/imports/constants/STORAGE_LIMITS.js';

/*
 * Actions are things a character can do
 * Any rolls that are children of actions will be rolled when taking the action
 * Any actions that are children of this action will be considered alternatives
 * to this action
 */
let ActionSchema = createPropertySchema({
  name: {
    type: String,
    optional: true,
    max: STORAGE_LIMITS.name,
  },
  summary: {
    type: 'inlineCalculationFieldToCompute',
    optional: true,
  },
  description: {
    type: 'inlineCalculationFieldToCompute',
    optional: true,
  },
  // What time-resource is used to take the action in combat
  // long actions take longer than 1 round to cast
  actionType: {
    type: String,
    allowedValues: ['action', 'bonus', 'attack', 'reaction', 'free', 'long'],
    defaultValue: 'action',
  },
  // Who is the action directed at
  target: {
    type: String,
    defaultValue: 'singleTarget',
    allowedValues: [
      'self',
      'singleTarget',
      'multipleTargets',
    ],
  },
  // Some actions have an attack roll
  attackRoll: {
    type: 'fieldToCompute',
    optional: true,
    defaultValue: 'strength.modifier + proficiencyBonus',
  },
  // Calculation of how many times this action can be used
  uses: {
    type: 'fieldToCompute',
    optional: true,
  },
  // Integer of how many times it has already been used
  usesUsed: {
    type: SimpleSchema.Integer,
    optional: true,
  },
  // How this action's uses are reset automatically
  reset: {
    type: String,
    allowedValues: ['longRest', 'shortRest'],
    optional: true,
  },
  // Resources
  resources: {
    type: Object,
    defaultValue: {},
  },
  'resources.itemsConsumed': {
    type: Array,
    defaultValue: [],
  },
  'resources.itemsConsumed.$': {
    type: Object,
  },
  'resources.itemsConsumed.$._id': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue(){
      if (!this.isSet) return Random.id();
    }
  },
  'resources.itemsConsumed.$.tag': {
    type: String,
    optional: true,
  },
  'resources.itemsConsumed.$.quantity': {
    type: 'fieldToCompute',
    optional: true,
  },
  'resources.itemsConsumed.$.itemId': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  'resources.attributesConsumed': {
    type: Array,
    defaultValue: [],
  },
  'resources.attributesConsumed.$': {
    type: Object,
  },
  'resources.attributesConsumed.$._id': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue(){
      if (!this.isSet) return Random.id();
    }
  },
  'resources.attributesConsumed.$.variableName': {
    type: String,
    optional: true,
    max: STORAGE_LIMITS.variableName,
  },
  'resources.attributesConsumed.$.quantity': {
    type: 'fieldToCompute',
    optional: true,
  },
});

const ComputedOnlyActionSchema = createPropertySchema({
  summary: {
    type: 'computedOnlyInlineCalculationField',
    optional: true,
  },
  description: {
    type: 'computedOnlyInlineCalculationField',
    optional: true,
  },
  // True if the uses left is zero, or any item or attribute consumed is
  // insufficient
  insufficientResources: {
    type: Boolean,
    optional: true,
    removeBeforeCompute: true,
  },
  attackRoll: {
    type: 'computedOnlyField',
    optional: true,
  },
  uses: {
    type: 'computedOnlyField',
    optional: true,
  },
  // Uses - usesUsed
  usesLeft: {
    type: Number,
    optional: true,
    removeBeforeCompute: true,
  },
  // Resources
  resources: {
    type: Object,
    defaultValue: {},
  },
  'resources.itemsConsumed': {
    type: Array,
    defaultValue: [],
  },
  'resources.itemsConsumed.$': {
    type: Object,
  },
  'resources.itemsConsumed.$.available': {
    type: Number,
    optional: true,
    removeBeforeCompute: true,
  },
  'resources.itemsConsumed.$.quantity': {
    type: 'computedOnlyField',
    optional: true,
  },
  'resources.itemsConsumed.$.itemName': {
    type: String,
    max: STORAGE_LIMITS.name,
    optional: true,
    removeBeforeCompute: true,
  },
  'resources.itemsConsumed.$.itemIcon': {
    type: storedIconsSchema,
    optional: true,
    max: STORAGE_LIMITS.icon,
    removeBeforeCompute: true,
  },
  'resources.itemsConsumed.$.itemColor': {
    type: String,
    optional: true,
    regEx: /^#([a-f0-9]{3}){1,2}\b$/i,
    removeBeforeCompute: true,
  },
  'resources.attributesConsumed': {
    type: Array,
    defaultValue: [],
  },
  'resources.attributesConsumed.$': {
    type: Object,
  },
  'resources.attributesConsumed.$.quantity': {
    type: 'computedOnlyField',
    optional: true,
  },
  'resources.attributesConsumed.$.available': {
    type: Number,
    optional: true,
    removeBeforeCompute: true,
  },
  'resources.attributesConsumed.$.statName': {
    type: String,
    optional: true,
    max: STORAGE_LIMITS.name,
    removeBeforeCompute: true,
  },
});

const ComputedActionSchema = new SimpleSchema()
  .extend(ActionSchema)
  .extend(ComputedOnlyActionSchema);

export { ActionSchema, ComputedOnlyActionSchema, ComputedActionSchema};
