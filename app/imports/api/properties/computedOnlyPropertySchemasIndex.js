import SimpleSchema from 'simpl-schema';
import { ComputedOnlyActionSchema } from '/imports/api/properties/Actions.js';
import { ComputedOnlyAdjustmentSchema } from '/imports/api/properties/Adjustments.js';
import { ComputedOnlyAttributeSchema } from '/imports/api/properties/Attributes.js';
import { ComputedOnlyBuffSchema } from '/imports/api/properties/Buffs.js';
import { ComputedOnlyClassSchema } from '/imports/api/properties/Classes.js';
import { ComputedOnlyClassLevelSchema } from '/imports/api/properties/ClassLevels.js';
import { ComputedOnlyConstantSchema } from '/imports/api/properties/Constants.js';
import { ComputedOnlyContainerSchema } from '/imports/api/properties/Containers.js';
import { ComputedOnlyDamageSchema } from '/imports/api/properties/Damages.js';
import { ComputedOnlyDamageMultiplierSchema } from '/imports/api/properties/DamageMultipliers.js';
import { ComputedOnlyEffectSchema } from '/imports/api/properties/Effects.js';
import { ComputedOnlyFeatureSchema } from '/imports/api/properties/Features.js';
import { ComputedOnlyFolderSchema } from '/imports/api/properties/Folders.js';
import { ComputedOnlyItemSchema } from '/imports/api/properties/Items.js';
import { ComputedOnlyNoteSchema } from '/imports/api/properties/Notes.js';
import { ComputedOnlyProficiencySchema } from '/imports/api/properties/Proficiencies.js';
import { ComputedOnlyReferenceSchema } from '/imports/api/properties/References.js';
import { ComputedOnlyRollSchema } from '/imports/api/properties/Rolls.js';
import { ComputedOnlySavingThrowSchema } from '/imports/api/properties/SavingThrows.js';
import { ComputedOnlySkillSchema } from '/imports/api/properties/Skills.js';
import { ComputedOnlySlotSchema } from '/imports/api/properties/Slots.js';
import { ComputedOnlySlotFillerSchema } from '/imports/api/properties/SlotFillers.js';
import { ComputedOnlySpellSchema } from '/imports/api/properties/Spells.js';
import { ComputedOnlySpellListSchema } from '/imports/api/properties/SpellLists.js';
import { ComputedOnlyToggleSchema } from '/imports/api/properties/Toggles.js';

const propertySchemasIndex = {
  action: ComputedOnlyActionSchema,
  adjustment: ComputedOnlyAdjustmentSchema,
  attribute: ComputedOnlyAttributeSchema,
  buff: ComputedOnlyBuffSchema,
  class: ComputedOnlyClassSchema,
  classLevel: ComputedOnlyClassLevelSchema,
  constant: ComputedOnlyConstantSchema,
  container: ComputedOnlyContainerSchema,
  damage: ComputedOnlyDamageSchema,
  damageMultiplier: ComputedOnlyDamageMultiplierSchema,
  effect: ComputedOnlyEffectSchema,
  feature: ComputedOnlyFeatureSchema,
  folder: ComputedOnlyFolderSchema,
  item: ComputedOnlyItemSchema,
  note: ComputedOnlyNoteSchema,
  proficiency: ComputedOnlyProficiencySchema,
  propertySlot: ComputedOnlySlotSchema,
  reference: ComputedOnlyReferenceSchema,
  roll: ComputedOnlyRollSchema,
  savingThrow: ComputedOnlySavingThrowSchema,
  skill: ComputedOnlySkillSchema,
  slotFiller: ComputedOnlySlotFillerSchema,
  spellList: ComputedOnlySpellListSchema,
  spell: ComputedOnlySpellSchema,
  toggle: ComputedOnlyToggleSchema,
  any: new SimpleSchema({}),
};

export default propertySchemasIndex;
