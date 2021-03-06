"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const util_1 = require("utils/util");
const app = express_1.default();
app.get("/", (req, res) => {
    util_1.sum();
    res.send("Service for batchjob");
});
app.listen(5000, () => {
    console.log(`server started at http://localhost:${5000}`);
});
//# sourceMappingURL=index.js.map