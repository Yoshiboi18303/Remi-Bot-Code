const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('Robux;'))return;  


    message.delete()


    let help_embed = new Discord.MessageEmbed()
    .setTitle("RobuxBot Help/Commands. Default Prefix --> [Prefix Robux;]")
    .addField(`<:RobuxBot_Money:833735066516717588> Normal Commands`, "`roblox`, `pay [user] [amount]`, `balance <user>`, `leaderboard [item] (this command is down...)`,  `rich (coming soon!)`, `profile <user>`, `withdraw [amount]`, `deposit [amount]`, `hourly`, `daily`, `weekly`, `yearly`, `catalog`, `buy [item]`, `sell [item]`, `vote`")
    .addField(`<:RobuxBot_Extra:833748083316621384> Economy Extra Commands`, "`storeinfo [item]`")
    .addField(`<:RobuxBot_IMPORTANT:833746404124000256> Important Links`, `[Invite Me](https://discord.com/oauth2/authorize?client_id=819225480635875359&scope=bot&permissions=347136), [Support Server](http://bit.ly/robuxbot-support-server), [Status Updates (Subscribe to them!)](https://yoshiboi-development-status.statuspage.io/), [Twitter ((most (if not all) of the) RobuxBot updates here!)](https://twitter.com/Yoshiboi_Dev)`)
    .addField(`<:RobuxBot_LINK:833746491721515028> Other Links`,  `[(Bot) Plans](https://trello.com/b/HpkPbch9/bot-plans), [Get Econoshi_Bot](https://bit.ly/get-econoshi_bot), [Get Mushiboi_Bot](https://bit.ly/get-Mushiboi_Bot)`)
    .setDescription("**Field Note __(for the Help command)__:** `<> is optional and [] is required`")
    .setColor("#85BB65")
    .setFooter(`Requested by ${message.author.username} | Yoshiboi_Development`)
    .setTimestamp();
    message.channel.send(help_embed)

}

module.exports.help = {
  name:"help",
  aliases: ["h"]

}
