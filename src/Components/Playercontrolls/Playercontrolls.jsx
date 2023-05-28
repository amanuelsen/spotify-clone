import { Stack, Typography, Slider, Box, IconButton, duration } from '@mui/material';
import { formattime } from '../../Util/formattime';
import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';
import { useState, useEffect } from 'react';
const Playercontrolls = ({ durration, progress, player, ispaused }) => {
	const [currentprogres, setcurrentprogres] = useState(progress);
	const skipstyle = { width: 28, height: 28 };
	const playsyule = { width: 38, height: 38 };
	
    useEffect(() => {
		const intervalid= setInterval(() => {
        if(!ispaused && player){
            setcurrentprogres((prevstate)=> prevstate + 1)
        }
        }, 1000);
        return ()=> clearInterval(intervalid)

	}, [ispaused, player]);
    
    useEffect(() => {
		setcurrentprogres(progress);
	}, [progress]);
	return (
		<Stack direction={'column'} spacing={2} justify="center" alignItems="center" sx={{ width: '100%' }}>
			<Stack spacing={1} direction="row" justifyContent={'center'} alignItems="center" sx={{ width: '100%' }}>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setcurrentprogres(0);
						player.previousTrack();
					}}
				>
					<SkipPrevious sx={skipstyle} />
				</IconButton>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						player.togglePlay();
					}}
				>
					{ispaused ? <PlayArrow style={playsyule} /> : <Pause style={playsyule} />}
				</IconButton>
				<IconButton size="small" sx={{ color: 'text.primary' }}>
					<SkipNext
						sx={skipstyle}
						onClick={() => {
							setcurrentprogres(0);
							player.nextTrack();
						}}
					/>
				</IconButton>
			</Stack>
			<Stack spacing={2} direction="row" justifyContent={'center'} alignItems="center" sx={{ width: '75%' }}>
				<Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formattime(currentprogres)} </Typography>

				<Slider
					max={durration}
					value={currentprogres}
					onChange={(event, value) => {
						console.log('changed', value);
						setcurrentprogres(value);
					}}
					onChangeCommitted={(event, value) => {
						player.seek(value * 1000);
					}}
					min={0}
					size="medium"
				/>
				<Typography sx={{ color: 'text.secondary', fontSize: 12 }}> {formattime(durration)}</Typography>
			</Stack>
		</Stack>
	);
};

export default Playercontrolls;
