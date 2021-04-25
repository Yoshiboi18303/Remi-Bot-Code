const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  let user = message.author;
  let author = db.fetch(`money_${message.guild.name}_${user.id}`);

  let buyFailureEmbed = new MessageEmbed()
    .setColor("#FF0000")
    .setDescription(
      `<:RobuxBot_Cross:833733415789527120> Idiot. If you want my Bow, you're gonna need 30000 Robux.`
    )
    .setFooter(`Failed Purchase by the Idiotic ${message.author.username} lmao`)
    .setTimestamp();

  if (args[0] == "bow") {
    if (author < 30000) return message.channel.send(buyFailureEmbed);

    db.fetch(`bow_${message.guild.id}_${user.id}`);
    db.set(`bow_${message.guild.id}_${user.id}`, true);

    let buySuccessEmbed = new MessageEmbed()
      .setColor("#00FF02")
      .setDescription(
        `<:RobuxBot_Check:833733385582149712> You paid the Weaponsmith 30000 Robux and recieved the Bow after your Payment!`
      )
      .setFooter(`Successful Purchase by ${message.author.username}`)
      .setTimestamp();

    db.subtract(`money_${message.guild.id}_${user.id}`, 30000);
    message.channel.send(buySuccessEmbed);
  }
};

module.exports.help = {
  name: "wsbuy",
  aliases: []
};
