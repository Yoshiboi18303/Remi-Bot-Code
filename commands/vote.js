const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('Robux;'))return;  

   let user = message.author;

     let votesEmbed = new Discord.MessageEmbed()
      .setTitle(`Upvote ${bot.user.username}!`)
      .setColor("#5C5C5C")
      .setFooter(`Requested by ${message.author.username} | Made by Yoshiboi_Development`)
      .setDescription(`Hey ${user}, I see you want to vote for me! Here are some links you can give me an Upvote!\n\nFates List: [Click Me!](https://fateslist.xyz/bot/819225480635875359/vote)\nInfinity Bot List: [Click Me!](https://infinitybotlist.com/bots/819225480635875359/vote)\n\n**More __Coming Soon__!**`)
      message.channel.send(votesEmbed)

  }

module.exports.help = {
  name:"vote",
  aliases: ["vote_links", "votes", "upvote","bump"]
}

// End
