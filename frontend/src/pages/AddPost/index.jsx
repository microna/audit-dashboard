import React, { useEffect } from 'react';
import { selectIsAuth } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';
import {useNavigate ,Navigate, useParams} from 'react-router-dom'

import axios from '../../axios'
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';

import Container from '@mui/material/Container';

import styles from './AddPost.module.scss';

export const AddPost = () => {
  const id = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth)
  const imageUrl = '';
  const [text, setText] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');

  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () =>{
    try{
      setLoading(true)

      const fields =  {
        title, 
        tags: [],
        imageUrl : '',
        text ,
      }

      const {data} = await axios.post('/posts', fields);
      const id = data._id;
      navigate(`/posts/${id}`)

      console.log(id)

    }
    catch(err){
      console.warn(err)
      alert('Erorr while item creation')
    }
  }


  
  
  React.useEffect(() =>{
    if(id){
      axios.get(`/posts/${id}`).then(() => {
        // setTitle(data.title)
        // setText(data.text)
        // setTags(data.tags.join(','))
        console.log(id)
        // console.log(data)
      }).catch(err => {
        console.warn(err)
      })
    }
  }, [])
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

 if(!window.localStorage.getItem('token') && !isAuth){
  return <Navigate to="/" />
 }

 console.log(title, tags, text)

  return (
    <Paper style={{ padding: 30 }}>
      {/* <Button variant="outlined" size="large">
        Load preview
      </Button> */}
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Header of the item...."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth

      />
      <TextField 
        classes={{ root: styles.tags }}
        variant="standard" 
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags" 
        value={tags}
        fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Publish
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
