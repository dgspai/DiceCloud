import {
	setLineageOfDocs,
	renewDocIds
} from '/imports/api/parenting/parenting.js';
import {setDocToLastOrder} from '/imports/api/parenting/order.js';
import CreatureProperties from '/imports/api/creature/creatureProperties/CreatureProperties.js';
import computedSchemas from '/imports/api/properties/computedPropertySchemasIndex.js';
import applyFnToKey from '/imports/api/engine/computation/utility/applyFnToKey.js';
import { get } from 'lodash';
import resolve, { map } from '/imports/parser/resolve.js';
import logErrors from './shared/logErrors.js';

export default function applyBuff(node, {creature, targets, scope, log}){
  const prop = node.node;
  let buffTargets = prop.target === 'self' ? [creature] : targets;

  // Then copy the decendants of the buff to the targets
  let propList = [prop];
  function addChildrenToPropList(children){
    children.forEach(child => {
      propList.push(child.node);
      addChildrenToPropList(child.children);
    });
  }
  addChildrenToPropList(node.children);
  crystalizeVariables({propList, scope, log});

  let oldParent = {
    id: prop.parent.id,
    collection: prop.parent.collection,
  };
  buffTargets.forEach(target => {
    copyNodeListToTarget(propList, target, oldParent);
  });

  // Don't apply the children of the buff, they get copied to the target instead
}

function copyNodeListToTarget(propList, target, oldParent){
  let ancestry = [{collection: 'creatures', id: target._id}];
  setLineageOfDocs({
    docArray: propList,
    newAncestry: ancestry,
    oldParent,
  });
  renewDocIds({
    docArray: propList,
  });
  setDocToLastOrder({
    collection: CreatureProperties,
    doc: propList[0],
  });
  CreatureProperties.batchInsert(propList);
}

/**
 * Replaces all variables with their resolved values
 * except variables of the form `$target.thing.total` become `thing.total`
 */
function crystalizeVariables({propList, scope, log}){
  propList.forEach(prop => {
    computedSchemas[prop.type].computedFields().forEach( calcKey => {
      applyFnToKey(prop, calcKey, (prop, key) => {
        const calcObj = get(prop, key);
        if (!calcObj?.parseNode) return;
        map(calcObj.parseNode, node => {
          // Skip nodes that aren't symbols or accessors
          if (
            node.parseType !== 'accessor' && node.parseType !== 'symbol'
          ) return node;
          // Handle variables
          if (node.name === '$target'){
            // strip $target
            if (node.parseType === 'accessor'){
              node.name = node.path.shift();
            } else {
              // Can't strip symbols
              log.content.push({
                name: 'Error',
                value: 'Variable `$target` should not be used without a property: $target.property'
              });
            }
            return node;
          } else {
            // Resolve all other variables
            const {result, context} = resolve('reduce', node, scope);
            logErrors(context.errors, log);
            return result;
          }
        });
      });
    });
  });
}
