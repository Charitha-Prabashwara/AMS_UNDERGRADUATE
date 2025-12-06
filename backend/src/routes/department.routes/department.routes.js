const express = require('express');

const { withDTO } = require('../../middleware');
const {CreateDepartmentDTO,GetDepartmentByIdDTO} = require('../../classes/DTO');

const {createDepartment} = require('../../controllers/department.controllers/create.department.controller')
const {getDepartmentById} = require('../../controllers/department.controllers/get.department.controller')
const departmentRouter = express.Router();

departmentRouter.post('/', withDTO(CreateDepartmentDTO, createDepartment));
departmentRouter.get('/id/', withDTO(GetDepartmentByIdDTO, getDepartmentById))
module.exports = departmentRouter;
