const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_ACC_ACTIVATE = "usingtokenforauthentication";

const registration = async (req, res) => {
    const { userType, name, email, publicKey } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(200)
                .json({ msg: "user already exists" });
        }

        // CREATING NEW VERIFIER
        user = new User({
            userType,
            name,
            email,
            publicKey,
        });
        const registerAdmin = await user.save();
        res.status(200).json({ registerAdmin });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

const fetchProfile = async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "user does not exists" });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports = {
    registration,
    fetchProfile
}
