"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jumia_1 = __importDefault(require("../models/jumia"));
router.get(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        let queryCondition = false;
        const pageSize = 20;
        const page = parseInt(req.query.page) || 1;
        const totalItems = yield jumia_1.default.countDocuments();
        const totalPages = Math.ceil(totalItems / pageSize);
        let sort = {};
        const sortOptions = req.query.sortOptions || '';
        if (sortOptions) {
            let sortOpt = sortOptions.split('_');
            sort = { [sortOpt[0]]: Number(sortOpt[1]) };
        }
        let categoryCondition = {};
        const categoryName = req.query.categoryName || '';
        if (categoryName) {
            queryCondition = true;
            const searchTerms = categoryName.split(/\s+/).map(term => {
                return term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            });
            const regexPattern = new RegExp(searchTerms.join('|'), 'i');
            categoryCondition = {
                $or: [
                    { category: regexPattern }, { description: regexPattern }
                ]
            };
        }
        const searchQuery = req.query.search || '';
        let searchQuertCondition = {};
        if (searchQuery) {
            queryCondition = true;
            const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regexPattern = new RegExp(escapedSearchQuery, 'i');
            searchQuertCondition = {
                $or: [
                    { title: regexPattern },
                    { description: regexPattern },
                    { fiche_technique: regexPattern }
                ]
            };
        }
        if (queryCondition) {
            query = {
                $and: [
                    categoryCondition,
                    searchQuertCondition
                ]
            };
        }
        const itemsList = yield jumia_1.default
            .find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        if (itemsList.length === 0) {
            res.status(404).json({ success: false, message: 'No jumiaitem found.' });
        }
        else {
            res.json({
                success: true,
                totalPages,
                currentPage: page,
                itemsList,
            });
        }
    }
    catch (error) {
        res.status(500).json({ success: false });
    }
}));
router.get(`/item/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield jumia_1.default.findById(req.params.id);
        console.log(item);
        if (!item) {
            res.status(404).json({ success: false, message: 'jumiaitem not found.' });
        }
        else {
            res.send(item);
        }
    }
    catch (error) {
        res.status(500).json({ success: false });
    }
}));
module.exports = router;
