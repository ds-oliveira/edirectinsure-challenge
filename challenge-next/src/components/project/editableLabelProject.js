import styles from './editableLabelProject.module.css'

export default function EditableLabelProject({defaultValue, blur}){
    return (
        <input type="text" className={styles.editableLabel} defaultValue={defaultValue} onBlur={blur} style={{width:"90%"}}></input>
    )
}