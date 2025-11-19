/**
 * @jest-environment node
 */

jest.mock('../../../src/classes/Department.js');
jest.mock('../../../src/classes/DepartmentBuilder.js');
jest.mock('../../../src/classes/DATABASE', () => {
    return {
        DepartmentRepository: jest.fn().mockImplementation(() => ({
            findById: jest.fn(),
            deleteById: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
        })),
    };
});

const DepartmentService = require('../../../src/services/DepartmentService');
const Department = require('../../../src/classes/Department');
const DepartmentBuilder = require('../../../src/classes/DepartmentBuilder');
const { DepartmentRepository } = require('../../../src/classes/DATABASE');

describe("DepartmentService", () => {

    let service;
    let repoMock;

    beforeEach(() => {
        service = new DepartmentService();
        repoMock = new DepartmentRepository();
        jest.clearAllMocks();
    });

    // -------------------------------------------------------------------
    // TEST: getDepartmentById
    // -------------------------------------------------------------------

    test("getDepartmentById should return department by ID", async () => {
        const deptData = { id: "123", name: "IT" };

        Department.mockImplementation(() => ({
            findById: jest.fn().mockResolvedValue(deptData)
        }));

        const result = await service.getDepartmentById("123");

        expect(result).toEqual(deptData);
        expect(Department).toHaveBeenCalledTimes(1);
    });

    test("getDepartmentById should throw error", async () => {
        Department.mockImplementation(() => ({
            findById: jest.fn().mockRejectedValue(new Error("DB error"))
        }));

        await expect(service.getDepartmentById("x"))
            .rejects
            .toThrow("DB error");
    });

    // -------------------------------------------------------------------
    // TEST: getFindDepartment
    // -------------------------------------------------------------------

    test("getFindDepartment should return list", async () => {
        const mockDeptList = [{ id: 1 }, { id: 2 }];

        const departmentInstance = { find: jest.fn().mockResolvedValue(mockDeptList) };

        const result = await service.getFindDepartment(departmentInstance);

        expect(result).toEqual(mockDeptList);
        expect(departmentInstance.find).toHaveBeenCalledTimes(1);
    });

    test("getFindDepartment should throw error", async () => {
        const departmentInstance = {
            find: jest.fn().mockRejectedValue(new Error("Query failed"))
        };

        await expect(service.getFindDepartment(departmentInstance))
            .rejects
            .toThrow("Query failed");
    });

    // -------------------------------------------------------------------
    // TEST: createDepartment
    // -------------------------------------------------------------------

    test("createDepartment should build and create new department", async () => {
        const data = { name: "IT", description: "Tech dept" };
        const createdDept = { id: "1", name: "IT" };

        DepartmentBuilder.mockImplementation(() => ({
            name: null,
            description: null,
            create: jest.fn().mockResolvedValue(createdDept)
        }));

        const result = await service.createDepartment(data);

        expect(DepartmentBuilder).toHaveBeenCalledTimes(1);
        expect(result).toEqual(createdDept);
    });

    test("createDepartment should throw error if builder fails", async () => {
        DepartmentBuilder.mockImplementation(() => ({
            create: jest.fn().mockRejectedValue(new Error("Create failed"))
        }));

        await expect(service.createDepartment({}))
            .rejects
            .toThrow("Create failed");
    });

    // -------------------------------------------------------------------
    // TEST: deleteDepartmentById
    // -------------------------------------------------------------------

    test("deleteDepartmentById should delete department by ID", async () => {
        const deletedDept = { id: "55", deleted: true };

        Department.mockImplementation(() => ({
            deleteById: jest.fn().mockResolvedValue(deletedDept)
        }));

        const result = await service.deleteDepartmentById("55");

        expect(result).toEqual(deletedDept);
    });

    test("deleteDepartmentById should throw error", async () => {
        Department.mockImplementation(() => ({
            deleteById: jest.fn().mockRejectedValue(new Error("Delete failed"))
        }));

        await expect(service.deleteDepartmentById("x"))
            .rejects
            .toThrow("Delete failed");
    });

});
