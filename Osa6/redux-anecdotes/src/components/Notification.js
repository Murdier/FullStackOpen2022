import { useSelector } from "react-redux"

const Notification = () => {
    let notification = useSelector(state => state.notification)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    console.log(notification);

    let text = notification

    if (notification.payload)
        text = notification.payload.content

    if (text === '') {
        return ('')
    }

    return (
        <div style={style}>
            {text}
        </div>
    )
}

export default Notification