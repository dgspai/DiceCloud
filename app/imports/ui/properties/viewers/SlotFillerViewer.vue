<template lang="html">
  <div class="slot-filler-viewer">
    <v-row dense>
      <property-field
        name="Type"
        :value="slotTypeName"
      />
      <property-field
        name="Quantity filled"
        :value="model.slotQuantityFilled"
      />
      <property-field
        v-if="context.creatureId"
        name="Condition"
        mono
        :value="model.slotFillerCondition"
      />
      <property-field
        v-if="model.picture"
        name="Image"
        :cols="{cols: 12}"
      >
        <v-img
          :src="model.picture"
          :height="200"
          contain
          class="slot-card-image"
        />
      </property-field>
      <property-field
        name="Description"
        :cols="{cols: 12}"
        :value="model.description"
      />
    </v-row>
  </div>
</template>

<script lang="js">
	import propertyViewerMixin from '/imports/ui/properties/viewers/shared/propertyViewerMixin.js';
  import { getPropertyName } from '/imports/constants/PROPERTIES.js';

	export default {
		mixins: [propertyViewerMixin],
    inject: {
      context: { default: {} }
    },
    computed: {
      slotTypeName(){
        if (!this.model.slotFillerType) return;
        return getPropertyName(this.model.slotFillerType);
      },
    }
	}
</script>
