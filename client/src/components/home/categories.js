import { Button, Table, TableHead, TableBody, TableCell, TableRow, styled } from "@mui/material";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";

const StyledTable=styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1) ;
`;


const Categories=()=>{

    const [SearchParams]=useSearchParams();
    const category=SearchParams.get("category");
    return (
        <>
            <Link to={`/create?category=${category || ''}`}>
                <button className="btn btn-primary" style={{margin: "1rem", width: "100%"}}>Create Blog</button>
            </Link>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link to='/' style={{textDecoration: "none",color:"inherit"}}>
                                All Categories
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category=>(
                            <TableRow key={category.id}>
                                <TableCell>
                                    <Link to={`/?category=${category.type}`} style={{textDecoration: "none",color:"inherit"}}>
                                        {category.type}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;