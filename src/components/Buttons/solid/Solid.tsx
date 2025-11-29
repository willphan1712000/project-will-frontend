import { useButtonContext } from '../Button'
import stylesFunc from './styles'

const Solid = () => {
  const data = useButtonContext()
  const styles = stylesFunc(data.first!)

  return (
    <div style={{
      position: "relative",
    }}>
      <button style={styles.btn} {...data.props}>
        <div style={{position: "relative"}}>
          <div style={styles.labelBefore}></div>
          <div style={{
            ...styles.label,
            backgroundColor: data.main
          }}>
            <p style={{
              ...styles.p,
              color: `${data.text}`}}>{data.content}</p>
          </div>
          <div style={styles.labelAfter}></div>
        </div>
      </button>
      <div style={styles.btnAfter}></div>
    </div>
  )
}

export default Solid
