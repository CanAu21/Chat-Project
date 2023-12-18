const RoomPage = ({ setIsAuth, setRoom }) => {
  // oturumu kapatma
  const logout = () => {
    // state'i güncelle
    setIsAuth(false);
    // local'den kaldırma
    localStorage.removeItem("TOKEN");
  };

  // odaya gir
  const handleSubmit = (e) => {
    e.preventDefault();
    // oda ismini inputtan alma
    const roomName = e.target[0].value;
    // state güncelleme
    setRoom(roomName);
  };

  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Room</h1>
      <p>Which room will you enter?</p>
      <input type="text" />
      <button type="submit">Enter</button>
      <button type="button" onClick={logout}>
        Log Out
      </button>
    </form>
  );
};

export default RoomPage;
