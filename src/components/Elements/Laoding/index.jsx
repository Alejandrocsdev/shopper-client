// Module Style
import Styles from './style.module.css'

const Loading = ({ height }) => {
  return (
    <div className={Styles.loadingContainer}>
      <div
        style={{
          height: `${height}px`,
          border: `${(height / 100) * 16}px solid #ECEBF5`,
          borderTop: `${(height / 100) * 16}px solid #3498db`
        }}
        className={Styles.spinner}
      ></div>
    </div>
  )
}

export default Loading
