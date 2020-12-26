const commando = require('discord.js-commando');
const { env, allowedCommandChannel, allowedCommandRole } = require('@config');

class SendObsninjaUrl extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'send-obsninja-url',
      aliases: ['sendurl', 'send'],
      memberName: 'send-obsninja-url',
      description: 'Send streaming url of OBS.Ninja from RTA in Japan Bot',
      group: 'misc',
      guildOnly: true,
      args: [
        {
          key: 'id',
          prompt: '※送信先IDが代入されていません。',
          type: 'string',
          validate: (id) => id.match(/^[0-9a-zA-Z]{1,24}$/),
        },
      ],
    });
  }

  async run(message, { id }) {
    if (!allowedCommandChannel.obsninja.includes(message.channel.id)) return;
    const member = message.member;
    if (
      !member.hasPermission('ADMINISTRATOR') &&
      !member.roles.cache.find((role) =>
        allowedCommandRole.obsninja.includes(role.name)
      )
    ) {
      return message.reply(`コマンドを使用する権限がありません。`);
    }
    const parameter = `?room=${env.obsninja.room}&hash=${env.obsninja.hash}&stereo=1&aec=0&webcam&view&push=${id}&password=${env.obsninja.password}`;
    return member.send(
      `走者送信URL\nhttps://obs.ninja/${parameter}\n上記が使えない場合\nhttps://obs.ninja/v134/${parameter}`
    );
  }
}

module.exports = SendObsninjaUrl;
