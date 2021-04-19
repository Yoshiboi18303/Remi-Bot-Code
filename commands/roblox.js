const Discord = require('discord.js')
const db = require('quick.db')
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('Robux;'))return;  

    let user = message.author;
    let author = await db.fetch(`roblox_${message.guild.id}_${user.id}`)

    let timeout = 126969;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setFooter(`${message.author.username} just tried Doing something in their sleep | This bot was made by Yoshiboi_Development`)
        .setDescription(`<:RobuxBot_Cross:833733415789527120> Hey dude, you have already did Roblox once, you should sleep (don't work as late as my developer/owner lmao).\n\nTry working again in ${time.minutes}m ${time.seconds}s. I would recommend using some of the other commands on this bot in your downtime.`);
        message.channel.send(timeEmbed)

      } else {

        let roblox = ['Playing Roblox (Simulator)','Playing Roblox (Tycoon)','Playing Roblox (Obby)','Creating In Roblox Studio (Simulator) )','Creating In Roblox Studio (Tycoon)','Creating in Roblox Studio (Obby)',]

        let didroblox = Math.floor((Math.random() * roblox.length));
        let amount = Math.floor(Math.random() * 666) + 5;
        let robloxMoneyEmbed = new Discord.MessageEmbed()
        .setColor("#00FF02")
        .setFooter(`Nice! ${message.author.username} just got ${amount} Robux from ${roblox[didroblox]}! | This bot was made by Yoshiboi_Development`)
        .setDescription(`<:RobuxBot_Check:833733385582149712> MONEY, MONEY AND MORE MONEY!! You worked as a(n) ${roblox[didroblox]} and earned ${amount} Robux <:RobuxBot_Money:833735066516717588>, keep doing this and you'll be rich in no time (you're on a 126969 Millisecond timeout at the time this is sent, so be patient), Enjoy your Robux!`);
        message.channel.send(robloxMoneyEmbed)
        
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`roblox_${message.guild.id}_${user.id}`, Date.now())
    };
}



module.exports.help = {
  name:"roblox",
  aliases: ["game","work","create","money","get_money","imagination",]
}
