const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports.run = async (essage, args) => {
  const user = message.author;

  if (args[0] == null) {
    let blackmarketEmbed = new MessageEmbed()
      .setColor("#004001")
      .setTitle(`The Black Market`)
      .setDescription(`Hello ${user}, what can I do for you today?`)
      .addField(`Main Store`, `Weed: 40000 Robux [Robux;bm buy weed]`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    message.channel.send(blackmarketEmbed);
  } else if (args[0] == "buy") {
    if (args[1] == "weed") {
      let buyFailureEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setDescription(
          stripIndents`<:RobuxBot_Cross:833733415789527120> Idiot. If you want Weed you're gonna need 40000 Robux.`
        )
        .setFooter(
          `Failed Purchase by the Idiotic ${message.author.username} lmao`
        )
        .setTimestamp();

      let employeenames = ["Reggie", "Melinda", "Dark Builderman"];
      let employeename = Math.floor(Math.random() * employeenames.length);

      let user = message.author;
      let author = db.fetch(`money_${message.guild.name}_${user.id}`);

      if (author < 40000) return message.channel.send(buyFailureEmbed);

      db.fetch(`weed_${message.guild.id}_${user.id}`);
      db.add(`weed_${message.guild.id}_${user.id}`, 1);

      let buySuccessEmbed = new MessageEmbed()
        .setColor("#00FF02")
        .setDescription(
          stripIndents`<:RobuxBot_Check:833733385582149712> You paid the Black Market employee ${employeenames[employeename]} 40000 Robux and recieved Weed after your Payment!`
        )
        .setFooter(`Successful Purchase by ${message.author.username}`)
        .setTimestamp();

      db.subtract(`money_${message.guild.id}_${user.id}`, 40000);
      message.channel.send(buySuccessEmbed);
    } else {
      let blackmarketEmbed = new MessageEmbed()
      .setColor("#004001")
      .setTitle(`The Black Market`)
      .setDescription(`Hello ${user}, what can I do for you today?`)
      .addField(`Main Store`, `Weed: 40000 Robux [Robux;bm buy weed]`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    message.channel.send(blackmarketEmbed);
    }
  }
};

module.exports.help = {
  name: "blackmarket",
  aliases: ["bm", "blackm","marketblack"]
};
