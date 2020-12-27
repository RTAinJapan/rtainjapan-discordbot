const commando = require('discord.js-commando');
const { env, allowedCommandChannel, allowedCommandRole } = require('@config');

class ReceiveObsninjaUrl extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'receive-obsninja-url',
      aliases: ['receiveurl', 'receive'],
      memberName: 'receive-obsninja-url',
      description: 'Receive streaming url of OBS.Ninja from RTA in Japan Bot',
      group: 'misc',
      guildOnly: true,
      args: [
        {
          key: 'id',
          prompt: '※受信先IDが代入されていません。',
          type: 'string',
          validate: (id) => id.match(/^[0-9a-zA-Z_]{1,24}$/),
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
    return member.send(
      `配信受信URL\nhttps://obs.ninja/?scene&room=${env.obsninja.room}&hash=${env.obsninja.hash}&stereo=1&codec=vp9&view=${id}&password=${env.obsninja.password}`
    );
  }
}

module.exports = ReceiveObsninjaUrl;
