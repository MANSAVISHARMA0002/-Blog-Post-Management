import { Box, Typography, styled } from "@mui/material"
// import { addElipsis } from "../../../utils/common-utils";

const Container=styled(Box)`
    border: 1px solid black;
    margin:1rem;
    text-align: center;
    &>p{
        padding:0.5rem;
    }
`;

const Details=styled(Typography)`
    word-break:break-word;
`

const Post=({post})=>{

const url=post.picture?post.picture:"https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    return(
        <Container>
            <img src={url} alt="blog" style={{width:"100%"}}/>
            <Typography>{post.categories}</Typography>
            <Details>{post.title}</Details>
            <Typography>{post.username}</Typography>
            <Details>{post.description}</Details>
        </Container>
    )
}

export default Post;