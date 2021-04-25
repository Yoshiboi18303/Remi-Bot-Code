const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { stripIndents } = require("common-tags");

module.exports.run = async (bot, message, args) => {
  let userinfo = new MessageEmbed();
  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.member;
  function checkUserPremium() {
    // let guild = message.guild;
    if (member.premiumSince > 0) {
      return `Boosting since: ${moment(member.premiumSince).format(
        "dddd, MMMM Do YYYY"
      )}`;
    } else {
      return `Not boosting`;
    }
  }

  try {
    if (member) {
      let embed = new MessageEmbed()
        .setDescription(`<@${member.id}>`)
        .addField(
          "Joined at: ",
          `\`${moment(member.joinedAt).format("dddd, MMMM, Do, YYYY")}\``,
          true
        )
        .addField(
          "Created at: ",
          `\`${moment(member.createdAt).format("dddd, MMMM, Do, YYYY")}\``,
          true
        )
        .addField("Nickname: ", `\`${member.nickname || "No Nickname"}\``, true)
        .addField("Boost Status: ", `\`${checkUserPremium()}\``)
        .setFooter(`ID: ${member.id}`)
        .setColor("random")
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp();
      message.channel.send(embed);
    } else if (!member) {
      let embed = new MessageEmbed()
        .setDescription(`<@${message.author.id}>`)
        .addField(
          "Joined at: ",
          `\`${moment(message.author.joinedAt).format(
            "dddd, MMMM, Do, YYYY"
          )}\``,
          true
        )
        .addField(
          "Created at: ",
          `\`${moment(message.author.createdAt).format(
            "dddd, MMMM, Do, YYYY"
          )}\``,
          true
        )
        .addField(
          "Nickname: ",
          `\`${message.author.nickname || "No Nickname"}\``,
          true
        )
        .addField("Boost Status: ", `\`${checkUserPremium()}\``)
        .setFooter(`ID: ${message.author.id}`)
        .setColor("random")
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp();
      message.channel.send(embed);
    }
  } catch (err) {
    message.channel.send(stripIndents`
         **Error!**

          \`${err}\`
       `);
  }
};

module.exports.help = {
  name: "userinfo",
  aliases: ["whois"]
};
