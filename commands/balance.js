const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args, utils) => {
  if(!message.content.startsWith('Robux;'))return;  

  message.delete()

  let user = message.mentions.members.first() || message.author;

  let balance = db.fetch(`money_${message.guild.id}_${user.id}`)

  if (balance === null) balance = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#18C217")
  .setFooter(`Requested by ${message.author.username} | Yoshiboi_Development`)
  .setDescription(`<:RobuxBot_Money:833735066516717588> **${user}'s Balance**\n\n<:RobuxBot_Account:833743077779832873> Account: ${balance}\n<:RobuxBot_Bank:833743600663265302> Bank: ${bank}`);
  message.channel.send(moneyEmbed)
};

module.exports.help = {
  name:"balance",
  aliases: ["bal","money","current_money","money_stats","your_money"]
}
