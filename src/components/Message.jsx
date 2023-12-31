import { auth } from "../firebase/config";

const Message = ({ data }) => {
  // eğer oturumu açık olan kişinin id'si mesajı atan kişinin id'sine eşit ise ekrana bunu basacak
  if (auth.currentUser.uid === data.author.uid) {
    return <p className="msg-user">{data.text}</p>;
  }
  // idler eşit değilse bunu basacak

  return (
    <div className="msg-other">
      <p className="user-info">
        <img src={data.author.photo} />
        <span>{data.author.name}</span>
      </p>

      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Message;
