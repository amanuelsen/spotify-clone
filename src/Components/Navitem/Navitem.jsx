import { Box } from '@mui/material';
import { color, display } from '@mui/system';
import { NavLink } from 'react-router-dom';
import "./Navitem.css"
const Navitem = ({ name, Icon, target }) => {
	return (
		<NavLink className="Navlink"  to={target} style={{ textDecoration:"none"}}>
			<Box px={3} py={1} sx={{display:"flex",alignItems:"center", fontWeight:"bold", cursor:"pointer", "&:hover":{color:"white"}, transition:"color o.2s ease-in-out"
        }}>
                 {Icon && <Icon sx={{fontSize:28, marginRight:1}}/>}
                {name}
            </Box>
		</NavLink>
	);
};
export default Navitem;
