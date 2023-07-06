const {Recipe} = require('../db');

const deleteRecipe = async(id)=>{
    const result = await Recipe.destroy({
        where:{id}
    })
    return result;
};

module.exports=deleteRecipe;