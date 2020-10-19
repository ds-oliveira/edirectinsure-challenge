import styles from './form.module.css'

export default function Form({ children, width, marginTop, marginLeft }){
    return (
        <div className={styles.form} style={{width,marginTop, marginLeft}}>
            {children}
        </div>
    )
}