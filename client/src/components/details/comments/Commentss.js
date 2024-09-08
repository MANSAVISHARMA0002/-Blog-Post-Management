
import {Box, Button, TextareaAutosize, styled} from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../../context/DataProvider'
import { API } from '../../../service/api'

import Comment from './Comment1';

const Container=styled(Box)`
    margin-top: 100px;
    display: flex; 
`

const Image=styled('img')({
    height:50,
    width:50,
    borderRadius:'50%'
})

const StyledTextArea=styled(TextareaAutosize)({
    height: "100px",
    width: "100%",
    margin: "0 12px"
})

const initialValues={
    name:'',
    username:'',
    postId:'',
    comments:'',
    date: new Date()
}

const Comments=({post})=>{

    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment]=useState(initialValues);
    const [comments, setComments]=useState([]);
    const [toggle, setToggle]=useState(false);
    
    const {account}=useContext(DataContext) 
    const handleChange=(e)=>{
        setComment({
            ...comment, 
            name: account.name,
            username:account.username,
            postId: post._id,
            comments: e.target.value
        })
    }

    const addComment=async(e)=>{
        let response=await API.newComment(comment);
        if(response.isSuccess){
            setComment(initialValues);
        }
        setToggle(prevState=>!prevState)
    }
    
    useEffect(()=>{
        const getData=async()=>{
            try{
                let response=await API.getAllComments(post._id);
                if(response.isSuccess){
                    setComments(response.data);
                }
            }catch(error){
                //console.log(error);
            }
        }
        getData();
    },[post, toggle])
    
    return (
        <Box style={{margin: "2rem"}}>
            <Container>
                <Image src={url} alt='dp'/>
                <StyledTextArea minRows={5} placeholder="What's on your mind" value={comment.comments} onChange={(e)=>handleChange(e)}/>
                <Button variant="contained" size='medium' color='primary' style={{height: "2.5rem"}} onClick={(e)=>addComment(e)}>Post</Button>
            </Container>
            <Box>
                {
                    comments && comments.length>0 && comments.map(comment=>(
                        <Comment comment={comment} setToggle={setToggle}/>
                    ))
                }
            </Box>
        </Box>
    )
}
export default Comments; 