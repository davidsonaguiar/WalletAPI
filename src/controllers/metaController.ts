import { Request, Response } from "express";
import userService from "../services/userService";
import metaService from "../services/metaService";
import { Meta } from "@prisma/client";

async function getMetasByUseId(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);

  if(userId) {
    try {
      const metas = await metaService.findMetasByUserId(userId);
      return response.status(200).json(metas);
    } catch(error) {
      return response.status(404).json("Error ao buscar suas metas");
    }
  } else {
    return response.status(401).json("Usuário não autorizado.");
  }
}

async function addMeta(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);

  if(userId) {
    const body: Meta = await request.body;

    try {
      body.user_id = userId;
      await metaService.saveMeta(body);
      return response.status(201).json("Adicionado com sucesso.");
    } catch(error) {
      console.log(error);
      return response.status(500).json("Error ao adicionar meta.");
    }
  } else {
    return response.status(401).json("Usuário não autorizado.");
  }
}

async function editMeta(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);

  if(userId) {
    const body: Meta = await request.body;
    try {
      body.user_id = userId;
      await metaService.updateMeta(body);
      return response.status(200).json("Atualizada com sucesso.");
    } catch(error) {
      console.log(error)
      return response.status(500).json("Error ao atualizar a meta.");
    }
  } else {
    return response.status(401).json("Usuário não autorizado.");
  }
}

async function removeMeta(request: Request, response: Response) {
  const auth = request.headers.authorization;
  const userId = auth && userService.getUserIdByToken(auth);

  if(userId) {
    const id: string = request.params.id;
    try {
      await metaService.deleteMeta(id);
      return response.status(200).json("Deletado com sucesso.");
    } catch(error) {
      return response.status(500).json("Error ao deletar a meta.");
    }
  } else {
    return response.status(401).json("Usuário não autorizado.");
  }
}

const metaController = {
  getMetasByUseId,
  addMeta,
  editMeta,
  removeMeta
}

export default metaController;