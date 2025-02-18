import crypto from 'crypto'
const SECRET = 'SALAH-API-REST'

export const random = ()=>crypto.randomBytes(128).toString('base64');
export const authentication = (salt:String,password:string)=>{
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}