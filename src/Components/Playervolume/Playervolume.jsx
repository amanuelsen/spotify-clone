import { Slider, Stack } from "@mui/material";
import { VolumeDown, VolumeUp, VolumeOff } from "@mui/icons-material";
import { useState } from "react";

const PlayerVolume = ({player}) => {
    const [volume, setvolume]=useState(50)
    const handleVolumechange= async (value)=>{
        try {
            await player.setVolume(value / 100);
        } catch (error) {
            console.log(error)
            
        }

    }
    return ( 
        <Stack direction={"row"} spacing={2} alignItems="center" sx={{width:150, color:"text.secondary"}}>
           {volume === 0 ? <VolumeOff/>: volume < 50 ? <VolumeDown/>: <VolumeUp/>}
           <Slider min={0} max={100} step={1} value={volume} onChange={(e,v)=>{setvolume(v)}} onChangeCommitted={async (e,v)=>{
            handleVolumechange(v)

           }}/>
        </Stack>
     );
}
 
export default PlayerVolume;