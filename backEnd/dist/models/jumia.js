"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jumiaSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    fiche_technique: { type: String, required: true },
}, { collection: 'jumia' });
exports.default = (0, mongoose_1.model)('jumia', jumiaSchema);
jumiaSchema.index({ description: 'text', fiche_technique: 'text', title: 'text', category: 'text' }, { name: "TextIndex" });
