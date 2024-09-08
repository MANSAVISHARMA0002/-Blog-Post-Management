
import { Box, Typography, styled } from '@mui/material';
import {Delete} from '@mui/icons-material'
import {DataContext} from '../../../context/DataProvider';
import { useContext } from 'react';
import { API } from '../../../service/api';

const Component=styled(Box)({
    margin: "2rem",
    backgroundColor: "#F5F5F5",
    padding: "1rem"
})

const Container=styled(Box)({
    display: "flex"
})

const Name=styled(Typography)({
    fontSize: "1rem",
    fontWeight: "bold",
    marginRight:"1rem"
})

const Deleted=styled(Delete)({
    marginLeft: "auto"
})
const Comment=({comment, setToggle})=>{

    const removeComment= async ()=>{
        let response=await API.deleteComment(comment._id);
        if(response.isSuccess){
            setToggle(prevState=>!prevState);
        }
    }

    const {account}=useContext(DataContext);

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <Typography>{new Date(comment.date).toDateString()}</Typography>
                {account.username===comment.username && <Deleted onClick={()=>removeComment()}/>}
            </Container>
            <Box>
                <Typography>{comment.comments}</Typography>
            </Box>
        </Component>
    )
}

export default Comment;