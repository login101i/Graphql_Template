import React from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/auth";

import LikeButton from "./LikeButton";


function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
  //? destrukturyzacja z post

  const { user } = useContext(AuthContext);

  function likePost() {
    console.log("Like post!!");
  }

  //? jak w moment.fromNow damy (true) usunie to 'ago'
  return (
    <Card fluid>
      <Card.Content>
        <Image floated="right" size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>

      <LikeButton user={user} post={{ id, likes, likeCount }} />
      {/* Tutaj przesyłamy obiekt jako props */}

      <Card.Content>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && <Icon name="trash" postId={id} onClick={console.log("usunieto")} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
