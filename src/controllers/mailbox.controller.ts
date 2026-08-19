import { Request, Response } from "express";
import { generateMailBox } from "../utils";
import { MailBox } from "../models";

export const createMailBox = async (req: Request, res: Response) => {
    const mailBoxName = generateMailBox();
    const mailBox = new MailBox({ name: mailBoxName });
    await mailBox.save();
    res.json({
        name: mailBoxName,
        email: `${mailBoxName}@${process.env.DOMAIN}`,
    });
}