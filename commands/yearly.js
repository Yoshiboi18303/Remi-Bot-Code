const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('Robux;'))return;  

  let user = message.author;

  let timeout = 31556952000;
  let amount = 40000;

  let yearly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

  if (yearly !== null && timeout - (Date.now() - yearly) > 0) {
    let time = ms(timeout - (Date.now() - yearly));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setFooter(`${message.author.username} just thought he/she could Rewind time to get the Weekly Chest`)
    .setDescription(`<:Cross:827985131889360956> You can't collect the Yearly Chest right now.\n\nYou can collect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s though!`);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#00FF02")
  .setFooter(`${message.author.username} has claimed their Yearly Chest!`)
  .setDescription(`<:Check:827985162519445524> You've collected the Yearly Chest which had ${amount} coins in it! You now need to wait a year for the next one. Have fun with your money!`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"yearly",
  aliases: ["year","yearly_money"]
}
