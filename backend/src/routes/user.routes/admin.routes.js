const express = require("express");
const { createUser } = require("../../controllers");
const {withDTO} = require("../../middleware");
const { CreateUserDTO } = require("../../classes/DTO");

const adminRouter = express.Router();
adminRouter.post("/", withDTO(CreateUserDTO, createUser));
module.exports = adminRouter;
