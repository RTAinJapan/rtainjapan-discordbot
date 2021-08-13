"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const config_1 = __importDefault(require("config"));
const config = config_1.default.util.toObject(config_1.default);
class ReceiveObsninjaUrl extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "receive-obsninja-url",
            aliases: ["receiveurl", "receive"],
            memberName: "receive-obsninja-url",
            description: "Receive streaming url of OBS.Ninja from RTA in Japan Bot",
            group: "misc",
            guildOnly: true,
            args: [
                {
                    key: "id",
                    prompt: "※受信先IDが代入されていません。",
                    type: "string",
                    validate: (id) => id.match(/^[0-9a-zA-Z_]{1,24}$/),
                },
            ],
        });
    }
    async run(message, { id }) {
        if (!config.allowedCommandChannel.obsninja.includes(message.channel.id))
            return null;
        const member = message.member;
        if (!(member === null || member === void 0 ? void 0 : member.hasPermission("ADMINISTRATOR")) &&
            !(member === null || member === void 0 ? void 0 : member.roles.cache.find((role) => config.allowedCommandRole.obsninja.includes(role.name)))) {
            return message.reply(`コマンドを使用する権限がありません。`);
        }
        return member.send(`配信受信URL\nhttps://obs.ninja/?scene&room=${config.obsninja.room}&hash=${config.obsninja.hash}&stereo=1&codec=vp9&view=${id}&password=${config.obsninja.password}`);
    }
}
exports.default = ReceiveObsninjaUrl;
//# sourceMappingURL=receive-obsninja-url.js.map