
import clientPromise from "lib/mongodb";
import { compare } from 'bcryptjs'

export default async function handler(req, res) {


    if(req.method === 'POST') {
        const client = await clientPromise
        const db = client.db()
        const { email, password } = req.body

        const checkExistingUser = await db.collection('users').findOne({email: email})

        if(checkExistingUser){
            const checkPassword = await compare(password, checkExistingUser.password)
            if(checkPassword) {
                const user = {
                    id: checkExistingUser._id,
                    username: checkExistingUser.username, 
                    email: checkExistingUser.email
                }
                res.status(200).json({message: 'Success Login', user})
            } else {
                res.status(401).json({error: 'Password salah'})
            }
        } else {
            res.status(401).json({error: 'Email belum terdaftar'})
        }
    }
}