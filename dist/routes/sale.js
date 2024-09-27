"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createSale = require("../controllers/sale/create");
// const getAllSales = require("../controllers/sale/getAll");
// const getSaleById = require("../controllers/sale/getById");
// const deleteSale = require("../controllers/sale/delete");
// const updateSale = require("../controllers/sale/update");
const saleRouter = (0, express_1.Router)();
saleRouter.post("/create", createSale);
// saleRouter.get("/", getAllSales);
// saleRouter.get("/:id", getSaleById);
// saleRouter.delete("/:id", deleteSale);
// saleRouter.put("/:id", updateSale);
exports.default = saleRouter;
//# sourceMappingURL=sale.js.map