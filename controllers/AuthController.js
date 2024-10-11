import User from "../models/User.js";
import TokenBlackList from "../models/TokenBlackList.js";
import * as argon2 from "argon2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Secret, TOTP } from "otpauth";
import { toDataURL } from "qrcode";
import { writeFile } from "fs";

dotenv.config();

const AuthController = async (req, res) => {
    if (req.method === "GET") {
        if (req.path === "/logout") {
            const token = req.cookies.access;
            TokenBlackList.create({token: token});
            res.clearCookie("access", { httpOnly: true, sameSite: "lax"})
            res.json({ message: "logout" });
        }
        if (req.path === "/me") {
            res.json({ message: true });
        }
        if (req.path === "/enable-2fa") {
            const user = await User.findOne({ where: { id: req.userId } });
            if (user.twoFactorEnabled) {
                res.status(401).json({ message: "2fa already enabled" });
            }
            const secret = new Secret();
            const totp = new TOTP({ 
                issuer: "appTest",
                label: user.email,
                algorithm: "SHA1",
                digits: 6,
                period: 30,
                secret: secret,
            });
            const url = totp.toString();
            toDataURL(url, (err, url) => {
                url = url.replace("data:image/png;base64,", "");
                const urlDecoded = Buffer.from(url, "base64");
                writeFile(`./qrcodes/${user.email.split('@')[0]}.png`, urlDecoded, (err) => {
                    if (err) throw err;
                })
            })
            user.twoFactorSecret = secret.base32;
            await user.save();
            res.status(200).json({ message: "2fa enabled", label: totp.label, secret: totp.secret });
        }
    } else if (req.method === "POST") {
        if (req.path === "/login") {
            const { email, password, token } = req.body;
            if (!email || !password) {
                res.status(404).json({ message: "missing email or password" });
            } else if (email && password) {
                const user = await User.findOne({
                    where: { email: email },
                });
                if (user) {
                    const hashPassword = user.password;
                    const match = await argon2.verify(hashPassword, password);
                    if (match) {
                        if (user.twoFactorEnabled) {
                            if (!token) {
                                return res.status(400).json({ message: "2FA token required" });
                            }
                    
                            const totp = new TOTP({
                                secret: Secret.fromBase32(user.twoFactorSecret),
                                issuer: "appTest",
                                algorithm: "SHA1",
                                digits: 6,
                                period: 30,
                                label: user.email,
                            });
                    
                            const delta = totp.validate({ token, window: 0 });
                            if (delta === null) {
                                return res.status(400).json({ message: "Invalid 2FA token" });
                            }
                        } else {
                            if (token) {
                                const totp = new TOTP({
                                    secret: Secret.fromBase32(user.twoFactorSecret),
                                    issuer: "appTest",
                                    algorithm: "SHA1",
                                    digits: 6,
                                    period: 30,
                                    label: user.email,
                                });
                    
                                const delta = totp.validate({ token, window: 0 });
                                if (delta === null) {
                                    return res.status(400).json({ message: "Invalid 2FA token" });
                                }
                                user.twoFactorEnabled = true;
                                await user.save();
                            }
                        }
                        const payload = { userID: user.id };
                        const options = { expiresIn: "2h" };
                        const jwToken = jwt.sign(payload, process.env.SERVER_SECRET, options);
                        res.cookie("access", jwToken, { httpOnly: true, sameSite: "Lax" });
                        res.json({ message: "login successful" });
                    } else {
                        res.status(401).json({ message: "login failed" });
                    }
                }
            }
        }
    }
}

export default AuthController;