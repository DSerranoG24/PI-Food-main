const getDiets = require("../controllers/getDiets");

const getDietsH = async(req,res)=>{
    try {
        const result = await getDiets(); 
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};

module.exports=getDietsH; 