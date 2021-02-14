import React, { useContext, useEffect, useState } from "react";
import app from "../Firbase/firebase";
import { AuthContext } from "../context/context";
import { v1 as uuid } from "uuid";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const ref = app.firestore().collection("Posts");

  const addData = (data) => {
    ref
      .doc(data.id)
      .set(data)
      .catch(() => {
        console.log("error");
      });
  };
  const deleteData = (id) => {
    ref
      .doc(id)
      .delete()
      .catch(() => {
        console.log("error");
      });
  };
  const getPost = () => {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      const data = items.filter((item) => item.by === currentUser.email);
      console.log(data);
      setPosts(data);
    });
  };

  const Update = (id) => {
    ref
      .doc(id)
      .update({ message: "null" })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      <h1>{currentUser.email}</h1>
      <button
        onClick={() =>
          addData({ by: currentUser.email, message: "hello", id: uuid() })
        }
      >
        Add
      </button>
      {posts.map((item, pos) => {
        return (
          <div key={pos}>
            <h1>{item.message}</h1>
            <button onClick={() => deleteData(item.id)}>Delete</button>
            <button onClick={() => Update(item.id)}>Update</button>
          </div>
        );
      })}
      <button onClick={() => app.auth().signOut()}>LogOut</button>
    </div>
  );
}

export default Home;
