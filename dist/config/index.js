"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.allowedCommandRole = exports.allowedCommandChannel = exports.prefix = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.prefix = '!';
exports.allowedCommandChannel = {
    obsninja: ['172334081642594304'],
};
exports.allowedCommandRole = {
    obsninja: ['走者', '走者（Backup）', '技術'],
};
exports.env = {
    token: (_a = process.env.TOKEN) !== null && _a !== void 0 ? _a : '',
    ownerId: (_b = process.env.OWNER_ID) !== null && _b !== void 0 ? _b : '',
    obsninja: {
        room: (_c = process.env.OBSNINJA_ROOM) !== null && _c !== void 0 ? _c : '',
        hash: (_d = process.env.OBSNINJA_HASH) !== null && _d !== void 0 ? _d : '',
        password: (_e = process.env.OBSNINJA_PASSWORD) !== null && _e !== void 0 ? _e : '',
    },
};
//# sourceMappingURL=index.js.map