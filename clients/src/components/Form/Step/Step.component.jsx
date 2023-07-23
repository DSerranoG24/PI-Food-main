import React, {useState} from 'react';
import style from './Step.module.css';

export default function Step({cantidad,steps,id}) {

    const [stepx,setStepx]=useState({
        id:id,
        step:'',
        ingredients:[],
        equipments: []
    })
    const [eqIn,setEqIn]=useState({
        ingredient:'',
        equipment:''
    });
    const [click,setClick]=useState(0);

    const handlerChangeStep = (e)=>{
        const {value}=e.target;
        setStepx({...stepx,step:value})
    }
    const addEqipOrIng =(e)=>{
        const {value,name}=e.target;
        setEqIn({...eqIn,[name]:value})
    };
    const addEqipment = (e)=>{
        e.preventDefault();
        setStepx({...stepx,equipments:[...stepx.equipments,eqIn.equipment]});
        console.log(stepx.equipments);
        setEqIn({...eqIn,
            equipment:''
        })
        
    };
    const addIngredint = (e)=>{
        e.preventDefault();
        setStepx({...stepx,ingredients:[...stepx.ingredients,eqIn.ingredient]});
        setEqIn({...eqIn,
            ingredient:''
        })
    };
    const addStep = (e)=>{
        e.preventDefault();
        steps(stepx);
        setClick(1);
        setStepx({
            id:id,
            step:'',
            ingredients:[],
            equipments: []
        });
    };

    

  return (
    <div className={style.stepContainer}>
      <input type="text" onChange={handlerChangeStep} value={stepx.step}/>
        <div className={style.stepInputs}>
            <label htmlFor="">Equipment: </label>
            <input type="text" onChange={addEqipOrIng} name='equipment' value={eqIn.equipment}/>
            <button onClick={(e)=>addEqipment(e)} >add</button>
        </div>
            <br />
            <ul>
                {stepx.equipments && stepx.equipments.map((equipment, index) =>{
                    return <li key={index}>
                        {equipment}
                    </li>
                })}
            </ul>
            <br />
        <div className={style.stepInputs}>
            <label htmlFor="">Ingredienet: </label>
            <input type="text" onChange={addEqipOrIng} name='ingredient' value={eqIn.ingredient}/>
            <button type='submit' onClick={addIngredint} >add</button>
        </div>
            <br />
            <ul>
                {stepx.ingredients && stepx.ingredients.map((ingredient, index) =>{
                    return <li key={index}>
                        {ingredient}
                    </li>
                })}
            </ul>
            <br />
            
        {click||!stepx.step?null:<button className={style.stepButton} onClick={addStep}>Listo</button>}
    </div>
  )
}
