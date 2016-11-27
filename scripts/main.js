define([
    'jquery',
    'vue',
    'bootstrap'
], function($, Vue) {
    'use strict';
    return {

        abilityModifier: function(abilityScore) {
            return Math.floor((abilityScore - 10) / 2);
        },

        halfLevelModifier: function(level) {
            return Math.floor(level / 2);
        },

        init: function() {

            var self = this;

            // if (!localStorage.getItem("my-character")) {
            $.getJSON(
                "scripts/griff.json",
                function(data) {
                    self.loadCharacter(data);
                });
            //  } else {
            //    var character = JSON.parse(localStorage.getItem("my-character"));
            //  this.loadCharacter(character);
            // }
        },

        loadCharacter: function(character) {
            var self = this;
            Vue.component('player-name', {
                template: '<div id="name"><h2>{{playerName}}</div>',
                data: function() {
                    return character.player;
                }
            });

            var header = new Vue({
                el: "#sheet_header",
                methods: {
                    exportCharacter: function(event) {
                        var characterData = JSON.stringify(character);
                        var dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(characterData);

                        var filename = character.info.name + '.json';
                        var link = document.createElement('a');
                        link.setAttribute('href', dataUri);
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
            });

            var characterInfo = new Vue({
                el: "#character_info",
                data: character.info,
                computed: {
                    className: function() {
                        return character.class ? character.class.name : "";
                    },
                    raceName: function() {
                        return character.race ? character.race.name : "";
                    }
                }
            });

            var abilities = new Vue({
                el: "#abilites",
                data: character.abilities,
                computed: {
                    strMod: function() {
                        return self.abilityModifier(this.strength);
                    },
                    strMod_lvl: function() {
                        return self.abilityModifier(this.strength) + self.halfLevelModifier(character.info.level);
                    },
                    dexMod: function() {
                        return self.abilityModifier(this.dexterity);
                    },
                    dexMod_lvl: function() {
                        return self.abilityModifier(this.dexterity) + self.halfLevelModifier(character.info.level);
                    },
                    conMod: function() {
                        return self.abilityModifier(this.constitution);
                    },
                    conMod_lvl: function() {
                        return self.abilityModifier(this.constitution) + self.halfLevelModifier(character.info.level);
                    },
                    intMod: function() {
                        return self.abilityModifier(this.intelligence);
                    },
                    intMod_lvl: function() {
                        return self.abilityModifier(this.intelligence) + self.halfLevelModifier(character.info.level);
                    },
                    wisMod: function() {
                        return self.abilityModifier(this.wisdom);
                    },
                    wisMod_lvl: function() {
                        return self.abilityModifier(this.wisdom) + self.halfLevelModifier(character.info.level);
                    },
                    chaMod: function() {
                        return self.abilityModifier(this.charisma);
                    },
                    chaMod_lvl: function() {
                        return self.abilityModifier(this.charisma) + self.halfLevelModifier(character.info.level);
                    }
                }
            });

            var initiative = new Vue({
                el: "#initiative",
                data: character.initiative,
                computed: {
                    initiative: function() {
                        return abilities.dexMod_lvl + this.initBonus;
                    }
                }
            });

            var health = new Vue({
                el: "#hit-points",
                data: character.hitPoints,
                computed: {
                    maxHP: function() {
                        return this.baseHP + character.abilities.constitution + ((character.info.level - 1) * this.classHP);
                    },
                    surgeValue: function() {
                        return Math.floor((this.baseHP + character.abilities.constitution + ((character.info.level - 1) * this.classHP)) / 4);
                    },
                    maxHealingSurges: function() {
                        return character.class ? character.class.surgesDay : 0;
                    }
                }
            });

            var skills = new Vue({
                el: "#skills",
                data: character.skills,
                computed: {
                    acroSkill: function() {
                        return abilities.dexMod + self.halfLevelModifier(character.info.level) + (this.acroSkillTrained ? 5 : 0) + this.acroSkillMisc;
                    },
                    arcaSkill: function() {
                        return abilities.intMod + self.halfLevelModifier(character.info.level) + (this.arcaSkillTrained ? 5 : 0) + this.arcaSkillMisc;
                    },
                    athlSkill: function() {
                        return abilities.strMod + self.halfLevelModifier(character.info.level) + (this.athlSkillTrained ? 5 : 0) + this.athlSkillMisc;
                    },
                    blufSkill: function() {
                        return abilities.chaMod + self.halfLevelModifier(character.info.level) + (this.blufSkillTrained ? 5 : 0) + this.blufSkillMisc;
                    },
                    diplSkill: function() {
                        return abilities.chaMod + self.halfLevelModifier(character.info.level) + (this.diplSkillTrained ? 5 : 0) + this.diplSkillMisc;
                    },
                    dungSkill: function() {
                        return abilities.wisMod + self.halfLevelModifier(character.info.level) + (this.dungSkillTrained ? 5 : 0) + this.dungSkillMisc;
                    },
                    enduSkill: function() {
                        return abilities.conMod + self.halfLevelModifier(character.info.level) + (this.enduSkillTrained ? 5 : 0) + this.enduSkillMisc;
                    },
                    healSkill: function() {
                        return abilities.wisMod + self.halfLevelModifier(character.info.level) + (this.healSkillTrained ? 5 : 0) + this.healSkillMisc;
                    },
                    histSkill: function() {
                        return abilities.intMod + self.halfLevelModifier(character.info.level) + (this.histSkillTrained ? 5 : 0) + this.histSkillMisc;
                    },
                    insiSkill: function() {
                        return abilities.wisMod + self.halfLevelModifier(character.info.level) + (this.insiSkillTrained ? 5 : 0) + this.insiSkillMisc;
                    },
                    intiSkill: function() {
                        return abilities.chaMod + self.halfLevelModifier(character.info.level) + (this.intiSkillTrained ? 5 : 0) + this.intiSkillMisc;
                    },
                    natuSkill: function() {
                        return abilities.wisMod + self.halfLevelModifier(character.info.level) + (this.natuSkillTrained ? 5 : 0) + this.natuSkillMisc;
                    },
                    percSkill: function() {
                        return abilities.wisMod + self.halfLevelModifier(character.info.level) + (this.percSkillTrained ? 5 : 0) + this.percSkillMisc;
                    },
                    reliSkill: function() {
                        return abilities.intMod + self.halfLevelModifier(character.info.level) + (this.reliSkillTrained ? 5 : 0) + this.reliSkillMisc;
                    },
                    steaSkill: function() {
                        return abilities.dexMod + self.halfLevelModifier(character.info.level) + (this.steaSkillTrained ? 5 : 0) + this.steaSkillMisc;
                    },
                    streSkill: function() {
                        return abilities.chaMod + self.halfLevelModifier(character.info.level) + (this.streSkillTrained ? 5 : 0) + this.streSkillMisc;
                    },
                    thieSkill: function() {
                        return abilities.dexMod + self.halfLevelModifier(character.info.level) + (this.thieSkillTrained ? 5 : 0) + this.thieSkillMisc;
                    }
                }
            });

            var defenses = new Vue({
                el: "#defenses",
                data: character.defenses,
                computed: {
                    characterAC: function() {
                        return 10 + self.halfLevelModifier(character.info.level) +
                            (character.armor ? character.armor.acBonus + (character.armor.type === 'L' ? Math.max(abilities.dexMod, abilities.intMod) : 0) : 0) +
                            this.acEnhancementBonus +
                            this.acMiscBonus; //+ class + feat;
                    },
                    characterFortitude: function() {
                        return 10 + self.halfLevelModifier(character.info.level) + Math.max(abilities.strMod, abilities.conMod) + this.fortitudeEnhancementBonus + this.fortitudeMiscBonus;
                        // + class + feat
                    },
                    characterReflex: function() {
                        return 10 + self.halfLevelModifier(character.info.level) + Math.max(abilities.dexMod, abilities.intMod) + this.reflexEnhancementBonus + this.reflexMiscBonus;
                        // + class + feat
                    },
                    characterWill: function() {
                        return 10 + self.halfLevelModifier(character.info.level) + Math.max(abilities.wisMod, abilities.chaMod) + this.willEnhancementBonus + this.willMiscBonus;
                        // + class + feat
                    }
                }
            });

            var movement = new Vue({
                el: "#movement",
                data: character.movement,
                computed: {
                    speed: function() {
                        return 6 + this.speedMiscBonus; //race - armor 
                    }
                }
            });

            Vue.component('attack-bonus', {
                props: ['attack'],
                template: '<div class="well well-sm atk-inline">' +
                    '<input type="text" class="atk-inp-modal" v-model="{{totalAttackBonus}}" disabled>' +
                    '</div>' +
                    '<div class="well well-sm atk-inline">VS</div>' +
                    '<div class="well well-sm atk-inline">' +
                    '<input type="text" class="atk-inp-modal" v-model="{{attack.versus}}" disabled>' +
                    '</div>',
                computed: {
                    totalAttackBonus: function() {
                        return Object.keys(attack.attackBonus).reduce(function(previous, key) { return previous + attack.attackBonus[key]; }, 0);
                    }
                }
            });

            var attacks = new Vue({
                el: "#attack-workspace",
                data: character.combat,
            });

            //localStorage.setItem("my-character", JSON.stringify(character));
        }
    }

});