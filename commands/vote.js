const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('Robux;'))return;  

     let votesEmbed = new Discord.MessageEmbed()
      .setTitle(`Upvote RobuxBot (me)!`)
      .setColor("#5C5C5C")
      .setFooter(`Requested by ${message.author.username} | Made by Yoshiboi_Development`)
      .setDescription(`__**Coming Soon!**__`)
      message.channel.send(votesEmbed)

  }

module.exports.help = {
  name:"vote",
  aliases: ["vote_links", "votes", "upvote","bump"]
}

// End
