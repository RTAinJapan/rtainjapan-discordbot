"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const config_1 = __importDefault(require("config"));
const config = config_1.default.util.toObject(config_1.default);
const commandType = Object.keys(config.commands).join('|');
/** コマンドの使い方 */
const usageText = `Usage: ${config.prefix}{${commandType}} {urlType} {user}`;
class ReceiveObsninjaUrl extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'send-url',
            aliases: [...Object.keys(config.commands)],
            memberName: 'send-url',
            description: `Send DM broadcast/watch url from RTA in Japan Bot\n${usageText}`,
            group: 'misc',
            guildOnly: true,
        });
    }
    async run(message) {
        var _a, _b;
        // commandoの引数処理に任せると、間違った時にcancell処理が必要になって鬱陶しい。自前で処理する
        const splited = message.content.trim().split(/\s/);
        const type = splited.length > 2 ? splited[1] : '';
        const user = splited.length === 2 ? splited[1] : (_a = splited[2]) !== null && _a !== void 0 ? _a : '';
        if (!user)
            return message.reply(`${usageText}`);
        console.log(`exeUser=${(_b = message.member) === null || _b === void 0 ? void 0 : _b.user.tag} type=${type} targetUser=${user} channelId=${message.channel.id}`);
        // commandoのvalidateだと埋め込みのメッセージで応答するので具合が悪い。自前でvalidateとメッセージ返信
        if (!user.match(/^<@![0-9]{1,24}>$/))
            return message.reply(`ユーザの形式が誤り\n${usageText}`);
        // 実行チャンネルチェック
        if (config.allowedCommandChannel.length > 0 && !config.allowedCommandChannel.includes(message.channel.id))
            return null;
        // 権限チェック
        const member = message.member;
        if (!(member === null || member === void 0 ? void 0 : member.hasPermission('ADMINISTRATOR')) && config.allowedCommandRole.length > 0 && !(member === null || member === void 0 ? void 0 : member.roles.cache.find((role) => config.allowedCommandRole.includes(role.id)))) {
            return message.reply(`コマンドを使用する権限がありません。`);
        }
        // 送信先のユーザの存在確認
        const userId = user.replace(/[@!<>]/g, '');
        const userItem = this.client.users.cache.find((item) => item.id === userId);
        if (!userItem)
            return message.reply(`そんなユーザはこのサーバにいません`);
        // configから返信対象の値を取得
        const commandType = message.content.split(' ')[0].replace(config.prefix, '');
        const command = config.commands[commandType];
        const prefix = command.commentPrefix;
        const item = command.list.find((item) => !item.type || item.type === type);
        if (!item) {
            // 指定されたtypeがconfigに無かった
            const types = command.list.map((item) => item.type).join(',');
            return message.reply(`allow types=${types}`);
        }
        const url = item.url;
        // 指定したユーザにDM
        return userItem.send(`${prefix}${url}`);
    }
}
exports.default = ReceiveObsninjaUrl;
//# sourceMappingURL=sendUrl.js.map