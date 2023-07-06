const {Router} = require('express');
const recipes = Router(); 
const {getRecipeByIdH, getRecipesByNameH, addRecipeH, deleteRecipeH} = require('../handlers/handlerRecipe');

recipes.get('/:id/:origin',getRecipeByIdH);
recipes.get('/',getRecipesByNameH);
recipes.post('/',addRecipeH);
recipes.delete('/:id',deleteRecipeH)

module.exports=recipes;