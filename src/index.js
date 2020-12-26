require('module-alias/register');
const commando = require('discord.js-commando');
const path = require('path');
const { prefix, env } = require('@config');

const client = new commando.CommandoClient({
  owner: env.ownerId,
  commandPrefix: prefix,
});

client.on('error', console.error).on('ready', () => {
  console.log('Ready!');
});

client.registry
  .registerDefaults()
  .registerGroups([['misc', 'misc commands']])
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(env.token);
