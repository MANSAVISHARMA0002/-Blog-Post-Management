import { useEffect, useState } from "react";
import {API} from '../../../service/api'
import { useSearchParams, Link } from "react-router-dom";

import Post from './post.js';

const Posts=()=>{

    const [searchParams] = useSearchParams();
    const category=searchParams.get('category');
    const [posts, setPosts]=useState([]);

    useEffect(()=>{
        const fetchData= async ()=>{
            let response=await API.getAllPosts({category:category || ''});
            if(response.isSuccess){
                setPosts(response.data);
            }
        }
        fetchData();
    },[category])

    return (
        <>
            {
               posts && posts.length>0 ? posts.map(post=>(
                <div className="col-sm-4">
                    <Link to={`details/${post._id}`} style={{textDecoration: "none", color:"black"}}> 
                        <Post post={post}/>
                    </Link>
                </div>   
               )) : <div>No data available</div> 
            }
        </>
    )
}

export default  Posts;