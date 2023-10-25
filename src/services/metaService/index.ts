import deleteMeta from "./deleteMeta";
import findMetasByUserId from "./findMetasByUserId";
import saveMeta from "./saveMeta";
import updateMeta from "./updateMeta";


const metaService = {
  findMetasByUserId,
  saveMeta,
  updateMeta,
  deleteMeta
}

export default metaService;