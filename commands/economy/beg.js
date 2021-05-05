require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');
const { stripIndents, oneLine } = require('common-tags');
const fs = require('fs');
const db = require('quick.db');

module.exports = {
    name: "beg",
    aliases: ["begger"],
    description: "Beg someone for money!",
    category: "economy",
    guildOnly: true,
    cooldown: 150,
    args: null,
    usage: `${prefix}beg`,

    // Execute the Command, here we go!
    async execute(client, message, args) {
        let user = message.author;
        let balance = db.fetch(`money_${message.guild.id}_${user.id}`);

        let x = client.functions.genBeg();

        let response = require('../../storage/strings/beggedPeople.json');
        let result = response[Math.floor(Math.random() * response.length)];

        db.add(`money_${message.guild.id}_${user.id}`, x);

        let embed = new MessageEmbed()
            .setTitle(`User Begged - ${user.tag}`)
            .setDescription(stripIndents`
            ${client.emotes.money} You've begged **${result}**,
            and have earned a total of \`${x}\` rCoins!
            Your new balance is ${balance} rCoins!
            `)
            .setColor(client.success)
            .setThumbnail(client.functions.fearIcon('coin'))
            .setTimestamp();
        message.channel.send(embed);
    }
}
