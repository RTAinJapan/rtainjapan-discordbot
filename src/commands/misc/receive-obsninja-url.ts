import { Message } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import configModule from "config";
const config: Config = configModule.util.toObject(configModule);

class ReceiveObsninjaUrl extends Command {
  constructor(client: CommandoClient) {
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
          validate: (id: string) => id.match(/^[0-9a-zA-Z_]{1,24}$/),
        },
      ],
    });
  }

  public async run(
    message: CommandoMessage,
    { id }: { id: string }
  ): Promise<Message | null> {
    if (!config.allowedCommandChannel.obsninja.includes(message.channel.id))
      return null;
    const member = message.member;
    if (
      !member?.hasPermission("ADMINISTRATOR") &&
      !member?.roles.cache.find((role) =>
        config.allowedCommandRole.obsninja.includes(role.name)
      )
    ) {
      return message.reply(`コマンドを使用する権限がありません。`);
    }
    return member.send(
      `配信受信URL\nhttps://obs.ninja/?scene&room=${config.obsninja.room}&hash=${config.obsninja.hash}&stereo=1&codec=vp9&view=${id}&password=${config.obsninja.password}`
    );
  }
}

export default ReceiveObsninjaUrl;
