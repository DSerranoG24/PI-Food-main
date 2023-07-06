const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require('./recipes');
const diets = require('./diets');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes',recipes);
router.use('/diets',diets);

router.use('*',(req,res)=>{
    res.status(400).json({error:"Not found"})
});

module.exports = router;
