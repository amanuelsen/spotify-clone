import { Box, Skeleton } from "@mui/material"
import { fontSize } from '@mui/system';
import { NavLink } from 'react-router-dom';
import './Navplaylist.css';
const Navplaylist = ({ name, id, loading }) => {
	return (
		<NavLink className="playlist_navlink" to={loading ? '' : `playlist/${id}`} style={{ textDecoration: 'none' }}>
			<Box
				px={3}
				py={1}
				sx={{
					cursor: 'pointer',
					'&:hover': { color: 'white' },
					transition: 'color o.2s ease-in-out',
                    fontSize:10
				}}
			>
				{ loading? <Skeleton variant="text" sx={{ fontSize: 10 }} /> : name}
			</Box>
		</NavLink>
	);
};
export default Navplaylist;
