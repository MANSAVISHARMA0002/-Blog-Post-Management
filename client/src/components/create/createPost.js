import { useContext, useEffect, useState } from 'react';
import {Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material'
import {AddCircle as Add} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Container=styled(Box)`
    margin: 2rem 3rem;
`;
const Image=styled("img")({
    width: '100%',
    height: '20rem',
    objectFit: 'cover'
})

const StyledFormControl=styled(FormControl)`
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
`;
const InputTextField=styled(InputBase)`
    flex:1;
    margin-left: 1rem;
`;
const  TextAreaField = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 1rem;
    border: none;
    &:focus-visible{
        outline: none
    }
`;

const initialPost={
    title:'',
    description:'',
    picture:'',
    categories:'',
    username:'',
    createdDate: new Date()
}

const CreatePost=()=>{
    
    
    const [post, setPost]=useState(initialPost);
    const[file, setFile]=useState('');

    const location=useLocation();
    const navigate= useNavigate();
    const {account}=useContext(DataContext);

    

    useEffect(()=>{
        const getImage= async ()=>{
            if(file){
                const data=new FormData();
                //console.log(data);
                //console.log(file);
                data.append("name", file.name);
                data.append("file", file);

                //API CALL
                const response=await API.uploadFile(data);
                //console.log(response);
                post.picture=response.data;

            }
        }
        getImage();
        post.categories=location.search?.split('=')[1] || 'All';
        post.username=account.username;
    },[file])

    const handleChange=(e)=>{
        setPost({...post, [e.target.name]: e.target.value})
    }

    const url=post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    const savePost=async ()=>{
        let response=await API.createPost(post);
        if(response.isSuccess){
            navigate('/');
        }
    }
    
    return(
        <Container>
            <Image src={url} alt="banner"/>
            <StyledFormControl>
                <label htmlFor='fileinput'>
                    <Add/>
                </label>
                <input type="file" id="fileinput" style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}/>
                <InputTextField placeholder='Title' onChange={(e)=>handleChange(e)} name="title"/>
                <Button variant='contained' onClick={()=>savePost()}>Publish</Button>
            </StyledFormControl>
            <TextAreaField minRows={5} placeholder='Tell something....' onChange={(e)=>handleChange(e)} name="description"/>
        </Container>
    )
}

export default CreatePost;