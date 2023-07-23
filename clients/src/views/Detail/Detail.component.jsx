import React, {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipeById, cleanDetail } from '../../redux/actions/actions';
import style from './Detail.module.css';

export default function Detail() {
  const dispatch = useDispatch();
  const {id,origin} = useParams();
  const recipe = useSelector((state)=>state.RecipeDetail);

  useEffect(()=>{
    dispatch(getRecipeById(id,origin));

    return ()=>{
      dispatch(cleanDetail())
    }
  },[id]);
  const {diets,healthScore,image,steps,summary,title}=recipe;
  

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.details}>

        <h1>{title}</h1>
        <p>
        <span dangerouslySetInnerHTML={{ __html: summary }} />
        </p>
        <h2>diets:{' '}</h2>
        
        <p>
        {diets && diets.map((diet, index) => {
          return <li key={index}>{diet}</li>;})}
        </p>
        <p>healthScore: {healthScore}</p>
        <div className={style.steps}>
        <h2>steps:</h2>
        {steps && steps.map((step, index) => {
        return (
          <div key={index} className={style.stepCard}>
        <h3>Step {index + 1}:</h3>
        <p>{step.step}</p>
        <h3>Ingredients</h3>
        <ul className={style.ingredientsList}>
        {step.ingredients && step.ingredients.map((ingredient, i) => {
          return (
            <li key={i}>
        {ingredient.name ? ingredient.name : ingredient}
        </li>
        )})}
        </ul>
        <h3>Equipments</h3>
        <ul className={style.equipmentsList}>
        {step.equipments && step.equipments.map((equipment, i) => {
          return (<li key={i}>
        {equipment.name ? equipment.name : equipment}
        </li>)})}
        </ul>
        </div>)})}
        </div>
        </div>
      </div>
      <div className={style.image} >
       <img  src={image} alt={title} /> 
      </div>
      <Link to='/home'>
        <button className={style.back}>Back</button>
      </Link>
      
    </div>
  );
}
