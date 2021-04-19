const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const bot = new Discord.Client({ disableEveryone: true });

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

bot.on("ready", async () => {
  
  bot.user.setStatus("online");

  bot.user.setActivity(`for Robux;help - (made by) Yoshiboi_Development`, { type: "WATCHING" });

  bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;

    if (bot.commands.has(cmd)) {
      commandfile = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
      commandfile = bot.commands.get(bot.aliases.get(cmd));
    }

    if (!message.content.startsWith(prefix)) return;

    try {
      commandfile.run(bot, message, args);
    } catch (e) {}
  });
});

// YOU CAN'T HACK THIS BOT DUE TO THE CODE BELOW. SUCK IT HACKERS. YOU PIECES OF S**T! LMAO

bot.login(process.env.token);
