import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SongTable from '../Components/songtable/songtable';
const Playlist = ({ spotifyApi, token }) => {
	const [playlistinfo, setplaylistinfo] = useState();
	const [songs, setsongs] = useState([]);
	const [status, setstatus] = useState({ isloading: true, iserror: null });

	const { id } = useParams();
	const formatSongs = useCallback(
		(items) =>
			items.map((item, i) => {
				const { track } = item;
				track.contextUri = `spotify:playlist:${id}`;
				track.position = i;
				return track;
			}),
		[id]
	);

	useEffect(() => {
		const getdata = async () => {
			setstatus({ isloading: true, iserror: null });
			try {
				const playlistdetails = await spotifyApi.getPlaylist(id);
				setplaylistinfo({
					image: playlistdetails.body.images[0].url,
					name: playlistdetails.body.name
				});
				const { items } = playlistdetails.body.tracks;

				// fromat songs
				const formattedsongs = formatSongs(items);
				setsongs(formattedsongs);
			} catch (e) {
				console.error(e);
				setstatus({ isloading: false, iserror: e });
			}
		};
		getdata().finally(() => {
			setstatus({ isloading: false, iserror: null });
		});
	}, [id, formatSongs]);
	return (
		<Box id="playlist_page" sx={{ backgroundColor: 'backgound.paper', flex: 1, overflowY: 'auto' }}>
			<Box
				p={{ xs: 3, md: 4 }}
				sx={{
					width: '100%',
					background: 'linear-gradient(0deg, #121212 0%, #1bd76060 100%)',
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: { xs: 'flex-start', md: 'flex-end', xl: 'center' },
					gap: 3,
					boxSizing: 'border-box',
					flexDirection: { xs: 'column', md: 'row' }
				}}
			>
				{status.isloading ? (
					<Skeleton variant='square' sx={{ width: { xs: '100%', md: 235 }, height: { xs: '100%', md: 235 } }} />
				) : (
					<Avatar
						src={playlistinfo?.image}
						variant="square"
						alt={playlistinfo?.name}
						sx={{ boxShadow: 15, width: { xs: '100%', md: 235 }, height: { xs: '100%', md: 235 } }}
					/>
				)}
				<Box>
					<Typography sx={{ fontSize: 12, fontWeight: 'bold', color: 'text.primary' }}>Playlist</Typography>
					{status.isloading ? (<Skeleton variant='text' sx={{ fontSize: { xs: 42, md: 72 }, width:200}} />): (<Typography sx={{ fontSize: { xs: 42, md: 72 }, fontWeight: 'bold', color: 'text.primary' }}>
						{playlistinfo?.name}
					</Typography>)}
				</Box>
			</Box>
            <SongTable songs={songs} loading={status.isloading} spotifyApi={spotifyApi}/>
		</Box>
	);
};
export default Playlist;
