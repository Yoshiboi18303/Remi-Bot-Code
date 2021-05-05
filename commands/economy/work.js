require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');
const { stripIndents, oneLine } = require('common-tags');
const fs = require('fs');
const db = require('quick.db');

module.exports = {
    name: "work",
    aliases: ["job", "getmoney"],
    description: "Head to work and earn some money!",
    category: "economy",
    guildOnly: true,
    cooldown: 300,
    args: null,
    usage: `${prefix}work`,

    // Execute the command!

    async execute(client, message, args) {
        let user = message.member;
        let balance = db.fetch(`money_${message.guild.id}_${user.id}`);

        let x = client.functions.genWork();

        let response = require('../../storage/strings/workLines.json');
        let result = response[Math.floor(Math.random() * response.length)];

        db.add(`money_${message.guild.id}_${user.id}`, x);

        let embed = new MessageEmbed()
            .setTitle(`User Work - ${user.user.tag}`)
            .setDescription(stripIndents`
                   ${client.emotes.money} You worked as a() **${result}**,
                   and have earned a total of \`${x}\` rCoins!
                   Your new balance is ${balance}!
                `)
            .setColor(client.success)
            .setThumbnail(client.functions.fearIcon('coin'))
            .setTimestamp();
        message.channel.send(embed);
    }
}
