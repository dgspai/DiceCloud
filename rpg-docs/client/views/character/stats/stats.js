Template.stats.events({
	"tap .statCard": function(event, instance){
		var charId = instance.data._id;
		if (this.isSkill){
			GlobalUI.setDetail({
				template: "skillDialog",
				data:     {
					name: this.name,
					skillName: this.stat,
					charId: charId,
					color: this.color,
				},
				heroId:   charId + this.stat,
			});
		} else {
			GlobalUI.setDetail({
				template: "attributeDialog",
				data:     {
					name: this.name,
					statName: this.stat,
					charId: charId,
					color: this.color,
				},
				heroId:   charId + this.stat,
			});
		}
	},
	"tap .abilityMiniCard": function(event, instance){
		var charId = Template.parentData()._id;
		var template = "attributeDialog";
		if (this.ability === "strength") template = "strengthDialog";
		GlobalUI.setDetail({
			template: template,
			data:     {
				name: this.title,
				statName: this.ability,
				charId: charId,
				color: this.color,
			},
			heroId:   charId + this.ability,
		});
	},
	"tap .skill-row": function(event, instance){
		var skill = this.skill;
		var charId = instance.data._id;
		GlobalUI.setDetail({
			template: "skillDialog",
			data:     {
				name: this.name,
				skillName: skill,
				charId: charId,
			},
			heroId:   charId + skill,
		});
	},
	"tap .hitPointTitle": function(event, instance) {
		GlobalUI.setDetail({
			template: "attributeDialog",
			data:     {
				name: "Hit Points",
				statName: "hitPoints",
				charId: this._id,
				color: "green",
			},
			heroId:   this._id + "hitPoints",
		});
	},
});

Template.stats.helpers({

});
