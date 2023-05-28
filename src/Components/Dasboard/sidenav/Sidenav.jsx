import { useState, useEffect } from 'react';
import { Box, Divider } from '@mui/material';
import Navitem from '../../Navitem/Navitem';
import HomeIcon from '@mui/icons-material/Home';
import Navplaylist from '../../Navplaylist/Navplaylist';
export default function Sidenav({ spotifyApi, token }) {
	const [playlists, setplaylists] = useState(null);
	const [loading, setloading] = useState(true);
	useEffect(() => {
		async function getPlaylists() {
			try {
                if(!spotifyApi) return
				const data = await spotifyApi.getUserPlaylists();
				setloading(false);
				setplaylists(data.body.items);
				
			} catch (error) {
				console.log('Error retrieving playlists:', error);
			}
		}

		getPlaylists();
	}, [spotifyApi, token]);
	const renderplaylist = () => {
		if (loading) {
			return [1, 2, 3, 4, 5, 6, 7, 8, 8].map((_, i) => <Navplaylist key={i} loading={loading} />);
		}

		return playlists.map((play, i) => <Navplaylist key={i} id={play.id} loading={loading} name={play.name}    />);
	};
	return (
		<Box
			sx={{
				backgroundColor: 'background.default',
				width: 230,
				display: { xs: 'none', md: 'flex' },
				height: '100%',
				flexDirection: 'column'
			}}
		>
			<Box p={3}>
				<img width={'75%'} src="/S.png" alt="" />
			</Box>
			<Navitem name="Home" Icon={HomeIcon} target="/" />
			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<Box sx={{ overflowY: 'auto', flex: 1 }}>{renderplaylist()}</Box>
		</Box>
	);
}
