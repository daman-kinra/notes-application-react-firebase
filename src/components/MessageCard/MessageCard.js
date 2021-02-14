import React from "react";
import "./MessageCard.css";
import Button from "@material-ui/core/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";

function MessageCard(props) {
  return (
    <div className="message__main">
      <div className="by__heading">
        <span>By:</span>
        <p>{props.data.by}</p>
      </div>
      <div className="message__content">
        <p>
          {" "}
          <span>Message:</span>
          {props.data.message}
        </p>
      </div>
      <div className="update__delete__buttons">
        <Tooltip title="Delete">
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.deleteMessage(props.data.id)}
            className="deleteBtn"
          >
            <DeleteOutlineIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Edit">
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.onClickEdit(props.data.id)}
            className="updateBtn"
          >
            <EditIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default MessageCard;
