const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('Robux;'))return;  

  let user = message.author;

  let timeout = 3600000;
  let amount = 500;

  let hourly = await db.fetch(`hourly_${message.guild.id}_${user.id}`);

  if (hourly !== null && timeout - (Date.now() - hourly) > 0) {
    let time = ms(timeout - (Date.now() - hourly));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setFooter(`${message.author.username} just though they could Rewind time to get the Hourly Chest. | Made by Yoshiboi_Development`)
    .setDescription(`<:RobuxBot_Cross:833733415789527120> You can't collect this chest yet!\n\nYou can collect it again in ${time.minutes}m ${time.seconds}s though!`);
    message.channel.send(timeEmbed)

  } else {

    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#00FF02")
  .setFooter(`${message.author.username} has just claimed their Hourly Chest! | Made by Yoshiboi_Development`)
  .setDescription(`<:RobuxBot_Check:833733385582149712> You've collected the hourly chest and it had ${amount} Robux inside, you now need to wait an hour for the next one. Have fun with your money!`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`hourly_${message.guild.id}_${user.id}`, Date.now())

  };

}


module.exports.help = {
  name:"hourly",
  aliases: ["hour","hourly_money"]
}
