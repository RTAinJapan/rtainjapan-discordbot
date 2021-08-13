"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const path_1 = require("path");
const config_1 = __importDefault(require("config"));
const config = config_1.default.util.toObject(config_1.default);
const client = new discord_js_commando_1.CommandoClient({
    owner: config.ownerId,
    commandPrefix: config.prefix,
});
client.on("error", console.error).on("ready", () => {
    console.log("Ready!");
});
client.registry
    .registerDefaults()
    .registerGroups([["misc", "misc commands"]])
    .registerCommandsIn(path_1.join(__dirname, "commands"));
client.login(config.token);
//# sourceMappingURL=index.js.map