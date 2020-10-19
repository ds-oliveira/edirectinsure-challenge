export default function ActionIcon({image, marginRight, clickAction}) {
    return(
        <span onClick={clickAction} style={{float:"right", marginRight}}><img src={image}></img></span>
    )
}