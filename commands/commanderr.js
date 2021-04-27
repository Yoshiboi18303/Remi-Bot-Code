const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
  let CommanderRisLifeEmbed = new Discord.MessageEmbed()
    .setColor("#DEC7AE")
    .setTitle(`Commander R Is A Big Help`)
    .setDescription(
      `<@271285474516140033> (Commander R) was a big help along the way with <@697414293712273408> (Yoshiboi18303)s' Bot Development, he was a great guy in the Server [Fates List](https://discord.gg/xyumFYWCkk), and then became <@697414293712273408> (Yoshiboi18303)s' friend soon after, we respect you Commander.\n\nHey you should check out his bots (and maybe add them) [here](https://sites.google.com/view/commander-r-bots-website/homepage)!`
    )
    .setFooter(
      `Requested by ${message.author.username} | We love you Commander!`
    )
    .setTimestamp();
  message.channel.send(CommanderRisLifeEmbed);
};

module.exports.help = {
  name: "commander",
  aliases: ["commanderR"]
};
