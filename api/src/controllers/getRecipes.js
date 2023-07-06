const axios = require('axios');
const {Recipe, Diets} = require('../db');

const getRecipes =async ()=>{
    const {URL, KEY} = process.env;
    const resultAPI = await axios.get(`${URL}/complexSearch?apiKey=${KEY}&number=100&addRecipeInformation=true`);
    const Recipes = resultAPI.data.results.map((recipe)=>{
        const {id,title,image,diets,healthScore}=recipe;
        return {id,title,image,diets,origin:'api',healthScore};
    })
    const resultDBAUX =await Recipe.findAll({
        include: [{
          model: Diets,
        }],
    
      }) 
    const resultDB = resultDBAUX.map((recipe)=>{
        const {id,title,image,diets,healthScore}=recipe;
        const change = diets.map(diet=>diet.name)
        return {id,title,image,diets:change,origin:'db',healthScore};
      })
    // const result=;
    return resultDB.concat(Recipes);
};

module.exports=getRecipes;