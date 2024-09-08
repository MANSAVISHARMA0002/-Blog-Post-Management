import {Box, Typography} from '@mui/material'
import {useParams, Link, useNavigate} from 'react-router-dom'
import { useState, useEffect,useContext } from 'react';
import {DataContext} from '../../context/DataProvider'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {API} from '../../service/api'


import Comments from './comments/Commentss';

const DetailView=()=>{

    const {id}=useParams();

    const [post, setPost]=useState({})
    const {account}=useContext(DataContext)

    const url= post.picture?post.picture:'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'

    useEffect(()=>{
        const fetchData= async ()=>{
            let response=await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    },[])

    const navigate=useNavigate();

    const deleteBlog= async()=>{
        let response=await API.deletePost(post._id);
        if(response.isSuccess){
            navigate('/')
        }
    }

    return (   
        <>
            <Box textAlign={'center'}>
                <img src={url} alt="banner"/>
            </Box>
            <Typography textAlign={'center'}>{post.title}</Typography>
            <Box textAlign={'center'}>
                <Typography>{post.username}</Typography>
                <Typography>{new Date(post.createdDate).toDateString()}</Typography>
            </Box>
            <Typography textAlign={'center'}>{post.description}</Typography>
            <Box textAlign={'center'}>
                {
                    account.username === post.username &&
                    <>
                        <Link to={`/update/${post._id}`}><EditIcon style={{margin:"1rem"}}color='primary'/></Link>
                        <DeleteIcon onClick={()=>deleteBlog()} color='error'/>
                    </>
                }
            </Box>
            <Comments post={post} />   
            
        </>
        
    )
}

export default DetailView;