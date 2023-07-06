const addRecipe = require('../controllers/addRecipe');
const getRecipeById = require('../controllers/getRecipeById');
const getRecipesByName = require('../controllers/getRecipesByName');
const getRecipes = require('../controllers/getRecipes');
const deleteRecipe = require('../controllers/deleteRecipe');

const getRecipeByIdH=async(req,res)=>{
    const {id,origin} = req.params;
    try {
        const result = await getRecipeById(id,origin);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};
const getRecipesByNameH=async(req,res)=>{
    const {name} = req.query;
    try {
        const result =name ? await getRecipesByName(name):await getRecipes();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};
const addRecipeH=async(req,res)=>{
    try {
        const result = await addRecipe(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};
const deleteRecipeH = async(req,res)=>{
    const {id}=req.params;
    try {
        const result =await deleteRecipe(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
module.exports={
    getRecipeByIdH,
    getRecipesByNameH,
    addRecipeH,
    deleteRecipeH
}