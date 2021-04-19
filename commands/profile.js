const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('Robux;'))return;  

  let user = message.mentions.members.first() || message.author;

  let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
  if (money === null) money = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let bronze_pre = await db.fetch(`bronze_${message.guild.id}_${user.id}`)
    if(bronze_pre === null) bronze_pre = 'No'
    if(bronze_pre === true) bronze_pre = 'Purchased/Owned'

  let silver_pre = await db.fetch(`silver_${message.guild.id}_${user.id}`)
    if(silver_pre === null) silver_pre = 'No'
    if(silver_pre === true) silver_pre = 'Purchased/Owned'

  let gold_pre = await db.fetch(`gold_${message.guild.id}_${user.id}`)
    if(gold_pre === null) gold_pre = 'No'
    if(gold_pre === true) gold_pre = 'Purchased/Owned'

  let platinum_pre = await db.fetch(`platinum_${message.guild.id}_${user.id}`)
    if(platinum_pre === null) platinum_pre = 'No'
    if(platinum_pre === true) platinum_pre = 'Purchased/Owned'

  


  let profileEmbed = new Discord.MessageEmbed()
  .setColor("#00FF02")
  .setFooter(`This profile was requested by ${message.author.username} | This bot was made by Yoshiboi_Development`)
  .setDescription(`<:RobuxBot_Profile:833755335364837416> **${user}'s Profile**\n\n<:RobuxBot_Money:833735066516717588> **Money**\n\n <:RobuxBot_Account:833743077779832873> Account: ${money}\n<:RobuxBot_Bank:833743600663265302> Bank: ${bank}\n\n**Premium Statuses**\n\nBronze Premium: ${bronze_pre}\nSilver Premium: ${silver_pre}\nGold Premium: ${gold_pre}\nPlatinum Premium: ${platinum_pre}`);
  message.channel.send(profileEmbed)
};

module.exports.help = {
  name:"profile",
  aliases: ["pro","inventory","status"]
}

// Lots of code lmao.
