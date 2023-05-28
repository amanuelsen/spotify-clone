import { Box, Button } from '@mui/material';
import Senai from "./Senai.jpg"

const Home = () => {
	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: 5
			}}
		>
	
			<img  src={Senai}style={{ maxHeight: '50%', maxWidth: '50%' }} alt="senai" />
			<Button
				size="large"
				variant="contained"
				href='tel:0736506637'
			>
				Contacta mig
			</Button>
		</Box>
	);
};
export default Home;
