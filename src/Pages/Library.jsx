import { Box, List, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Playlistitem from "../Components/Playlistitem/Playlistitem";
const Library = ({token, spotifyApi }) => {
  const [albumList, setAlbumList] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;

			const data = await spotifyApi.getUserPlaylists();

			setLoading(false);
			setAlbumList(data.body.items);
    
		}
		getPlaylists();
	}, [spotifyApi, token]);

	const renderPlaylistItems = () => {
   
		if (loading) {
			return [1, 2, 3, 4, 5, 6, 7].map((_, i) => <Playlistitem key={i} loading={loading} />);
		}

		return albumList.map((playlist, i) => <Playlistitem key={i}  loading={loading} {...playlist} />);
	};

	return (
		<Box
			id="Library"
			px={3}
			sx={{
				display: { xs: 'flex', md: 'flex' },
				bgcolor: 'background.default',
				flex: 1,
				flexDirection: 'column',
				overflowY: 'auto'
			}}
		>
			<Typography py={3} variant="h2" fontWeight="bold" sx={{ color: 'text.primary', fontSize: 30 }}>
				Ditt bibliotek
			</Typography>
			<List>{renderPlaylistItems()}</List>
		</Box>
	);
};
export default Library;


