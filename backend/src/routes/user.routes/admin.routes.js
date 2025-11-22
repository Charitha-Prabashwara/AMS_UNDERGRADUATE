const express = require("express");
const { create } = require("../../controllers");
const {withDTO} = require("../../middleware");
const { CreateUserDTO } = require("../../classes/DTO");

const adminRouter = express.Router();
adminRouter.post("/", withDTO(CreateUserDTO, create));
module.exports = adminRouter;
