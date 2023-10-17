import { Router } from "express";
import metaController from "../controllers/metaController";

const metaRouter = Router();

metaRouter.get("/metas", metaController.getMetasByUseId);
metaRouter.post("/metas", metaController.addMeta);
metaRouter.put("/metas/:id", metaController.editMeta);
metaRouter.delete("/metas/:id", metaController.removeMeta);


export default metaRouter;