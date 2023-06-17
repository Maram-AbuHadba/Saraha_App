import bcrypt from 'bcrypt'

export const hash = (plainText , saltRound = parseInt(process.env.SALTRound))=>{
    const hashResult = bcrypt.hashSync(plainText, saltRound)
    return hashResult
}

export const compare = (password , hashValue)=>{
    const hashResult = bcrypt.compareSync(password, hashValue)
    return hashResult
}