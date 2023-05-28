import { Box, Container, Grid, IconButton, Typography } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Playercontrolls from '../Playercontrolls/Playercontrolls';

const PlayerOverlay = ({
	playerOverlayIsOpen,
	closeoverlay,
	ispaused,
	durration,
	player,
	progress,
	current_track,
	active
}) => {
	return (
		<Box
		id="PlayerOverlay"
		sx={{
			width: '100%',
			height: 'calc(100vh - 75px)',
			bgcolor: 'background.paper',
			display: { xs: 'block', md: 'none' },
			position: 'fixed',
			top: 0,
			left: 0,
			transition: 'all 0.3s',
			transform: playerOverlayIsOpen ? 'translateY(0)' : 'translateY(100vh)'
		}}
	>
		<Container
			sx={{
				height: '100%',
				background: 'linear-gradient(0deg, #121212 0%, #F0790050 100%);'
			}}
		>
			<Grid container direction={'column'} justifyContent="space-between" sx={{ height: '100%' }}>
				<Grid
					item
					xs={1}
					sx={{
						display: 'flex',
						alignItems: 'center',
						position: 'relative'
					}}
				>
					<IconButton
						onClick={() => closeoverlay()}
						sx={{
							paddingLeft: '0px'
						}}
					>
						<KeyboardArrowDownIcon fontSize="large" sx={{ color: 'text.primary' }} />
					</IconButton>
				</Grid>
				<Grid
					item
					xs={5}
					sx={{
						backgroundImage: `url("${current_track?.album.images[0].url}")`,
						backgroundPosition: 'center',
						backgroundSize: 'cover'
					}}
				></Grid>
				<Grid item xs={1}>
					<Typography variant="body1" sx={{ color: 'text.primary', fontSize: '28px' }}>
						{current_track?.name}
					</Typography>
					<Typography variant="body1" sx={{ color: 'text.primary', fontSize: '18px' }}>
						{current_track?.artists[0].name}
					</Typography>
				</Grid>
				<Grid item xs={2}>
				{active ? (
			<Playercontrolls
				durration={durration}
				progress={progress}
				ispaused={ispaused}
				player={player}
			/>
		) : (
			<Box>Please transfer Playback</Box>
		)}
				</Grid>
			</Grid>
		</Container>
	</Box>


	
	);
};

export default PlayerOverlay;

//  <Box
// id="Playeroverlay"
// sx={{
// 	width: '100%',
// 	height: 'calc(100vh - 75px)',
// 	backgroundColor: 'background.paper',
// 	display: { xs: 'block', md: 'none' },
// 	position: 'fixed',
// 	top: 0,
// 	left: 0,
// 	transition: 'all 0.3s',
// 	transform: PlayerOverlay ? 'translateY(0)' : 'translateY(100vh)'
// }}
// >
// <Container sx={{ height: '100%', background: 'linear-gradient(0deg, #121212 0%, #39d47250 100%)' }}>
// 	<Grid container direction={'column'} justifyContent="space-between" sx={{ height: '100%' }}>
// 		<Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
// 			<IconButton onClick={closeoverlay} sx={{ paddingLeft: 0 }}>
// 				<KeyboardArrowDownIcon fontSize="large" sx={{ color: 'text.primary' }} />
// 			</IconButton>
// 		</Grid>
// 		<Grid
// 			item
// 			xs={5}
// 			sx={{
// 				backgroundImage: `url(${current_track?.album.images[0].url})`,
// 				backgroundPosition: 'center',
// 				backgroundSize: 'cover'
// 			}}
// 		></Grid>
// 	</Grid>
// 	<Grid item xs={1}>
// 		<Typography sx={{ color: 'text.primary', fontSize: '28pxs' }}>{current_track?.name}</Typography>
// 		<Typography sx={{ color: 'text.secondary', fontSize: '18pxs' }}>
// 			{current_track?.artists[0].name}
// 		</Typography>
// 	</Grid>
// 	<Grid xs={2}>
// 		{active ? (
// 			<Playercontrolls
// 				durration={durration}
// 				progress={progress}
// 				ispaused={ispaused}
// 				player={player}
// 			/>
// 		) : (
// 			<Box>Please transfer Playback</Box>
// 		)}
// 	</Grid>
// </Container>
// </Box> 
