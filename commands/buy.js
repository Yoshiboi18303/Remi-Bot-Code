const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('Robux;'))return;

   let user = message.author;

   let author = db.fetch(`money_${message.guild.name}_${user.id}`)



   let Embed = new Discord.MessageEmbed()
   .setColor("#FF0000")
   .setFooter(`Failed Purchase by the Idiotic ${message.user.username} lmao.`)
   .setDescription(`<:RobuxBot_Cross:833733415789527120> Idiot. You need 5000 Robux to purchase Bronze Premium`)

   if (args[0] == 'bronze') {
    if (author < 5000) return message.channel.send(Embed)

    db.fetch(`bronze_${message.guild.id}_${user.id}`)
    db.set(`bronze_${message.guild.id}_${user.id}`, true)


    let Embed2 = new Discord.MessageEmbed()
    .setColor("#00FF02")
    .setFooter(`Successful Purchase made by ${message.user.username}`)
    .setDescription(`<:RobuxBot_Check:833733385582149712> Nice job! You've purchased Bronze Premium for 5000 Robux!`)

    db.subtract(`money_${message.guild.id}_${user.id}`, 5000)
    message.channel.send(Embed2)

 } else if(args[0] == 'silver') {

   let Embed = new Discord.MessageEmbed()
   .setColor("#FF0000")
   .setFooter(`Failed Purchase by the Idiotic ${message.user.username} lmao.`)
   .setDescription(`<:RobuxBot_Cross:833733415789527120> Idiot. You need 10000 Robux to purchase Silver Premium`)

   if (author < 10000) return message.channel.send(Embed)

   db.fetch(`silver_${message.guild.id}_${user.id}`)
   db.set(`silver_${message.guild.id}_${user.id}`, true)


   let Embed2 = new Discord.MessageEmbed()
   .setColor("#00FF02")
   .setFooter(`Successful Purchase made by ${message.user.username}`)
   .setDescription(`<:RobuxBot_Check:833733385582149712> Nice job! You've purchased Silver Premium for 10000 Robux!`)

   db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
   message.channel.send(Embed2)


  } else if(args[0] == 'gold') {

     let Embed = new Discord.MessageEmbed()
     .setColor("#FF0000")
     .setFooter(`Failed Purchase by the Idiotic ${message.user.username} lmao.`)
     .setDescription(`<:RobuxBot_Cross:833733415789527120> Idiot. You need 15000 Robux to purchase Gold Premium`)

     if (author < 15000) return message.channel.send(Embed)

     db.fetch(`gold_${message.guild.id}_${user.id}`)
     db.set(`gold_${message.guild.id}_${user.id}`, true)


     let Embed2 = new Discord.MessageEmbed()
     .setColor("#00FF02")
     .setFooter(`Successful Purchase made by ${message.user.username}`)
     .setDescription(`<:RobuxBot_Check:833733385582149712> Nice job! You've purchased Gold Premium for 15000 Robux!`)

     db.subtract(`money_${message.guild.id}_${user.id}`, 15000)
     message.channel.send(Embed2)


  } else if(args[0] == 'platinum') {

     let Embed = new Discord.MessageEmbed()
     .setColor("#FF0000")
     .setFooter(`Failed Purchased by the Idiotic ${message.user.username} lmao.`)
     .setDescription(`<:RobuxBot_Cross:833733415789527120> Idiot. You need 20000 Robux to purchase Platinum Premium`)

     if (author < 20000) return message.channel.send(Embed)

     db.fetch(`platinum_${message.guild.id}_${user.id}`)
     db.set(`platinum_${message.guild.id}_${user.id}`, true)


     let Embed2 = new Discord.MessageEmbed()
     .setColor("#00FF02")
     .setFooter(`Successful Purchase made by ${message.user.username}`)
     .setDescription(`<:RobuxBot_Check:833733385582149712> Nice job! You've purchased Platinum Premium for 20000 Robux!`)

     db.subtract(`money_${message.guild.id}_${user.id}`, 20000)
     message.channel.send(Embed2)


     


    } else {
       let noItemSpecifiedErrorEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription('<:RobuxBot_Cross:833733415789527120> Hey man, you need to enter an item to buy for this command to function correctly! Run Robux;store for all the valid Responses!')
        message.channel.send(noItemSpecifiedErrorEmbed)




  }


}


  module.exports.help = {
    name: "buy",
    aliases: ["get","purchase","own"]

}
