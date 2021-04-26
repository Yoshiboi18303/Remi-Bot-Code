const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let user = message.author;

  let shop_embed = new Discord.MessageEmbed()
     .setThumbnail(`<:RobuxBot_Store:833765556258258429>`)
    .setDescription(
      `<:RobuxBot_Store:833765556259258429> ${user}, here's the Catalog!\n\n**<:RobuxBot_Premium:833764330230644786> Premium Ranks**\n\nBronze Premium: 5000 Robux [Robux;buy bronze]\nSilver Premium: 10000 Robux [Robux;buy silver]\nGold Premium: 15000 Robux [Robux;buy gold]\nPlatinum Premium: 20000 Robux [Robux;buy platinum]\n\n**<:RobuxBot_Bag:835210051806822400> Gear**\n\nRainbow Omega Sword: 16997 Robux [Robux;buy ros]\nAir in a Can (Suggested by (<@271285474516140033>) Commander R): 1000 Robux [Robux;buy air]`
    )
    .setColor("RANDOM")
    .setFooter(
      `Shop Requested by ${message.author.username} | This Bot was made by Yoshiboi_Development`
    );
  message.channel.send(shop_embed);
};

module.exports.help = {
  name: "catalog",
  aliases: ["store", "shop", "avatars", "avatar_shop"]
};
