
import Banner from "../banner/Banner";
import Categories from "./categories.js"
import Post from "./Post/posts.js";

const Home=()=>{
    return(
        <>
            <Banner/>
            <div className="row" style={{width:"100%", float:"left"}}>
                <div className="col-sm-3" style={{textAlign: "center"}}>
                    <Categories/>  
                </div>
                <div className="col-sm-9">
                    <div className="row" style={{width:"100%", float:"left"}}>
                        <Post/>
                    </div>
                </div>
                {/* <div className="col-sm-2"></div> */}
            </div>
             
        </>
    )
}

export default Home;