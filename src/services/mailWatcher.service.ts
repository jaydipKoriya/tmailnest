import { Server } from "socket.io";
import chokidar from "chokidar";
import { parseEmail } from "./mailParser.service";
import fs from "fs";
import { Email } from "../models";
import { logger } from "../utils";
export const mailWatcher = (io: Server) => {
    const MAILDIR_PATH = process.env.MAILDIR_PATH as string;

    if (!MAILDIR_PATH) {
        logger.error("Error: MAILDIR_PATH environment variable is not defined");
        return;
    }

    const watcher = chokidar.watch(MAILDIR_PATH, {
        persistent: true,
        ignoreInitial: true,
    });
    watcher.on("add", async (path) => {
        try {
            const parsedMail = await parseEmail(path);
            logger.info(`Parsed mail: ${JSON.stringify(parsedMail)}`);
            if (!parsedMail) {
                logger.error(`Error parsing email: ${JSON.stringify(parsedMail)}`);
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
            io.to(mailbox).emit("newEmail", email);
            fs.unlinkSync(path);

        } catch (error) {
            logger.error(`Error processing email: ${JSON.stringify(error)}`);
        }
    });
    logger.info("Mail watcher started...");
}