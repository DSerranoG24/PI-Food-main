import React from 'react'
import Card from '../Card/Card.component'
import style from './Cards.module.css';

export default function Cards({allRecipes}) {
  const recipes = allRecipes;
  return (
    <div className={style.cardList}>
      {recipes && recipes.map((recipe, index)=>{
        return <Card recipe={recipe} key={index}/>
      })}
    </div>
  )
}
