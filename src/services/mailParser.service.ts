import fs from "fs";
import { simpleParser } from "mailparser";
import { logger } from "../utils";

export interface ParsedMailData {
    mailbox: string;
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export const parseEmail = async (filePath: string): Promise<ParsedMailData | null> => {

    try {
        const rawEmail = fs.readFileSync(filePath);
        const parsedMail = await simpleParser(rawEmail);
        const addressValue = parsedMail.to;
        
        let toAddress: string | undefined;
        if (Array.isArray(addressValue)) {
            toAddress = addressValue[0]?.value?.[0]?.address;
        } else {
            toAddress = addressValue?.value?.[0]?.address;
        }

        if (!toAddress) return null;

        const mailbox = toAddress.split("@")[0] ?? '';

        // mailparser specifies html as `string | false`
        const htmlContent = typeof parsedMail.html === "string" ? parsedMail.html : "";

        return {
            mailbox,
            from: parsedMail.from?.text || "unknown",
            to: toAddress || "unknown",
            subject: parsedMail.subject || "",
            text: parsedMail.text || "",
            html: htmlContent
        };

    } catch (error) {
        logger.error(`Error parsing email: ${JSON.stringify(error)}`);
        return null;
    }
}