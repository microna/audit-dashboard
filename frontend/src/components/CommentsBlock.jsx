import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

import axios from "../axios"; 
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; //для стейтов
import { useDispatch } from "react-redux"; //для экшенов


import {fetchAddComment} from '../redux/slices/posts'
import { AddComment } from "../components/AddComment";



export const CommentsBlock = ({ items, children, isLoading = true }) => {


    const [comments, setComments] = React.useState([]);
  //  const [commentsLoading, setCommentsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState( useSelector((state) => state.auth.data))

  const { id } = useParams();

  const dispatch = useDispatch()

 // const userData = useSelector((state) => state.auth.data);

  const commentsData = useSelector((state) => state.posts.posts)

  

   const isCommentsLoading = commentsData.status === "loaded"; 

  React.useEffect(() => {

    if (id) {
      //если к нам пришло id значит мы режиме редактирования
      axios
      .get(`/posts`) //ищем пост по id поста
      .then((res) => {
        const currentPost = res.data.filter((obj) => obj._id === id)

        setComments(currentPost[0].comments)
        // .get(`/posts/${id}`)
        // .then((res) => {
        //   //делаем запрос какие текста у нас по этому id
        //   //и вобьем в state
        //   setComments(res.data.comments);
        //   console.log("res.data.comments", res.data.comments);
        })
        .catch((err) => console.log("get post error", err));
    }

    axios.get('/auth/me').then((res) =>{
      console.log('/auth/me',res.data.userData)
      setUserData(res.data.userData)
    
     })


  }, [isCommentsLoading])


  const handleClickPost = async  (event) => {

    event.preventDefault()

     dispatch(fetchAddComment({'id': id, 'userData': userData, 'text': event.target[0].value}))

   event.target.reset()

  };

  // /(isCommentsLoading || (!commentsData.items.doc) ? items.comments : commentsData.items.doc.comments)

console.log(Boolean(items.comments ),  Boolean(commentsData.items.comments))
   console.log('comments', comments)
  //  console.log('items.comments', items.comments)
  return (
    <SideBlock title="Comments">
      <List>
        {(isLoading ? [...Array(5)] : comments).map((obj, index) => (
           <React.Fragment key={index}>
           <ListItem alignItems="flex-start">
             <ListItemAvatar>
               {isLoading ? (
                 <Skeleton variant="circular" width={40} height={40} />
               ) : (
                 <Avatar alt={obj.user.fullName} src={'http://localhost:4444'+obj.user.avatarUrl} />
               )}
             </ListItemAvatar>
             {isLoading ? (
               <div style={{ display: "flex", flexDirection: "column" }}>
                 <Skeleton variant="text" height={25} width={120} />
                 <Skeleton variant="text" height={18} width={230} />
               </div>
             ) : (
               <ListItemText
                 primary={obj.user.fullName ?? ''}
                 secondary={obj.comment ?? ''}
               />
             )}
           </ListItem>
           <Divider variant="inset" component="li" />
         </React.Fragment>
        ))}
      </List>
      {children}
      <AddComment handleClickPost={handleClickPost} data={userData} />
    </SideBlock>
  );
};
