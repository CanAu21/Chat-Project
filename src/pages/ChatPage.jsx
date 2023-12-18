import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);

  // kolleksiyonun referansını alma
  const messagesCol = collection(db, "messages");

  // filtreleme ayarları oluştur
  const queryOptions = query(
    messagesCol,
    where("room", "==", room),
    orderBy("createdAt", "asc")
  );

  // verilere abone ol
  useEffect(() => {
    // anlık olarak kolleksiyondaki değişimleri izler
    // kolleksiyon her değiştiğinde verdiğimiz fonsiyonu çalıştırır
    const unsub = onSnapshot(queryOptions, (snapshot) => {
      // geçici olarak mesajları tuttuğumuz dizi
      const tempMsg = [];

      // dökümanların tamamnı dönerek verilerine erişip diziye aktarma
      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));

      // state'a aktarma
      setMessages(tempMsg);
    });

    // kullanıcı bileşenden ayrılınca aboneliği sonlandır
    return () => unsub();
  }, []);

  // mesajı veritabanına ekle
  const handleSubmit = async (e) => {
    e.preventDefault();

    // mesaj içeriğini alma
    const text = e.target[0].value;

    // veritabanına yeni döküman ekler
    // 1. parametre: ekleme yapacağımız koleksiyonun referansı
    // 2. parametre: oluşturacağımız döküman verileri
    await addDoc(messagesCol, {
      text,
      room,
      author: {
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // mesaj attıktan sonra formun sıfırlanması
    e.target.reset();
  };

  return (
    <div className="chat-page">
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Change Room</button>
      </header>

      <main>
        {messages.map((data, i) => (
          <Message data={data} key={i} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input type="text" required placeholder="message.." />
        <button>Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
