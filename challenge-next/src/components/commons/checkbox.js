export default function Checkbox({ permanentChecked, isChecked, children, change }) {
    return (
        <div>
            <input type="checkbox" defaultChecked={isChecked} checked={permanentChecked} onChange={change}></input>
            {children}
        </div>
    )
}