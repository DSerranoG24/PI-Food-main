
import {
    GET_DIETS, GET_RECIPES,GET_RECIPE_BY_ID,FILTER_BY_ORIGIN,
    ORDER_SCORE, CLEAN_DETAIL, ALPHABET, FILTER_DIETS, GET_RECIPES_COPY, HELTHIER_THAN
 } from '../actionTypes/actionTypes';

const inicialState = {
    allRecipes:[],
    RecipeCopy:[],
    filterOrigin:[],
    filterDiets:[],
    order:[],
    RecipeDetail:{},
    Diets:[],
};

const root_Reducer = (state= inicialState, {type,payload})=>{
    switch (type) {
        case GET_RECIPES_COPY:
            return{...state,
                allRecipes:state.RecipeCopy,
                filterDiets:state.RecipeCopy,
                filterOrigin:state.RecipeCopy
            };

        case GET_RECIPES:

            return {...state,
                allRecipes:payload,
                RecipeCopy:payload,
                filterDiets:payload,
                filterOrigin:payload
            };

        case GET_RECIPE_BY_ID:
            return {...state, RecipeDetail:payload};

        case CLEAN_DETAIL:
            return{...state, RecipeDetail:{}};

        case GET_DIETS:
            return{...state,Diets:payload};

            
        case ORDER_SCORE:
            const aux = state.allRecipes.slice();
            // const copy = state.RecipeCopy.slice();

            payload == 'asc' ? aux.sort((a, b) => a.healthScore - b.healthScore):
            aux.sort((a, b) => b.healthScore - a.healthScore);

            // payload == 'asc' ? copy.sort((a, b) => a.healthScore - b.healthScore):
            // copy.sort((a, b) => b.healthScore - a.healthScore);

            return { ...state, allRecipes: aux};
            
        case ALPHABET:
            const aux2 = state.allRecipes.slice();

            payload == 'A-Z' ? aux2.sort((a, b) => a.title.localeCompare(b.title)):
            aux2.sort((a, b) => b.title.localeCompare(a.title));

            return { ...state, allRecipes: aux2};
                    
        case FILTER_BY_ORIGIN:
            const filtered = payload== 'all'?state.RecipeCopy: state.RecipeCopy.filter(recipe=>recipe.origin===payload);
            const filteres = filtered.filter(diet=>state.filterDiets.some((d)=>d.title===diet.title));
            return {...state,allRecipes:filteres, filterOrigin:filtered};

        case FILTER_DIETS: 
            const filtered2 = state.RecipeCopy.filter(diet=>diet.diets.includes(payload));
            const filteress = filtered2.filter(diet=>state.filterOrigin.some((d)=>d.title===diet.title))
            return {...state, allRecipes:filteress, filterDiets:filtered2};

        case HELTHIER_THAN:
            const filter = state.RecipeCopy.filter(recipe => recipe.healthScore >= payload);
            return{...state, allRecipes:filter};
            
        default:
            return state;
    }
}

export default root_Reducer;