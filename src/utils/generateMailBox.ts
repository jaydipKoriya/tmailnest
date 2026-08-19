import { customAlphabet } from "nanoid";

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';

export const generateMailBox = customAlphabet(alphabet, 12);
