define([
    'jquery',
    'vue'
], function($, Vue) {
    'use strict';

    var msg = new Vue({
        el: "#mensaje",
        data: {
            mensaje: "Hola mundo"
        }
    });

});