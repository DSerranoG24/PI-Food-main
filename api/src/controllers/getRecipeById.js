const axios = require('axios');
const {Recipe, Diets}=require('../db');
require("dotenv").config();
const { KEY, URL } = process.env;

const getRecipeById =async (id,origin)=>{
    let recipeId = id;
    if(origin == 'db'){
        const result = await Recipe.findAll({where:{id:recipeId}, include:Diets});
        if(!result.length)throw Error('Receta inexistente')
        const {id,title,image,summary,healthScore,steps,diets,vegetarian,vegan,glutenFree}=result[0];
        let aux = diets && diets.map((diet)=>diet.name)
        return {id,title,image,summary,healthScore,steps,diets:aux,vegetarian,vegan,glutenFree, origin:'db'}; 
    }
    if(origin != 'api') throw Error('Segundo parametro no corresponde');
    const resultAPI = await axios.get(`${URL}/${id}/information?apiKey=${KEY}`).catch((err)=>0);
    if(!resultAPI)throw Error('Receta inexistente')
    const {title,image,summary,healthScore,analyzedInstructions, diets,vegetarian,vegan,glutenFree}=resultAPI.data;
    const steps =  analyzedInstructions[0].steps.map(stepx=>{
        const {step,equipment,ingredients} =  stepx;
        return {step,ingredients,equipments:equipment};
    })
    
    return {
        id,title,image,summary,healthScore,
        steps:analyzedInstructions[0] ?steps :'there are no steps',
        diets,vegetarian,vegan,glutenFree, origin:'api'
    };
};

module.exports=getRecipeById;