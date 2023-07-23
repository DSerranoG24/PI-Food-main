import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDiets, postRecipe } from '../../redux/actions/actions';
import Step from './Step/Step.component';
import  {validate}  from '../../hooks/validate';
import style from './Form.module.css';

export default function Form() {

  const dispatch = useDispatch();
  const allDiets = useSelector((state)=>state.Diets);
  const copy = useSelector(state=>state.RecipeCopy);
  const [recipes, setRecipes] = useState({
    title:'',
    summary:'',
    image:'',
    healthScore:'',
    diets:[],
    steps:[],
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    numSteps:1,
  })
  const [error, setError] = useState({
    title:'required',
    summary:'required',
    image:'required',
    healthScore:'required',
  })

  useEffect(()=>{
    dispatch(getDiets())
  },[dispatch])

  const handleDietsChange = (event) => {
    const { value, checked } = event.target;
    const index = Number(value);

    if (checked) {
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        diets: [...prevRecipes.diets, index],
      }));
    } else {
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        diets: prevRecipes.diets.filter((diet) => diet !== index),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postRecipe(recipes);
    setRecipes({
      title:'',
      summary:'',
      image:'',
      healthScore:'',
      diets:[],
      vegetarian: false,
	    vegan: false,
	    glutenFree: false,
      steps:[],
      numSteps:1,
    })
    setError({
      title:'required',
      summary:'required',
      image:'required',
      healthScore:'required',
    })
  };
  const handlerChange=(e)=>{
    const {value,name} = e.target;
    setRecipes({...recipes, [name]:value});
    setError(validate({...recipes, [name]:value},copy))
  }
  const handlerSteps = (stepsNum)=>{
    const steps = [];
    for (let i = 0; i < stepsNum; i++) {
      const input=<div key={i}>
        <label htmlFor="">{`step ${i+1}`}: </label>
        <Step cantidad={cantidad} steps={addSteps} id={i+1}/>
          </div>

      steps.push(input);
    }
    return steps;
  }

  const addSteps = (obj)=>{
    return setRecipes({...recipes,steps:[...recipes.steps,obj]})
  }


  const cantidad = (handler)=>{
    return <div>
      <select className={style.formSelect} name="" id="" defaultValue={1} onChange={handler}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  }

  const handlerNumSteps =(e)=>{
    const {value}=e.target;
    return setRecipes({...recipes,numSteps:value});
  }
  
  return (
    <div className={style.container}>
    <form className={style.formoContainer} onSubmit={handleSubmit}>
    
      <div className={style.formDiv}>
        <input
          className={style.formInput}
          type="text"
          name="title"
          onChange={handlerChange}
          value={recipes.title}
          id="inputField"
        />
        <label htmlFor="inputField" className={style.formLabel}>
          Title:
        </label>
      </div>
        <p className={style.error}>{error.title?error.title:''}</p> 

      <div className={style.formDiv}>
        <textarea
          className={style.formInput}
          name="summary"
          onChange={handlerChange}
          value={recipes.summary}
          id="inputField"
        />
        <label htmlFor="inputField" className={style.formLabel}>
          Summary:
        </label>
      </div>
        <p className={style.error}>{error.summary?error.summary:''}</p>

      <div className={style.formDiv}>
        <input
          className={style.formInput}
          type="text"
          name="image"
          onChange={handlerChange}
          value={recipes.image}
          id="inputField"
          />
        <label htmlFor="inputField" className={style.formLabel}>
          Image:
        </label>
      </div>
        <p className={style.error}>{error.image?error.image:''}</p> 
     
      <div className={style.formDiv}>
        <input
          className={style.formInput}
          type="text"
          name="healthScore"
          onChange={handlerChange}
          value={recipes.healthScore}
          id="inputField"
          />
        <label htmlFor="inputField" className={style.formLabel}>
          HealthSscore:
        </label>
      </div>
        <p className={style.error}>{error.healthScore?error.healthScore:''}</p> 

      <div className={style.dropdown}>

       <h2>Diets: </h2>
        <img className={style.diets} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIpQAE4ajpDsC03wM0LwCflLe5kcOBuFwz6w&usqp=CAU" alt="" />
       
       <div className={style.dropdownContent}>
       <br />
        {allDiets.map((diet, index) => (
        <label className={style.formCheckbox} key={index}>
          <input
            className={style.formInput}
            type="checkbox"
            value={index+1}
            checked={recipes.diets.includes(index+1)}
            onChange={handleDietsChange}
          />
          {diet}
        </label>
        ))} 
       </div>
      
      </div>
      

      <h2>Steps</h2>

      {cantidad(handlerNumSteps)}
      <br/>
      {handlerSteps(recipes.numSteps)}
      <button 
      disabled={Object.values(error).some((value) => value !== '')} 
      className={style.formButton} type="submit">Enviar</button>

      
    </form>
    </div>
  );
}
