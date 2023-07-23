import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../redux/actions/actions';
import React from 'react';
import style from './home.module.css';
import Pagination from '../../components/Pagination/Pagination.components';
import {helthierThan}  from '../../redux/actions/actions';

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const [healthierThans, setHealthierThans] = useState('');

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const handlerChange = (e)=>{
    const {value}= e.target;
    setHealthierThans(value);
  }

  const handlerSubmit = (e)=>{
    e.preventDefault();
    dispatch(helthierThan(Number(healthierThans)));
  }

  return (
    <div className={style.home}>
      <input type="text" value={healthierThans} onChange={handlerChange}/>
      <button type='submit' onClick={handlerSubmit}>HealthierThan</button>
      <Pagination allRecipes={allRecipes} />
      
    </div>
  );
}
