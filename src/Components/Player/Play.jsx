import { Avatar, Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Playercontrolls from '../Playercontrolls/Playercontrolls';
import PlayerVolume from '../Playervolume/Playervolume';
import PlayerOverlay from '../PlayerOverlay/Playeroverlay';
const Player = ({ spotifyApi, token }) => {
	const [localplayer, setlocalplayer] = useState();
	const [ispaused, setispaused] = useState(false);
	const [current_track, setcurrent_track] = useState();
	const [device, setdevice] = useState();
	const [durration, setdurration] = useState();
	const [progress, setprogress] = useState();
	const [active, setActive] = useState();
	const [playerOverlayIsOpen, setplayerOverlayIsOpen] = useState(false);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'Senai sista ',
				getOAuthToken: (cb) => {
					cb(token);
				},
				volume: 0.5
			});

			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				setdevice(device_id);
				setlocalplayer(player);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});
			player.addListener('player_state_changed', (state) => {
				if (!state || !state.track_window?.current_track) {
					return;
				}
				console.log(state);
				const duration = state.track_window.current_track.duration_ms / 1000;
				const progress = state.position / 1000;
				setdurration(duration);
				setprogress(progress);
				setispaused(state.paused);
				setcurrent_track(state.track_window.current_track);

				player.getCurrentState().then((state) => {
					!state ? setActive(false) : setActive(true);
				});
			});

			player.connect();
		};
	}, []);
	useEffect(() => {
		if (!localplayer) return;
		async function connect() {
			await localplayer.connect();
		}
		connect();
		return () => {
			localplayer.disconnect();
		};
	}, [localplayer]);

	// useEffect(() => {
	// 	const transferPlayback = async () => {
	// 		if (device) {
	// 			const res = await spotifyApi.getMyDevices();
	// 			console.log(res);
	// 			await spotifyApi.transferMyPlayback([device], false);
	// 		}
	// 	};
	// 	transferPlayback();
	// }, [device, spotifyApi]);
	return (
		<Box>
			<Grid
				container
				px={3}
				onClick={() => setplayerOverlayIsOpen((open) => !open)}

				sx={{
					backgroundColor: 'background.paper',
					height: 100,
					cursor: { xs: 'pointer', md: 'auto', width: '100%', borderTop: '1px solid #292929' }
				}}
			>
				<Grid xs={12} md={4} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
					<Avatar
						src={current_track?.album.images[0].url}
						alt={current_track?.album.name}
						variant="square"
						sx={{ width: 56, height: 56, marginRight: 2 }}
					/>
					<Box>
						<Typography sx={{ color: 'text.primary', fontSize: 14 }}> {current_track?.name}</Typography>
						<Typography sx={{ color: 'text.secondary', fontSize: 10 }}>
							{' '}
							{current_track?.artists[0].name}
						</Typography>
					</Box>
				</Grid>
				<Grid
					sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}
					md={4}
					item
				>
					{active ? (
						<Playercontrolls
							durration={durration}
							progress={progress}
							ispaused={ispaused}
							player={localplayer}
						/>
					) : (
						<Box>Please transfer Playback</Box>
					)}
				</Grid>
				<Grid xs={6} md={4} item sx={{ display: {xs:"none", md:"flex"}, alignItems: 'center', justifyContent: 'flex-end' }}>
					<PlayerVolume player={localplayer} />
				</Grid>
			</Grid>
			<PlayerOverlay
			 playerOverlayIsOpen={playerOverlayIsOpen}  
			 closeoverlay={()=> setplayerOverlayIsOpen(false)}
			 progress={progress}
			 ispaused={ispaused}
			 durration={durration}
			 player={localplayer}
			 current_track={current_track}
			 active={active}
			 />


		</Box>
	);
};

export default Player;

