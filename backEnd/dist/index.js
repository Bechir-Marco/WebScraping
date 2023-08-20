"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv.config();
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});
//Routes
const jumiaRoutes = require('./routes/jumia');
const tunisianetRoutes = require('./routes/tunisianet');
const mytekRoutes = require('./routes/mytek');
const alkitabRoutes = require('./routes/alkitab');
app.use(express_1.default.json());
const port = process.env.PORT;
const dbURI = process.env.CONNECTION_STRING;
// Check if api is defined before connecting to MongoDB
if (dbURI) {
    // Database Connection
    mongoose_1.default
        .connect(dbURI, {
        dbName: 'dotIt',
    })
        .then(() => {
        console.log('Database Connection is ready dotIt...');
    })
        .catch((err) => {
        console.error('Database Connection Error:', err);
    });
}
else {
    console.error('MongoDB connection URI is not defined.');
}
app.use(`/alkitab`, alkitabRoutes);
app.use(`/jumia`, jumiaRoutes);
app.use(`/mytek`, mytekRoutes);
app.use(`/tunisianet`, tunisianetRoutes);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is runnnnning at http://localhost:${port}`);
});
