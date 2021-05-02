require('dotenv').config();

// Modules
const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const moment = require('moment');
const { stripIndents } = require('common-tags');
const db = require('quick.db');
const Fateslist = require('fateslist.js');

// Create Client
global.Discord = require('discord.js');
global.client = new Discord.Client();
global.flclient = new Fateslist.Client(process.env.FL_TOKEN);
const fatesHook = new Fateslist.WebhookClient(process.env.FL_TOKEN);
const { MessageEmbed } = require('discord.js');

// Configs
const token = process.env.token;
global.settings = require('./storage/config.json');
global.prefix = settings.client.prefix;
client.functions = require('./utils/func/util.js');
client.emotes = require('./storage/emotes/emotes.json');
client.colors = require('./storage/colors/colors.json');
client.success = client.colors.success;
client.error = client.colors.error;
client.warning = client.colors.warning;
client.blue = client.colors.blue;
client.pink = client.colors.pink;

// Custom Logger (Global)
const fileDate = moment().format('MMM-DD-YYYY_h-mm-ss_a');
const customLevels = {
  levels: {
    cmd: 1,
    info: 1,
    ready: 1,
    warn: 2,
    error: 1
  },
};

global.logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: `./storage/logs/RemiLog-${fileDate}.log` })
  ],
  levels: customLevels.levels,
  format: combine(
    format.timestamp({
      format: 'HH:mm:ss'
    }),
    format.printf(log => `[${log.level.toUpperCase()}] <-> ${log.message}`)
  ),
});

// Register Events
// fs.readdir('./utils/events', (err, files) => {
//   if (err) return logger.log('error', error)
//   files.forEach(file => {
//     const eventFunction = require(`./utils/events/${file}`);
//     if (eventFunction.disabled) return;

//     const event = eventFunction.event || file.split('.')[0];
//     const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunCollection.emitter] : eventFunction.emitter) || client;
//     const once = eventFunction.once;

//     try {
//       emitter[once ? 'once' : 'on'](event, (client, message, args) => eventFunction.run(client, message, args));
//     } catch (error) {
//       logger.log('error', `${error.stack}`)
//     }
//   });
// });

// Commands Collection
client.commands = new Discord.Collection();
// Cooldowns Collection
const cooldowns = new Discord.Collection();

// Register Commands
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

// Events Without Handler
client.on('ready', async () => {
  setTimeout(async () => {
    logger.log('info', 'Fetching members...');

    for (const [id, guild] of client.guilds.cache) {
      await guild.members.fetch();
    }

    logger.log('info', 'Fetched members.');
  }, 100);

  logger.log('ready', `${client.user.username} is ready. (${client.guilds.cache.size} Servers - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users)`);

  client.functions.status();
  // Change status every 10s
  setInterval(() => {
    client.functions.status();
  }, 10000);

  fatesHook.on('vote', async v => {
    await client.users.fetch(v.voter.id).then((user) => {
      let embed = new MessageEmbed()
      .setTitle(`${client.user.username} - Vote Rewards`)
      .setDescription(stripIndents`
        Thank you for voting for me!
        You have been rewarded with the following items:
        +\`${settings.client.rewards.voting_money}\` rCoins!
      `)
    })
  })
});

// Message Event
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  let args = message.content.slice(prefix.length).split(/ +/);
  let commandName = args.shift().toLowerCase();

  let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  // Check if command can be executed in DM
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  // Check if args are required
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  // Check if user is in cooldown
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  // Logging / Error Handler
  client.on('error', e => {
    logger.log('error', e);
    message.channel.send(stripIndents`
      **Error:**

      \`\`\`${e}\`\`\`
      This should not have happened, please report this error here: <https://discord.gg/HCzrjWkv73>
      *This error occured while running the command: \`${command.name}\`*
    `)
  });
  client.on('warn', w => logger.log('warn', w));
  process.on('unhandledRejection', (ur) => {
    logger.log('error', ur);
    message.channel.send(stripIndents`
          **Error:**

          \`\`\`${ur}\`\`\`
          This should not have happened, please report this error here: <https://discord.gg/HCzrjWkv73>
          *This error occured while running the command: \`${command.name}\`*
      `)
  });
  process.on('uncaughtException', (ue) => { 
    logger.log('error', ue);
    message.channel.send(stripIndents`
      **Error:**

      \`\`\`${ue}\`\`\`
      This should not have happened, please report this error here: <https://discord.gg/HCzrjWkv73>
      *This error occured while running the command: \`${command.name}\`*
    `)
  });

  let now = Date.now();
  let timestamps = cooldowns.get(command.name);
  let cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    let expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      // if user is in cooldown
      let timeLeft = (expirationTime - now);

      let days = Math.floor(timeLeft / 86400000);
      let hours = Math.floor(timeLeft / 3600000) % 24;
      let minutes = Math.floor(timeLeft / 60000) % 60;
      let seconds = Math.floor(timeLeft / 1000) % 60;

      const str = `${days.toFixed(0)} day(s), ${hours.toFixed(0)} hour(s), ${minutes.toFixed(0)} minute(s) and ${seconds.toFixed(1)} more second(s)`;
      return message.reply(`Please wait ${str} before reusing the \`${command.name}\` command.`);
    }
  } else {
    // if user is not in cooldown
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    // Execute command
    try {
      command.execute(client, message, args);
      let loggedArgs = args.slice(0).join(" ");

      if (!loggedArgs) {
        logger.log('cmd', stripIndents`
            User: ${message.author.tag}
            Executed Command: ${command.name}
            Category: ${command.category}
          `);
      } else {
        logger.log('cmd', stripIndents`
            User: ${message.author.tag}
            Executed Command: ${command.name} ${loggedArgs}
            Category: ${command.category}
          `);
      }
    } catch (e) {
      // Error Handler
      logger.log('error', e);
      message.channel.send(stripIndents`
          **Error:**

          \`\`\`${e}\`\`\`
          This should not have happened, please report this error here: <https://discord.gg/HCzrjWkv73>
          *This error occured while running the command: \`${command.name}\`*
        `)
      // console.log('this');
    }
  }

})

// Login
client.login(token);
