const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('Robux;'))return;  

  let user = message.author;

  let member = db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

  if (args[0] == 'all') {
    let money = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    
    db.subtract(`bank_${message.guild.id}_${user.id}`, money)
    db.add(`money_${message.guild.id}_${user.id}`, money)
    let withdrawallEmbed = new Discord.MessageEmbed()
  .setColor("#00FF02")
  .setDescription(`<:RobuxBot_Check:833733385582149712> The bank is now empty as you have withdrawn all of your Robux from your bank account. You can deposit them back by using Robux;deposit all!`);
  message.channel.send(withdrawallEmbed)
  
  } else {

  let embed2 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`<:RobuxBot_Cross:833733415789527120> Hey dude, the bank doesn't speak in tongues. You need to specify an amount to withdraw for this command to work.`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`<:RobuxBot_Cross:833733415789527120> Lmao, you dumb idiot. You can't withdraw negative Robux. Did you really think that was a thing?`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setFooter(`That's it. Go home ${message.author.username}.`)
  .setDescription(`<:RobuxBot_Cross:833733415789527120> Your transation failed due to the following reason: You don't have that much Robux in your bank account.`);

  if (member2 < args[0]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#00FF02")
  .setDescription(`<:RobuxBot_Check:833733385582149712> Money x69420, you have successfully withdrawn ${args[0]} Robux from your bank account.`);

  message.channel.send(embed5)
  db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
  db.add(`money_${message.guild.id}_${user.id}`, args[0])
  }
}


module.exports.help = {
  name:"withdraw",
  aliases: ["wd"]
}
