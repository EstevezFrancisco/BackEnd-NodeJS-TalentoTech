import jwt from "jsonwebtoken"
import "dotenv/config";

const default_user = {
    email: "x@x.com",
    password: "1234!"
}

export const login = async (req, res) => {

    const { email, password } = req.body;
    const secret_key = process.env.JWT_SECRET;

    if (email == default_user.email && password == default_user.password) {
        const token = jwt.sign({ email }, secret_key, { expiresIn: "1h" });
        return res.json({ token })
    }

    res.status(401).json({ error: "Credenciales inválidas" });
};

