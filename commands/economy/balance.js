require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');
const { stripIndents, oneLine } = require('common-tags');
const fs = require('fs');
const db = require('quick.db');

module.exports = {
    name: "balance",
    aliases: ["bal"],
    description: "Check your user balance",
    category: "economy",
    guildOnly: true,
    cooldown: 2,
    args: null,
    usage: `${prefix}balance`,

    // Execute the command!

    async execute(client, message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let balance = db.fetch(`money_${message.guild.id}_${user.id}`);
        let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);
        if (balance <= null) balance = 0;
        if (bank <= null) bank = 0;

        if (!args[0]) {
            let embed = new MessageEmbed()
                .setTitle(`User Balance - ${user.user.tag}`)
                .setDescription(stripIndents`
                        ${client.emotes.money} Wallet: ${balance} rCoins
                        ${client.emotes.bank} Bank: ${bank} rCoins
                    `)
                .setColor(client.success)
                .setThumbnail(client.functions.fearIcon('coin'))
                .setTimestamp();
            message.channel.send(embed);
        } else {
            let embed = new MessageEmbed()
                .setTitle(`User Balance - ${user.user.tag}`)
                .setDescription(stripIndents`
                    ${client.emotes.money} Wallet: ${balance} rCoins
                    ${client.emotes.bank} Bank: ${bank} rCoins
                    `)
                .setColor(client.success)
                .setThumbnail(client.functions.fearIcon('coin'))
                .setTimestamp();
            message.channel.send(embed);
        }
    }
}
