import { RANDOMSTRING } from "./constant";

const RandomUsername = () => {
    const characters = RANDOMSTRING; 
    let result = ''; 
    const charactersLength = characters.length; 
    for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength)); 
    } 
    return result;
}

export default RandomUsername