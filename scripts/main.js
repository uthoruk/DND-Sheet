define([
    'jquery',
    'vue'
], function($, Vue) {
    'use strict';

    $.ajax({
        method: "GET",
        url: "http://mydndapi.azurewebsites.net/api/character/Griff/" //Change url in live
    }).done(function(character) {

        var msg = new Vue({
            el: "#abilites",
            data: character,
            computed: {
                strMod: function() {
                    return abilityModifier(this.strength);
                },
                strMod_lvl: function() {
                    return abilityModifier(this.strength) + halfLevelModifier(this.level);
                },
                dexMod: function() {
                    return abilityModifier(this.dexterity);
                },
                dexMod_lvl: function() {
                    return abilityModifier(this.dexterity) + halfLevelModifier(this.level);
                },
                conMod: function() {
                    return abilityModifier(this.constitution);
                },
                conMod_lvl: function() {
                    return abilityModifier(this.constitution) + halfLevelModifier(this.level);
                },
                intMod: function() {
                    return abilityModifier(this.intelligence);
                },
                intMod_lvl: function() {
                    return abilityModifier(this.intelligence) + halfLevelModifier(this.level);
                },
                wisMod: function() {
                    return abilityModifier(this.wisdom);
                },
                wisMod_lvl: function() {
                    return abilityModifier(this.wisdom) + halfLevelModifier(this.level);
                },
                chaMod: function() {
                    return abilityModifier(this.charisma);
                },
                chaMod_lvl: function() {
                    return abilityModifier(this.charisma) + halfLevelModifier(this.level);
                }
            }
        });


    });

});

function abilityModifier(abilityScore) {
    return Math.floor((abilityScore - 10) / 2);
}

function halfLevelModifier(level) {
    return Math.floor(level / 2);
}