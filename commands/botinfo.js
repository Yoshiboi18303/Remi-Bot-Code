const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");

const config = require("../botconfig.json");

const codeshiboi = `<@!${config.workers.codeshi}>`;
const gamerKenny = `<@!${config.workers.gamerkenny}>`;
const fearful = `<@!${config.workers.fearful}>`;
const yisi = `<@!${config.workers.yisi}>`;
const commander = `<@!${config.workers.contributors.commander}>`;
const paul = `<@!${config.workers.contributors.paul}>`;

module.exports.run = async (bot, message) => {
  let user = message.author;

      let days = 0;
      let week = 0;
      let uptime = ``;
      let totalSeconds = bot.uptime / 1000;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);

      let servers = bot.guilds.cache.size;
      let users = bot.users.cache.size;

      if (hours > 23) {
        days = days + 1;
        hours = 0;
      }

      if (days == 7) {
        days = 0;
        week = week + 1;
      }

      if (week > 0) {
        uptime += `${week} week, `;
      }

      if (minutes > 60) {
        minutes = 0;
      }

      uptime += `${days}d, ${hours}h, ${minutes}m and ${seconds}s`;

  let botinfoEmbed = new MessageEmbed()
    .setColor("#00FF02")
    .setTitle(`${bot.user.username} Info!`)
    .setDescription(
      stripIndents`
Hello ${user}! I see you want to see my Info! Well here it is!

**__ROBUXBOT__ INFO**

**__BASIC INFO__**

Bot is in ${await bot.guilds.cache.size} servers!
Bot is making Robux with ${await bot.users.cache.size} users in those ${await bot
        .guilds.cache.size} servers!
Bot was originally made, coded, and hosted using: Fear.Inc
Bot is now made, and coded using: Visual Studio Code
Bot is hosted on: Fear.VPS (thanks ${fearful})
Contributors: ${commander}, ${paul}, ${fearful}
Workers on this bot: ${codeshiboi}, ${gamerKenny}, ${fearful}, ${yisi}
Uptime: \`${uptime}\`
Status: <:RobuxBot_Online:835683026939805697> **OK**

===========================================================================

**__ADVANCED INFO__**

CPU Usage: **COMING SOON**

===========================================================================

`
    )
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp();
  message.channel.send(botinfoEmbed);
};

module.exports.help = {
  name: "botinfo",
  aliases: []
};
