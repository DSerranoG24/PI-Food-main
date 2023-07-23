import React from 'react';
import style from './Card.module.css';
import {NavLink} from 'react-router-dom';

export default function Card({recipe}) {
  const {title,image,diets,id,origin,healthScore}= recipe;
  return (
    <div className={style.cardContainer} >
    <NavLink to={`/detail/${id}/${origin}`} style={{textDecoration: 'none'}}>
        <h2  className={style.title}>{title}</h2>
    </NavLink>
        
        <div>{diets.map((diet,index)=>{
          return <li key={index}>{diet}</li>
        })}</div>
        <h3>{healthScore}</h3>
        <img src={image} alt={title} />
    </div>
    
    
    
  )
}
