const ActionForm = () => import('/imports/ui/properties/forms/ActionForm.vue');
const AdjustmentForm = () => import('/imports/ui/properties/forms/AdjustmentForm.vue');
const AttackForm = () => import('/imports/ui/properties/forms/AttackForm.vue');
const AttributeForm = () => import('/imports/ui/properties/forms/AttributeForm.vue');
const BuffForm = () => import('/imports/ui/properties/forms/BuffForm.vue');
const ClassLevelForm = () => import('/imports/ui/properties/forms/ClassLevelForm.vue');
const ConstantForm = () => import('/imports/ui/properties/forms/ConstantForm.vue');
const ContainerForm = () => import('/imports/ui/properties/forms/ContainerForm.vue');
const DamageForm = () => import('/imports/ui/properties/forms/DamageForm.vue');
const DamageMultiplierForm = () => import('/imports/ui/properties/forms/DamageMultiplierForm.vue');
const EffectForm = () => import('/imports/ui/properties/forms/EffectForm.vue');
const FeatureForm = () => import('/imports/ui/properties/forms/FeatureForm.vue');
const FolderForm = () => import('/imports/ui/properties/forms/FolderForm.vue');
const ItemForm = () => import('/imports/ui/properties/forms/ItemForm.vue');
const NoteForm = () => import('/imports/ui/properties/forms/NoteForm.vue');
const ProficiencyForm = () => import('/imports/ui/properties/forms/ProficiencyForm.vue');
const ReferenceForm = () => import('/imports/ui/properties/forms/ReferenceForm.vue');
const RollForm = () => import('/imports/ui/properties/forms/RollForm.vue');
const SavingThrowForm = () => import('/imports/ui/properties/forms/SavingThrowForm.vue');
const SkillForm = () => import('/imports/ui/properties/forms/SkillForm.vue');
const SlotForm = () => import('/imports/ui/properties/forms/SlotForm.vue');
const SlotFillerForm = () => import('/imports/ui/properties/forms/SlotFillerForm.vue');
const SpellListForm = () => import('/imports/ui/properties/forms/SpellListForm.vue');
const SpellForm = () => import('/imports/ui/properties/forms/SpellForm.vue');
const ToggleForm = () => import('/imports/ui/properties/forms/ToggleForm.vue');

export default {
  action: ActionForm,
  adjustment: AdjustmentForm,
  attack: AttackForm,
  attribute: AttributeForm,
  buff: BuffForm,
  constant: ConstantForm,
  container: ContainerForm,
  classLevel: ClassLevelForm,
  class: SlotForm,
  damage: DamageForm,
  damageMultiplier: DamageMultiplierForm,
  effect: EffectForm,
  feature: FeatureForm,
  folder: FolderForm,
  item: ItemForm,
  note: NoteForm,
  proficiency: ProficiencyForm,
  propertySlot: SlotForm,
  reference: ReferenceForm,
  roll: RollForm,
  savingThrow: SavingThrowForm,
  skill: SkillForm,
  slotFiller: SlotFillerForm,
  spellList: SpellListForm,
  spell: SpellForm,
  toggle: ToggleForm,
};
