import React, { useEffect, useState } from "react";
import app from "../Firbase/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const ref = app.firestore().collection("Posts");

  const clearInput = () => {
    setInput("");
  };

  const addMessage = (data) => {
    ref
      .doc(data.id)
      .set(data)
      .then(() => {
        setInput("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteMessage = (id) => {
    ref
      .doc(id)
      .delete()
      .catch((err) => {
        alert(err);
      });
  };
  const onClickEdit = (id) => {
    const data = messages.filter((item) => item.id === id);
    setInput(data[0].message);
    setEdit(true);
    setId(id);
  };
  const getMessages = () => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      const data = items.filter((item) => item.by === currentUser.email);
      setMessages(data);
    });
  };

  const updateMessage = (data) => {
    ref
      .doc(data.id)
      .update({ message: data.message })
      .then(() => {
        setInput("");
        setEdit(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        addMessage,
        updateMessage,
        deleteMessage,
        getMessages,
        messages,
        setInput,
        input,
        clearInput,
        onClickEdit,
        id,
        edit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
