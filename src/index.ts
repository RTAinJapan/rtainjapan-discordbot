import { CommandoClient } from 'discord.js-commando';
import { join } from 'path';
import configModule from 'config';
const config: Config = configModule.util.toObject(configModule);

const client = new CommandoClient({
  owner: config.ownerId,
  commandPrefix: config.prefix,
});

client.on('error', console.error).on('ready', () => {
  console.log('Ready!');
});

client.registry
  .registerDefaults()
  .registerGroups([['misc']])
  .registerCommandsIn(join(__dirname, 'commands'));

client.login(config.token);
