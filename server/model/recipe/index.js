'use strict';
const recipe = require('./recipe');
const ingredient = require('./ingredient');
const step = require('./step');

//this file exposes all three classes with on require();

module.exports = {
    recipe: recipe,
    ingredient: ingredient,
    step: step,
}