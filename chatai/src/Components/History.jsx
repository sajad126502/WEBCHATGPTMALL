export default function History(props) {
  function formatDate(dateString) {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <>
      <div className="history d-flex flex-column gap-2 mb-5">
        <span>
          <span className="text-white fw-bold me-2">
            {props.index + 1 + "."}
          </span>
          <span className="user_input">{props.item.user_input}</span>
        </span>
        <span className="user_response">{props.item.response}</span>
        <span className="user_time">{formatDate(props.item.added_on)}</span>
      </div>
    </>
  );
}
