import { Server } from "socket.io";
import chokidar from "chokidar";
import { parseEmail } from "./mailParser.service";
import fs from "fs";
import { Email } from "../models";
export const mailWatcher = (io: Server) => {
    const MAILDIR_PATH = process.env.MAILDIR_PATH as string;

    if (!MAILDIR_PATH) {
        console.error("Error: MAILDIR_PATH environment variable is not defined");
        return;
    }

    const watcher = chokidar.watch(MAILDIR_PATH, {
        persistent: true,
        ignoreInitial: true,
    });
    watcher.on("add", async (path) => {
        try {
            console.log("New email added:", path);
            const parsedMail = await parseEmail(path);
            console.log("parsedMail", parsedMail);
            if (!parsedMail) {
                fs.unlinkSync(path);
                return;
            }

            const { mailbox, from, to, subject, text, html } = parsedMail;
            const email = await Email.create({
                mailbox,
                from,
                to,
                subject,
                html: html ?? "",
                text: text ?? "",

            });
            // io.to(mailbox).emit("newEmail", email);
            console.log(`[Socket] Broadcasting new email to room exactly matching: "${mailbox}"`);
            io.to(mailbox).emit("newEmail", email);
            fs.unlinkSync(path);

        } catch (error) {
            console.error("Error processing email:", error);
        }
    });
    console.log("Mail watcher started...");
}