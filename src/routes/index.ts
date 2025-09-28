import { Router } from "express";
import locationRouter from "./location.router";
import weatherRoute from "./weather.routes";

const router = Router();

router.use('/localidade', locationRouter);
router.use('/clima', weatherRoute);
export default router;