import React from 'react'
import {Link} from 'react-router-dom';
import style from './Landing.module.css';

export default function Landing() {
  return (
    <div className={style.container}>
      <div className={style.buttonContainer}>
        <Link to={'/home'}>
            <button className={style.button}>Start</button>
        </Link>
      </div>
    </div>
  )
}
