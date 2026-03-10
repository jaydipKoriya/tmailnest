import { Router } from "express";
import { createMailBox } from "../controllers";

const router = Router();

router.get("/create", createMailBox);

export default router;
