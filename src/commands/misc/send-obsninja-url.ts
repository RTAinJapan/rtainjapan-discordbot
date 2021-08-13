import { Message } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import configModule from "config";
const config: Config = configModule.util.toObject(configModule);

class SendObsninjaUrl extends Command {
  constructor(client: CommandoClient) {
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
    const parameter = `?room=${config.obsninja.room}&hash=${config.obsninja.hash}&stereo=1&aec=0&webcam&view&push=${id}&password=${config.obsninja.password}`;
    return member.send(
      `走者送信URL\nhttps://obs.ninja/${parameter}\n上記が使えない場合\nhttps://obs.ninja/v134/${parameter}`
    );
  }
}

export default SendObsninjaUrl;
