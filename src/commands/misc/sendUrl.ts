import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import configModule from 'config';
const config: Config = configModule.util.toObject(configModule);
const commandType = Object.keys(config.commands).join('|');

/** コマンドの使い方 */
const usageText = `Usage: ${config.prefix}{${commandType}} {urlType} {user}`;

class ReceiveObsninjaUrl extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'send-url',
      aliases: [...Object.keys(config.commands)],
      memberName: 'send-url',
      description: `Send DM broadcast/watch url from RTA in Japan Bot\n${usageText}`,
      group: 'misc',
      guildOnly: true,
    });
  }

  public async run(message: CommandoMessage): Promise<Message | null> {
    // commandoの引数処理に任せると、間違った時にcancell処理が必要になって鬱陶しい。自前で処理する
    const splited = message.content.trim().split(/\s/);
    const type = splited.length > 2 ? splited[1] : '';
    const user = splited.length === 2 ? splited[1] : splited[2] ?? '';
    if (!user) return message.reply(`${usageText}`);

    console.log(`exeUser=${message.member?.user.tag} type=${type} targetUser=${user} channelId=${message.channel.id}`);

    // commandoのvalidateだと埋め込みのメッセージで応答するので具合が悪い。自前でvalidateとメッセージ返信
    if (!user.match(/^<@![0-9]{1,24}>$/)) return message.reply(`ユーザの形式が誤り\n${usageText}`);

    // 実行チャンネルチェック
    if (config.allowedCommandChannel.length > 0 && !config.allowedCommandChannel.includes(message.channel.id)) return null;

    // 権限チェック
    const member = message.member;
    if (!member?.hasPermission('ADMINISTRATOR') && config.allowedCommandRole.length > 0 && !member?.roles.cache.find((role) => config.allowedCommandRole.includes(role.id))) {
      return message.reply(`コマンドを使用する権限がありません。`);
    }

    // 送信先のユーザの存在確認
    const userId = user.replace(/[@!<>]/g, '');
    const userItem = this.client.users.cache.find((item) => item.id === userId);
    if (!userItem) return message.reply(`そんなユーザはこのサーバにいません`);

    // configから返信対象の値を取得
    const commandType = message.content.split(' ')[0].replace(config.prefix, '') as keyof typeof config.commands;
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

export default ReceiveObsninjaUrl;
