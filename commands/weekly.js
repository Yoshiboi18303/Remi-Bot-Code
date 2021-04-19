const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('Robux;'))return;  

  let user = message.author;
  let timeout = 604800000;
  let amount = 2000;

  let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setFooter(`${message.author.username} just thought he/she could Rewind time to get the Weekly Chest`)
    .setDescription(`<:RobuxBot_Cross:833733415789527120> You can't collect the Weekly Chest right now.\n\nYou can collect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s though!`);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#00FF02")
  .setFooter(`${message.author.username} has claimed their Weekly Chest!`)
  .setDescription(`<:RobuxBot_Check:833733385582149712> You've collected the Weekly Chest which had ${amount} Robux in it! You now need to wait a week for the next one. Have fun with your money!`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"weekly",
  aliases: ["week","weekly_money"]
}
