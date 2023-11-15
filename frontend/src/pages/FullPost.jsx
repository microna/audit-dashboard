import React from "react";
import { useParams } from "react-router-dom"; //вытаскиваем  _id поста из ссылки
import ReactMarkdown from "react-markdown"; //ReactMarkdown - сделает из markdown разметки в красивый html
import { Typography } from '@mui/material';
import { useSelector } from "react-redux"; //вытаскиваем state
import { useDispatch } from "react-redux"; //для отправки async action от сюда

import axios from "../axios";
import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";


import {
  fetchPosts,
  fetchTags,
  fetchComments
} from "../redux/slices/posts";

export const FullPost = () => {
  const { id } = useParams(); //вытаскиваем  _id поста из ссылки

  //нет смысла хранить 1 статью в redux, по этому засейвим тут
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const [didMount, setDidMount] = React.useState(true);

  //For comments count
  const [commentsCount, setCommentsCount] = React.useState([]);
  const commentsData = useSelector((state) => state.posts.posts)
  const isCommentsLoading = commentsData.status === "loaded"; 

  React.useEffect(() => {

    if (didMount) {
      axios
      .get(`/posts/${id}`) //ищем пост по id поста
      .then((res) => {
        setData(res.data); //результат сохранили в state
        setLoading(false);
        setCommentsCount(res.data.commentsCount)
        setDidMount(false)
      })
      .catch((err) => {
        console.warn(err);
        alert("Error get the post");
      });

    } else {
      axios
      .get(`/posts`) //ищем пост по id поста
      .then((res) => {
        const currentPost = res.data.filter((obj) => obj._id === id)

        setData(currentPost[0]); //результат сохранили в state
        setLoading(false);
         setCommentsCount(currentPost[0].commentsCount)
      })
    }

   


  }, [isCommentsLoading]);

 
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }


  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        //  imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        imageUrl={data.imageUrl ? `http://localhost:4444` +   data.imageUrl : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={commentsCount}
        tags={data.tags}
        isFullPost
      >
        <Typography>
          <ReactMarkdown children={data.text} />
          {/*ReactMarkdown - сделает из markdown разметки в красивый html */}
        </Typography>
      </Post>
      <CommentsBlock
        items= {isLoading ? [] : data}
        isLoading={false}
      >   
      </CommentsBlock>
    </>
  );
};
