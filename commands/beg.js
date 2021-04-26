const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message) => {

 const user = message.author;

     let begging = ['Roblox','Builderman','A Random Player']

    let beggingEmbed = new MessageEmbed()
     .setColor("#1CC724")
     .setTitle(`${user} has begged`)
     .setDescription(stripIndents)

}

module.exports.help = {
  name: "beg",
  aliases: []
};
