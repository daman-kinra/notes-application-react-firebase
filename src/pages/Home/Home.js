import React, { useContext, useEffect, useState } from "react";
import app from "../../Firbase/firebase";
import { AuthContext } from "../../context/context";
import { v1 as uuid } from "uuid";
import NavBar from "../../components/Navbar/Navbar";
import "./Home.css";
import Button from "@material-ui/core/Button";
import MessageCard from "../../components/MessageCard/MessageCard";
function Home(props) {
  const {
    currentUser,
    addMessage,
    updateMessage,
    deleteMessage,
    getMessages,
    messages,
    input,
    setInput,
    clearInput,
    onClickEdit,
    edit,
    id,
  } = useContext(AuthContext);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <NavBar location={props.location} />
      <div className="home__main">
        <div className="inner__main">
          <div className="text__container">
            <textarea
              className="textarea"
              rows="3"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              placeholder="Enter your message here"
            />
            <div className="buttons">
              {edit === false ? (
                <Button
                  variant="contained"
                  color="primary"
                  className="add__button"
                  disabled={input === "" ? true : false}
                  onClick={(e) => {
                    addMessage({
                      message: input,
                      by: currentUser.email,
                      id: uuid(),
                    });
                  }}
                >
                  Add+
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className="add__button"
                  disabled={input === "" ? true : false}
                  onClick={(e) => {
                    updateMessage({
                      message: input,
                      id: id,
                    });
                  }}
                >
                  Edit
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                disabled={input === "" ? true : false}
                className="clear__button"
                onClick={clearInput}
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="user__cards">
            {messages.map((item) => {
              return (
                <MessageCard
                  key={item.id}
                  data={item}
                  deleteMessage={deleteMessage}
                  onClickEdit={onClickEdit}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
