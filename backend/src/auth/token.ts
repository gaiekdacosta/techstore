import jwt from "jsonwebtoken"

const genToken = (payload: object | string) => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET || "shhhhhh", {
            expiresIn: '2h'
        })
        return token
    } catch (error) {
        console.log(error)
        return null
    }
}

export default genToken