import React, { useEffect, useState } from "react";
import app from "../Firbase/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children, history }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const ref = app.firestore().collection("Posts");
  const [loading, setLoading] = useState(false);

  const clearInput = () => {
    setInput("");
  };

  const addMessage = (data) => {
    setLoading(true);
    ref
      .doc(data.id)
      .set(data)
      .then(() => {
        setInput("");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteMessage = (id) => {
    setLoading(true);
    ref
      .doc(id)
      .delete()
      .then(() => {
        setLoading(false);
      })
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
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      const data = items.filter((item) => item.by === currentUser.email);
      setMessages(data);
      setLoading(false);
    });
  };

  const updateMessage = (data) => {
    setLoading(true);
    ref
      .doc(data.id)
      .update({ message: data.message })
      .then(() => {
        setInput("");
        setEdit(false);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
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
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
