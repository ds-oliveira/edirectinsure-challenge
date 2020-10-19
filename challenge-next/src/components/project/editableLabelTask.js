import styles from './editableLabelTask.module.css'

export default function EditableLabelTask({task, blur}){
    return (
        <input type="text" className={styles.editableLabel} defaultValue={task.name} style={{width:"80%",color: "blue"}} onBlur={blur}></input>
    )
}