class CrudController {
  constructor(model) {
    this.model = model;
  }
  create = async (req, res, next) => {
    try {
        console.log(req.body);
      const response = await this.model.create(req.body);
      return res.message201("ID "+response._id);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const response = await this.model.find();
      if (response.length !== 0) {
        return res.response200(response);
      } else {
        return res.error404();
      }
    } catch (error) {
      return next(error);
    }
  };
  readById = async (req, res, next) => {
    try {
      const response = await this.model.findById(req.params.id);
      if (response) {
        return res.response200(response);
      } else {
        return res.error404();
      }
    } catch (error) {
      return next(error);
    }
  };
  updateById = async (req, res, next) => {
    try {
      const response = await this.model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (response) {
        return res.response200(response);
      } else {
        return res.error404();
      }
    } catch (error) {
      return next(error);
    }
  };
  deleteById = async (req, res, next) => {
    try {
      const response = await this.model.findByIdAndDelete(req.params.id);
      if (response) {
        return res.response200(response);
      } else {
        return res.error404();
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default CrudController;
