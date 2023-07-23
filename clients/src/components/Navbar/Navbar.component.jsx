import React, { useEffect} from 'react'
import style from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterByOrigin, orderScore, getDiets, filterDiets, getRecipes} from '../../redux/actions/actions';

export default function Navbar({handleChange,handleSubmit,setCurrentPage}) {

  const dispatch = useDispatch();
  const allDiets = useSelector(state=>state.Diets)

  useEffect(()=>{
    dispatch(getDiets())
  },[dispatch])

  const handlerOrigin = (e)=>{
    const {value} = e.target;
    setCurrentPage(1);
    dispatch(filterByOrigin(value));
  }
  const handlerOrder= (e)=>{
    const {value} = e.target; 
    setCurrentPage(1);
    dispatch(orderScore(value));
  }
  const handlerDiet = (e)=>{
    const {value} = e.target;
    setCurrentPage(1);
    dispatch(filterDiets(value));
  }
  return (
    <div className={style.navbarContainer}>
      <div className={style.navbarLogo}>
          <img src="https://www.nicepng.com/png/detail/761-7615272_the-chef-for-everyone-chef-daniel-logo.png"
           alt="Logo" className={style.logoImage}/>
      </div>
      <form className={style.navbarForm} onChange={(e)=>handleChange(e)}>

        <label htmlFor="">SELECT ORIGIN: </label>
        <select defaultValue='' onChange={handlerOrigin}>
          <option disabled hidden value=""></option>
          <option value="all">All</option>
          <option value="api">api</option>
          <option value="db">db</option>
        </select>
        <br/>

        <label htmlFor="">SELECT DIET</label>
        <select defaultValue='' onChange={handlerDiet}>
          <option disabled hidden value=""></option>
          {allDiets.map((diet, index)=>{
            return <option value={diet} key={index}>{diet}</option>
          })}
          <option value=""></option>
        </select>

        <br/>
        <label htmlFor="">SELECT ORDER: </label>
        <select defaultValue='' onChange={handlerOrder}>
          <option disabled hidden value=""></option>
          <option value="asc">Less healthy</option>
          <option value="desc">healthier</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>

        <input placeholder='Busqueda'/>
        <button type='submit' onClick={(e)=>handleSubmit(e)}>
          Buscar
        </button>
      </form>
    </div>
  )
}
