
import jwt from "jsonwebtoken";


export const generateToken = (payload , signature = process.env.TOKEN_SIGNITURE , expiresIn = '1h') =>{

    const token = jwt.sign(payload, signature, {expiresIn});

    return token;
}

export const verfiyToken = (token , signature = process.env.TOKEN_SIGNITURE) =>{

    const decoded = jwt.verify(token, signature);
    return decoded; 
}