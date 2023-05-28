export const formattime=(seconds)=>{
    const rest=(seconds % 60).toFixed(0)
    const min=Math.floor(seconds/ 60)
    const ressecons=rest< 10 ? `0${rest}`: rest
    return `${min}:${ressecons}`

}