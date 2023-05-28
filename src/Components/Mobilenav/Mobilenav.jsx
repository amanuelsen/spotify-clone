import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {Home, List} from "@mui/icons-material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Mobilenav = () => {
    const nav=useNavigate()
    const [value,setvalu]=useState(0)
    
    return ( 
        <Box sx={{display:{xs:"block", md:"none"}}}>
            <BottomNavigation sx={{backgroundColor:"background.paper", color:"text.secondary"}} showLabels value={null} onChange={(e,value)=> setvalu(value)}>
<BottomNavigationAction label="Home" icon={<Home/>} onClick={()=>nav("/")}/>
<BottomNavigationAction label="Ditt biblotek" icon={<List/>} onClick={()=>nav("/library")}/>

            </BottomNavigation>
            
        </Box>
     );
}
 
export default Mobilenav;