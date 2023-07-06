const {Router} = require('express');
const getDietsH = require('../handlers/handlerDiets');
const diets = Router(); 

diets.get('/',getDietsH);

module.exports=diets;