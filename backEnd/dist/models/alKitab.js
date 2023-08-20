"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const alKitabSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
}, { collection: 'alKitab' });
exports.default = (0, mongoose_1.model)('alKitab', alKitabSchema);
