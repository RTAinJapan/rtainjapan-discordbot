"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const config_1 = __importDefault(require("config"));
const config = config_1.default.util.toObject(config_1.default);
class SendObsninjaUrl extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "send-obsninja-url",
            aliases: ["sendurl", "send"],
            memberName: "send-obsninja-url",
            description: "Send streaming url of OBS.Ninja from RTA in Japan Bot",
            group: "misc",
            guildOnly: true,
            args: [
                {
                    key: "id",
                    prompt: "※送信先IDが代入されていません。",
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
        const parameter = `?room=${config.obsninja.room}&hash=${config.obsninja.hash}&stereo=1&aec=0&webcam&view&push=${id}&password=${config.obsninja.password}`;
        return member.send(`走者送信URL\nhttps://obs.ninja/${parameter}\n上記が使えない場合\nhttps://obs.ninja/v134/${parameter}`);
    }
}
exports.default = SendObsninjaUrl;
//# sourceMappingURL=send-obsninja-url.js.map