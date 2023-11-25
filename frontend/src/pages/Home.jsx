import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios  from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data)
  const {posts, tags}  = useSelector((state) => state.posts)

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
  dispatch(fetchPosts())
  dispatch(fetchTags())
  }, [])


  return (
    <>
    
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>  isPostsLoading ? <Post key={index} isLoading={true} /> : 
        (
          <Post
            id={obj._id}
            title={obj.title}
            imageUrl={obj.imageUrl}
            user= {obj.user}
            createdAt={obj.createdAt}
            viewsCount={obj.viewsCount}
            commentsCount={3}
            tags={obj.tags}
            
          />
        )  
        
        )}
        </Grid>
        <Grid xs={4} item>
        
         
        </Grid>
      </Grid>
    </>
  );
};