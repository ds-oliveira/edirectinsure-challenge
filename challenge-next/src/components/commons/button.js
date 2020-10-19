import styles from './button.module.css'

export default function Button({ children, clickFunction, backgroundColor, textColor, height, width, marginTop, marginRight, float }) {
    return (

            <button className={styles.button} onClick={clickFunction} style={{ float, backgroundColor, color: textColor, height, width , marginTop, marginRight}}>{children}</button>

    )
}