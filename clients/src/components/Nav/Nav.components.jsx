import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import style from './Nav.module.css';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../redux/actions/actions';

export default function Nav() {
  const {pathname}= useLocation()
  const dispatch = useDispatch();
  const handlerReset=(e)=>{
    dispatch(getRecipes());
  }
  if(pathname === "/home"){
    return (
      <div className={style.navContainer}>
        <div className={style.navLink}>
          <Link to={'/create'}>
          <button >Create</button>
          </Link>
        </div>
        <div className={style.navLink} onClick={handlerReset}>
            <button >Reset</button>
        </div>
      </div>
    )
  }
  
}
