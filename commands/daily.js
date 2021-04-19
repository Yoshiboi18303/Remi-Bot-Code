const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('Robux;'))return;  

  let user = message.author;

  let timeout = 86400000;
  let amount = 1000;

  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setFooter(`${message.author.username} just though they could Rewind time to get the Daily Chest`)
    .setDescription(`<:RobuxBot_Cross:833733415789527120> You can't collect this chest yet!\n\nYou can collect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s though!`);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#00FF02")
  .setFooter(`${message.author.username} has just claimed their Daily Chest!`)
  .setDescription(`<:RobuxBot_Check:833733385582149712> You've collected the daily chest and it had ${amount} Robux <:RobuxBot_Money:833735066516717588> inside, you now need to wait a day for the next one. Have fun with your money!`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`daily_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"daily",
  aliases: ["day","daily_money"]
}
