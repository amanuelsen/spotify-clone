import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../../Pages/Home';
import Sidenav from './sidenav/Sidenav';
import { getAccessTokenFromStorage } from '../../Util/Getaccesfromstorage';
import { useEffect, useState } from 'react';
import Playlist from '../../Pages/Playlist';
import Player from '../Player/Play';
import Mobilenav from '../Mobilenav/Mobilenav';
import Library from '../../Pages/Library';
const Dashboard = ({ spotifyApi }) => {
	const token = useState(getAccessTokenFromStorage());

	useEffect(() => {
        async function setAccessToken() {
            await spotifyApi.setAccessToken(token);
        }

        if (token) setAccessToken();
        
    }, []);
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Box sx={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
                <Sidenav spotifyApi={spotifyApi} token={token} sx={{height:"100%", color:"green"}}/>
				<Routes>
					<Route path="/playlist/:id" element={<Playlist  spotifyApi={spotifyApi} token={token}/>} />
					<Route path="/library" element={<Library spotifyApi={spotifyApi} token={token} />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Box>
			{token && <Player spotifyApi={spotifyApi} token={token}/>}
			<Mobilenav/>
		</Box>
	);
};
export default Dashboard;
