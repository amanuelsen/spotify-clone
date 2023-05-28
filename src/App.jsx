import './App.css';
import { Box } from '@mui/material';
import Login from './Pages/Login';
import Dashboard from './Components/Dasboard/Dashboard';
import { getAccessToken } from './Util/Getaccesstoken';
import { getAccessTokenFromStorage } from './Util/Getaccesfromstorage';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function App({ spotifyApi }) {
	const [token, settoken] = useState(getAccessTokenFromStorage());

	useEffect(() => {
		const accessToken = getAccessTokenFromStorage() || getAccessToken();
		if (accessToken) {
			settoken(accessToken);
			sessionStorage.setItem('spotifyToken', accessToken);
			window.location.hash = '';
		}
	}, []); 
	return (
		<Box sx={{height:"100%"}}>
			{token ? (
				<Dashboard spotifyApi={spotifyApi} />
			) : (
				<Routes>
					<Route path="*" element={<Login />} />
				</Routes>

			)}
		</Box>
	);
}

export default App;
