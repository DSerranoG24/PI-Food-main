import React from 'react'
import Form from '../../components/Form/Form.component';
import style from './Create.module.css'
import {Link} from 'react-router-dom';

export default function Create() {
  return (
    <div className={style.container}>
      <Link to='/home'>
        <button className={style.back}>Back</button>
      </Link>
      <Form/>
    </div>
  )
}
