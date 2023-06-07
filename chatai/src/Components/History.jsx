export default function History(props) {
    return <>
     <div className="history d-flex flex-column gap-2 mb-5">
        <span className="user_input">{props.item.user_input}</span>
        <span className="user_response">{props.item.response}</span>
     </div>
    </>
}