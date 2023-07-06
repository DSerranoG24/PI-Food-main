const {Recipe}=require('../db');

const addRecipe =async ({title,image,summary,healthScore,steps,diets,vegetarian,vegan,glutenFree})=>{
    if(!(title && image && summary && healthScore && steps && diets && vegetarian !== null && vegan !== null && glutenFree !== null))throw Error('Faltan datos');
    const result =await Recipe.create({
        title,image,summary,healthScore,steps,vegetarian,vegan,glutenFree
    })
    await result.addDiets(diets);
    return result;
};

module.exports=addRecipe;