function withDTO(DTOClass, controllerFn) {
  return async (req, res, next) => {
      await controllerFn(new DTOClass(req.body), req, res);
  };
}

module.exports = {withDTO};
