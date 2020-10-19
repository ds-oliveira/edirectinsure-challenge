import styles from './input.module.css'

export default function Input({ type, placeholder, width, height, changeFunction, name, value }) {
    return (

            <div style={{ width, float: "left", display:"inline-block" }}>
                <input name={name} type={type} value={value} className={styles.input} placeholder={placeholder} style={{width: "100%", height }} onChange={changeFunction}></input>
            </div>

    )
}