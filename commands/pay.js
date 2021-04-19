const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('Robux;'))return;  

  message.delete();

  let user = message.mentions.members.first() 

  let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

  let embed1 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setFooter(`${message.author.username} just tried paying the wall Robux`)
  .setDescription(`<:RobuxBot_Cross:833733415789527120> Mention someone to pay`);

  if (!user) {
      return message.channel.send(embed1)
  }
  let embed2 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setFooter(`${message.author.username} just tried to give ${user.user.username} a Blank Slate`)
  .setDescription(`<:RobuxBot_Cross:833733415789527120> Specify an amount to pay`);
  
  if (!args[1]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setFooter(`${message.author.username} just tried to give ${user.user.username} negative Robux lmao`)
  .setDescription(`<:RobuxBot_Cross:833733415789527120> Lmao, you dumb idiot. You can't pay someone negative Robux. Did you really think that was a thing?`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setFooter(`${message.author.username} didn't have enough money to pay ${user.user.username} lmao`)
  .setDescription(`<:RobuxBot_Cross:833733415789527120> You don't have that much Robux`);

  if (member < args[1]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#00FF02")
  .setFooter(`${message.author.username} has just given ${user.user.username} ${args[1]} Robux. :)`)
  .setDescription(`<:RobuxBot_Check:833733385582149712> You have paid ${user.user.username} ${args[1]} Robux <:RobuxBot_Money:833735066516717588>, I'm sure they will Appreciate it (tell them to say thanks once they see this). :)`);

  message.channel.send(embed5)
  db.add(`money_${message.guild.id}_${user.id}`, args[1])
  db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])

}

module.exports.help = {
  name:"pay",
  aliases: ["donation","gm","give_money","donate",]
}
