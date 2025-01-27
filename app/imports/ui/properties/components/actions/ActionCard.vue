<template lang="html">
  <v-card
    class="action-card"
    :class="cardClasses"
  >
    <div class="layout align-center px-3">
      <div class="avatar">
        <v-btn
          icon
          outlined
          style="font-size: 16px; letter-spacing: normal;"
          class="mr-2"
          :color="model.color || 'primary'"
          :loading="doActionLoading"
          :disabled="model.insufficientResources || !context.editPermission"
          @click.stop="doAction"
        >
          <template v-if="rollBonus && !rollBonusTooLong">
            {{ rollBonus }}
          </template>
          <property-icon
            v-else
            :model="model"
          />
        </v-btn>
      </div>
      <div
        class="action-header flex layout column justify-center pl-1"
        style="height: 72px; cursor: pointer;"
        @mouseover="hovering = true"
        @mouseleave="hovering = false"
        @click="$emit('click')"
      >
        <div
          class="action-title my-1"
        >
          {{ model.name || propertyName }}
        </div>
        <div class="action-sub-title layout align-center">
          <div class="flex">
            {{ model.actionType }}
          </div>
          <div v-if="Number.isFinite(model.usesLeft)">
            {{ model.usesLeft }} uses
          </div>
        </div>
      </div>
    </div>
    <div class="px-3 pb-3">
      <template
        v-if="model.resources && model.resources.attributesConsumed.length ||
          model.resources.itemsConsumed.length"
      >
        <attribute-consumed-view
          v-for="attributeConsumed in model.resources.attributesConsumed"
          :key="attributeConsumed._id"
          class="action-child"
          :model="attributeConsumed"
        />
        <item-consumed-view
          v-for="itemConsumed in model.resources.itemsConsumed"
          :key="itemConsumed._id"
          class="action-child"
          :model="itemConsumed"
          :action="model"
        />
        <v-divider
          v-if="model.summary"
          class="my-2"
        />
      </template>
      <template v-if="model.summary">
        <markdown-text
          :markdown="model.summary.value || model.summary.text"
        />
      </template>
    </div>
  </v-card>
</template>

<script lang="js">
import { getPropertyName } from '/imports/constants/PROPERTIES.js';
import numberToSignedString from '/imports/ui/utility/numberToSignedString.js';
import doAction from '/imports/api/engine/actions/doAction.js';
import AttributeConsumedView from '/imports/ui/properties/components/actions/AttributeConsumedView.vue';
import ItemConsumedView from '/imports/ui/properties/components/actions/ItemConsumedView.vue';
import PropertyIcon from '/imports/ui/properties/shared/PropertyIcon.vue';
import MarkdownText from '/imports/ui/components/MarkdownText.vue';

export default {
  components: {
    AttributeConsumedView,
    ItemConsumedView,
    MarkdownText,
    PropertyIcon,
  },
  inject: {
    context: {
      default: {},
    },
    theme: {
      default: {
        isDark: false,
      },
    },
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data(){return {
    activated: undefined,
    doActionLoading: false,
    hovering: false,
  }},
  computed: {
    rollBonus(){
      if (!this.model.attackRoll) return;
      return numberToSignedString(this.model.attackRoll.value);
    },
    rollBonusTooLong(){
      return this.rollBonus && this.rollBonus.length > 3;
    },
    propertyName(){
      return getPropertyName(this.model.type);
    },
    cardClasses() {
      return {
        'theme--dark': this.theme.isDark,
        'theme--light': !this.theme.isDark,
        'muted-text': this.model.insufficientResources,
        'shrink': this.activated,
        'elevation-8': this.hovering,
      }
    },
    actionTypeIcon() {
      return `$vuetify.icons.${this.model.actionType}`;
    },
	},
  methods: {
    click(e){
			this.$emit('click', e);
		},
    doAction(){
      this.doActionLoading = true;
      this.shwing();
      doAction.call({actionId: this.model._id}, error => {
        this.doActionLoading = false;
        if (error){
          console.error(error);
        }
      });
    },
    shwing(){
      this.activated = true;
      setTimeout(() => {
        this.activated = undefined;
      }, 300);
    }
  }
}
</script>

<style lang="css" scoped>
.action-card {
  transition: box-shadow .4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.action-title {
  font-size: 16px;
  font-weight: 400;
  height: 24px;
  line-height: 24px;
  position: relative;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: .3s cubic-bezier(.25,.8,.5,1);
  width: 100%;
}
.action-sub-title {
  color: #9e9e9e;
  flex-grow: 0;
  font-size: 12px;
  line-height: 12px;
  height: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.action-child {
  height: 32px;
}
.theme--light.muted-text {
  color: rgba(0,0,0,.3) !important;
}
.theme--dark.muted-text {
  color: hsla(0,0%,100%,.3) !important;
}
.action-card {
  transition: transform 0.15s cubic;
}
</style>

<style lang="css">
.action-card.theme--light.muted-text .v-icon {
  color: rgba(0,0,0,.3) !important;
}
.action-card.theme--dark.muted-text .v-icon {
  color: hsla(0,0%,100%,.3) !important;
}
.action-card .property-description > p:last-of-type {
  margin-bottom: 0;
}
</style>
