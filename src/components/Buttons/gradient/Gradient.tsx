import { useEffect } from 'react'
import { useButtonContext } from '../Button'
import style from './gradientstyle.module.css'

const Gradient = () => {
  const data = useButtonContext()

  useEffect(() => {
    document.documentElement.style.setProperty('--first-color', data.first!);
    document.documentElement.style.setProperty('--second-color', data.second!);
  }, []);

  return (
    <button id={data.id} onClick={data.onClick} className={style.btn}><div style={{backgroundColor: data.main}} className={style.label}><p className={style.p} style={{color: `${data.text}`}}>{data.content}</p></div></button>
  )
}

export default Gradient
