import axios from 'axios';
import { 
    GET_DIETS, GET_RECIPES,GET_RECIPE_BY_ID,FILTER_BY_ORIGIN,
    ORDER_SCORE, CLEAN_DETAIL,ALPHABET, FILTER_DIETS, GET_RECIPES_COPY, HELTHIER_THAN
} from '../actionTypes/actionTypes';

export const getRecipes = (string)=>{
    const url = string ? 
    `http://localHost:3001/recipes?name=${string}`:
    'http://localHost:3001/recipes';
    return (dispatch)=>{
        axios.get(url)
        .then(({data})=>dispatch({type:GET_RECIPES,payload:data}));
    };
};

export const getRecipesCopy = ()=>{
    return{type:GET_RECIPES_COPY}
}

export const getRecipeById = (id,origin)=>{
    const url = `http://localHost:3001/recipes/${id}/${origin}`;
    return(dispatch)=>{
        axios.get(url)
        .then(({data})=>dispatch({type:GET_RECIPE_BY_ID,payload:data}));
    } ;
};

export const cleanDetail = () =>{
    return {type:CLEAN_DETAIL};
};

export const getDiets = () =>{
    const url = `http://localHost:3001/diets`;
    return(dispatch)=>{
        axios.get(url)
        .then(({data})=>dispatch({type:GET_DIETS,payload:data}));
    };
};

export const postRecipe=(obj)=>{
    const url = `http://localHost:3001/recipes`;
    return axios.post(`${url}`,obj);
}

export const filterByOrigin = (origin) =>{
    return {type:FILTER_BY_ORIGIN,payload:origin};
};

export const orderScore = (order)=>{
    const type = (order=='asc'||order == 'desc')? ORDER_SCORE:ALPHABET;
    return {type:type,payload:order}
};

export const filterDiets =(diet)=>{
    return {type:FILTER_DIETS,payload:diet}
};

export const helthierThan = (num)=>{
    return {type:HELTHIER_THAN,payload:num}
};

