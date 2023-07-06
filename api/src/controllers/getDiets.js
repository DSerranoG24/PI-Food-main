const {Diets} = require('../db');
const axios = require('axios'); 

const getDiets = async()=>{
    const result = await Diets.findAll();
    if (result.length){
        const diets = result.map(diet=>diet.name);
        return diets;
    };
    const {URL, KEY} = process.env;
    const resultAPI = await axios.get(`${URL}/complexSearch?apiKey=${KEY}&number=100&addRecipeInformation=true`);
    const DietsApi = resultAPI.data.results.map((recipe)=>{
        const {diets}=recipe;
        return diets;
    })
    const uniqueDiets = [...new Set(DietsApi.flat())];
    uniqueDiets.forEach((diet,index)=>Diets.create({id:index+1,name:diet}));
    return uniqueDiets
};

module.exports=getDiets