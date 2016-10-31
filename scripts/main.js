define([
    'jquery',
    'vue',
    'bootstrap'
], function($, Vue) {
    'use strict';
    return {

        init: function() {

            $.getJSON(
                "scripts/griff.json",
                function(character) {

                    Vue.component('player-name', {
                        template: '<div id="name"><h2>{{playerName}}</div>',
                        data: function() {
                            return character.player;
                        }
                    });

                    var header = new Vue({
                        el: "#sheet_header"
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
                                return abilityModifier(this.strength);
                            },
                            strMod_lvl: function() {
                                return abilityModifier(this.strength) + halfLevelModifier(character.info.level);
                            },
                            dexMod: function() {
                                return abilityModifier(this.dexterity);
                            },
                            dexMod_lvl: function() {
                                return abilityModifier(this.dexterity) + halfLevelModifier(character.info.level);
                            },
                            conMod: function() {
                                return abilityModifier(this.constitution);
                            },
                            conMod_lvl: function() {
                                return abilityModifier(this.constitution) + halfLevelModifier(character.info.level);
                            },
                            intMod: function() {
                                return abilityModifier(this.intelligence);
                            },
                            intMod_lvl: function() {
                                return abilityModifier(this.intelligence) + halfLevelModifier(character.info.level);
                            },
                            wisMod: function() {
                                return abilityModifier(this.wisdom);
                            },
                            wisMod_lvl: function() {
                                return abilityModifier(this.wisdom) + halfLevelModifier(character.info.level);
                            },
                            chaMod: function() {
                                return abilityModifier(this.charisma);
                            },
                            chaMod_lvl: function() {
                                return abilityModifier(this.charisma) + halfLevelModifier(character.info.level);
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
                                return abilities.dexMod + halfLevelModifier(character.info.level) + (this.acroSkillTrained ? 5 : 0) + this.acroSkillMisc;
                            },
                            arcaSkill: function() {
                                return abilities.intMod + halfLevelModifier(character.info.level) + (this.arcaSkillTrained ? 5 : 0) + this.arcaSkillMisc;
                            },
                            athlSkill: function() {
                                return abilities.strMod + halfLevelModifier(character.info.level) + (this.athlSkillTrained ? 5 : 0) + this.athlSkillMisc;
                            },
                            blufSkill: function() {
                                return abilities.chaMod + halfLevelModifier(character.info.level) + (this.blufSkillTrained ? 5 : 0) + this.blufSkillMisc;
                            },
                            diplSkill: function() {
                                return abilities.chaMod + halfLevelModifier(character.info.level) + (this.diplSkillTrained ? 5 : 0) + this.diplSkillMisc;
                            },
                            dungSkill: function() {
                                return abilities.wisMod + halfLevelModifier(character.info.level) + (this.dungSkillTrained ? 5 : 0) + this.dungSkillMisc;
                            },
                            enduSkill: function() {
                                return abilities.conMod + halfLevelModifier(character.info.level) + (this.enduSkillTrained ? 5 : 0) + this.enduSkillMisc;
                            },
                            healSkill: function() {
                                return abilities.wisMod + halfLevelModifier(character.info.level) + (this.healSkillTrained ? 5 : 0) + this.healSkillMisc;
                            },
                            histSkill: function() {
                                return abilities.intMod + halfLevelModifier(character.info.level) + (this.histSkillTrained ? 5 : 0) + this.histSkillMisc;
                            },
                            insiSkill: function() {
                                return abilities.wisMod + halfLevelModifier(character.info.level) + (this.insiSkillTrained ? 5 : 0) + this.insiSkillMisc;
                            },
                            intiSkill: function() {
                                return abilities.chaMod + halfLevelModifier(character.info.level) + (this.intiSkillTrained ? 5 : 0) + this.intiSkillMisc;
                            },
                            natuSkill: function() {
                                return abilities.wisMod + halfLevelModifier(character.info.level) + (this.natuSkillTrained ? 5 : 0) + this.natuSkillMisc;
                            },
                            percSkill: function() {
                                return abilities.wisMod + halfLevelModifier(character.info.level) + (this.percSkillTrained ? 5 : 0) + this.percSkillMisc;
                            },
                            reliSkill: function() {
                                return abilities.intMod + halfLevelModifier(character.info.level) + (this.reliSkillTrained ? 5 : 0) + this.reliSkillMisc;
                            },
                            steaSkill: function() {
                                return abilities.dexMod + halfLevelModifier(character.info.level) + (this.steaSkillTrained ? 5 : 0) + this.steaSkillMisc;
                            },
                            streSkill: function() {
                                return abilities.chaMod + halfLevelModifier(character.info.level) + (this.streSkillTrained ? 5 : 0) + this.streSkillMisc;
                            },
                            thieSkill: function() {
                                return abilities.dexMod + halfLevelModifier(character.info.level) + (this.thieSkillTrained ? 5 : 0) + this.thieSkillMisc;
                            }
                        }
                    });

                    var defenses = new Vue({
                        el: "#defenses",
                        data: character.defenses,
                        computed: {
                            characterAC: function() {
                                return 10 + halfLevelModifier(character.info.level) +
                                    (character.armor ? character.armor.acBonus + (character.armor.type === 'L' ? Math.max(abilities.dexMod, abilities.intMod) : 0) : 0) +
                                    this.acEnhancementBonus +
                                    this.acMiscBonus; //+ class + feat;
                            },
                            characterFortitude: function() {
                                return 10 + halfLevelModifier(character.info.level) + Math.max(abilities.strMod, abilities.conMod) + this.fortitudeEnhancementBonus + this.fortitudeMiscBonus;
                                // + class + feat
                            },
                            characterReflex: function() {
                                return 10 + halfLevelModifier(character.info.level) + Math.max(abilities.dexMod, abilities.intMod) + this.reflexEnhancementBonus + this.reflexMiscBonus;
                                // + class + feat
                            },
                            characterWill: function() {
                                return 10 + halfLevelModifier(character.info.level) + Math.max(abilities.wisMod, abilities.chaMod) + this.willEnhancementBonus + this.willMiscBonus;
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

                });
        },

        abilityModifier: function(abilityScore) {
            return Math.floor((abilityScore - 10) / 2);
        },

        halfLevelModifier: function(level) {
            return Math.floor(level / 2);
        }

    }
});