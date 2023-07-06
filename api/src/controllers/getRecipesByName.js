const axios = require('axios');
const {Recipe, Diets}=require('../db');
const { Op } = require('sequelize');

const getRecipesByName =async (name)=>{
    const {URL, KEY} = process.env;
    const resultDBAUX = await Recipe.findAll({
      where: {title: {[Op.iLike]: `%${name}%`,}},
      include: [{
        model: Diets,
      }],
  
    });
    const resultDB = resultDBAUX.map((recipe)=>{
      const {id,title,image,diets,healthScore}=recipe;
      const change = diets.map(diet=>diet.name)
      return {id,title,image,change,origin:'db',healthScore};
    })
    const resultAPI = await axios
        .get(`${URL}/complexSearch?query=${name}&number=100&apiKey=${KEY}&addRecipeInformation=true`)
        .then(({data})=>{
          const result = data.results.map((dat)=>{
            const {id,title,image,diets,healthScore}=dat;
            return {id,title,image,diets,origin:'api',healthScore};
          })
          return result;
        })
        .catch((err)=>0);
    const result=[...resultDB,...resultAPI].slice(0,10);
    if(!result.length)throw Error('No existen recetas con ese nombre')
    return result;
    
    
};

module.exports=getRecipesByName;