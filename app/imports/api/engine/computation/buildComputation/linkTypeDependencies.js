import { get } from 'lodash';

const linkDependenciesByType = {
  action: linkAction,
  adjustment: linkAdjustment,
  attribute: linkAttribute,
  branch: linkBranch,
  buff: linkBuff,
  class: linkVariableName,
  classLevel: linkClassLevel,
  constant: linkVariableName,
  damage: linkDamage,
  damageMultiplier: linkDamageMultiplier,
  effect: linkEffects,
  proficiency: linkProficiencies,
  roll: linkRoll,
  slot: linkSlot,
  skill: linkSkill,
  spell: linkAction,
  spellList: linkSpellList,
  savingThrow: linkSavingThrow,
  toggle: linkToggle,
}

export default function linkTypeDependencies(dependencyGraph, prop, computation){
  linkDependenciesByType[prop.type]?.(dependencyGraph, prop, computation);
}

function dependOnCalc({dependencyGraph, prop, key}){
  let calc = get(prop, key);
  if (!calc) return;
  if (calc.type !== '_calculation'){
    console.log(calc);
    throw `Expected calculation got ${calc.type}`
  }
  dependencyGraph.addLink(prop._id, `${prop._id}.${key}`, 'calculation');
}

function linkAction(dependencyGraph, prop, {propsById}){
  // The action depends on its attack roll and uses calculations
  dependOnCalc({dependencyGraph, prop, key: 'attackRoll'});
  dependOnCalc({dependencyGraph, prop, key: 'uses'});

  // Link the resources the action uses
  if (!prop.resources) return;
  // Link items consumed
  prop.resources.itemsConsumed.forEach((itemConsumed, index) => {
    if (!itemConsumed.itemId) return;
    const item = propsById[itemConsumed.itemId];
    if (!item || item.inactive){
      // Unlink if the item doesn't exist or is inactive
      itemConsumed.itemId = undefined;
      return;
    }
    // none of these dependencies are computed, we can use them immediately
    itemConsumed.available = item.quantity;
    itemConsumed.itemName = item.name;
    itemConsumed.itemIcon = item.icon;
    itemConsumed.itemColor = item.color;
    dependencyGraph.addLink(prop._id, item._id, 'inventory');
    // Link the property to its resource quantity calculation

    dependOnCalc({
      dependencyGraph,
      prop,
      key: `${prop._id}.resources.itemsConsumed.${index}.quantity`,
    });
  });
  // Link attributes consumed
  prop.resources.attributesConsumed.forEach((attConsumed, index) => {
    if (!attConsumed.variableName) return;
    dependencyGraph.addLink(prop._id, attConsumed.variableName, 'resource');
    // Link the property to its resource quantity calculation
    dependOnCalc({
      dependencyGraph,
      prop,
      key: `${prop._id}.resources.attributesConsumed.${index}.quantity`,
    });
  });
}

function linkAdjustment(dependencyGraph, prop){
  // Adjustment depends on its amount
  dependOnCalc({dependencyGraph, prop, key: 'amount'});
}

function linkAttribute(dependencyGraph, prop){
  linkVariableName(dependencyGraph, prop);
  // Depends on spellSlotLevel
  dependOnCalc({dependencyGraph, prop, key: 'spellSlotLevel'});

  // Depends on base value
  dependOnCalc({dependencyGraph, prop, key: 'baseValue'});

  // hit dice depend on constitution
  if (prop.attributeType === 'hitDice'){
    dependencyGraph.addLink(prop._id, 'constitution', 'hitDiceConMod');
  }
}

function linkBranch(dependencyGraph, prop){
  dependOnCalc({dependencyGraph, prop, key: 'condition'});
}

function linkBuff(dependencyGraph, prop){
  dependOnCalc({dependencyGraph, prop, key: 'duration'});
}

function linkClassLevel(dependencyGraph, prop){
  // The variableName of the prop depends on the prop
  if (prop.variableName && prop.level){
    dependencyGraph.addLink(prop.variableName, prop._id, 'classLevel');
    // The level variable depends on the class variableName variable
    let existingLevelLink = dependencyGraph.getLink('level', prop.variableName);
    if (!existingLevelLink){
      dependencyGraph.addLink('level', prop.variableName, 'level');
    }
  }
}

function linkDamage(dependencyGraph, prop){
  dependOnCalc({dependencyGraph, prop, key: 'amount'});
}

function linkEffects(dependencyGraph, prop){
  // The effect depends on its amount calculation
  dependOnCalc({dependencyGraph, prop, key: 'amount'});
  // The stats depend on the effect
  prop.stats.forEach(statName => {
    if (!statName) return;
    dependencyGraph.addLink(statName, prop._id, 'effect');
  });
}

function linkRoll(dependencyGraph, prop){
  dependOnCalc({dependencyGraph, prop, key: 'roll'});
}

function linkVariableName(dependencyGraph, prop){
  // The variableName of the prop depends on the prop
  if (prop.variableName){
    dependencyGraph.addLink(prop.variableName, prop._id, 'definition');
  }
}

function linkDamageMultiplier(dependencyGraph, prop){
  prop.damageTypes.forEach(damageType => {
    // Remove all non-letter characters from the damage name
    const damageName = damageType.replace(/[^a-z]/gi, '')
    dependencyGraph.addLink(`${damageName}Multiplier`, prop._id, prop.type);
  });
}

function linkProficiencies(dependencyGraph, prop){
  // The stats depend on the proficiency
  prop.stats.forEach(statName => {
    if (!statName) return;
    dependencyGraph.addLink(statName, prop._id, prop.type);
  });
}

function linkSavingThrow(dependencyGraph, prop){
  dependOnCalc({dependencyGraph, prop, key: 'dc'});
}

function linkSkill(dependencyGraph, prop){
  linkVariableName(dependencyGraph, prop);
  // The prop depends on the variable references as the ability
  if (prop.ability){
    dependencyGraph.addLink(prop._id, prop.ability, 'skillAbilityScore');
  }
  // Skills depend on the creature's proficiencyBonus
  dependencyGraph.addLink(prop._id, 'proficiencyBonus', 'skillProficiencyBonus');
}

function linkSlot(dependencyGraph, prop){
  dependOnCalc({dependencyGraph, prop, key: 'quantityExpected'});
  dependOnCalc({dependencyGraph, prop, key: 'slotCondition'});
}

function linkSpellList(dependencyGraph, prop){
  dependOnCalc({dependencyGraph, prop, key: 'maxPrepared'});
  dependOnCalc({dependencyGraph, prop, key: 'attackRollBonus'});
  dependOnCalc({dependencyGraph, prop, key: 'dc'});
}

function linkToggle(dependencyGraph, prop){
  linkVariableName(dependencyGraph, prop);
  dependOnCalc({dependencyGraph, prop, key: 'condition'});
}
