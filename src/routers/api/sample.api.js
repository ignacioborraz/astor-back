//ENRUTADOR LLAMA A CONTROLADOR
import CustomRouter from "../CustomRouter.js";
import CrudController from "../../controllers/crud.controllers.js";
import Sample from "../../models/sample.model.js";
import mainData from "../../middlewares/mainData.mid.js";
import uploader from "../../middlewares/multer.mid.js";
import addFiles from "../../middlewares/addFiles.mid.js";

class MuestrasRouter extends CustomRouter {
  init() {
    const controller = new CrudController(Sample);
    const { create, read, readById, updateById, deleteById } = controller;
    this.create(
      "/",
      ["ADMIN"],
      uploader.array("photos", 50),
      uploader.single("main_photo"),
      mainData,
      addFiles,
      create
    );
    this.read("/", ["PUBLIC"], read);
    this.read("/:id", ["PUBLIC"], readById);
    this.update("/:id", ["ADMIN"], updateById);
    this.destroy("/:id", ["ADMIN"], deleteById);
  }
}

const muestrasRouter = new MuestrasRouter();
export default muestrasRouter.getRouter();
