const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  if(!args[0]){
    const embed = new MessageEmbed()
    .setTitle('Commande purge')
    .setColor(client.config.color.EMBEDCOLOR)
    .setDescription(`La commande __purge__ permet de gérer les messages du serveur grâce aux sous commandes suivantes :\n\n${client.config.emojis.fleche}__purge channel__ permet de purger un channel entier.\n${client.config.emojis.fleche}__purge <number>__ permet de supprimer un certain nombre de messages.\n${client.config.emojis.fleche}__purge @user <number>__ permet de supprimer un certain nombre de messages d'une personne.`)
    .setTimestamp()
    .setFooter('BOT ID : 689210215488684044')
    return message.channel.send(embed)
}
  if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de supprimer des messages.`);
  if(args[0].toLowerCase() === 'channel'){
    message.channel.clone().then(message.channel.delete())    
  
  }else if(!isNaN(args[0])){
    if(isNaN(args[0]) || (args[0] < 1 || args[0] > 100 )) return message.channel.send(`${client.config.emojis.error} Merci de spécifier un nombre valide.`)
    const messages = await  message.channel.messages.fetch({
        limit : Math.min(args[0],100),
        before : message.id
    });
    message.delete();
    message.channel.bulkDelete(messages);
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setColor(`${client.config.color.ROUGE}`)
      .setDescription(`**Action**: purge\n**Nbr messages**: ${args[0]}\n**Salon**: ${message.channel}`)
    message.channel.send(embed).then(m => {
      setTimeout(function() {
        m.delete()
      }, 3000)
    })

  }else if(message.mentions.users.first()){
    let user = message.guild.member(message.mentions.users.first());
    if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.channel.send(`${client.config.emojis.error}il faut spécifier un nombre entre 1 et 100.`);
    const messages = (await message.channel.messages.fetch({
      limit: 100,
      before: message.id,
    })).filter(a => a.author.id === user.id).array();
    messages.length = Math.min(args[1], messages.length);
    if (messages.length === 0 || !user) return message.channel.send(`${client.config.emojis.error} aucun message à supprimer sur cet utilisateur (ou cet utilisateur n\'existe pas).`);
    if (messages.length === 1) await messages[1].delete();
    else await message.channel.bulkDelete(messages);
    message.delete();
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setColor(`${client.config.color.ROUGE}`)
      .setDescription(`**Action**: prune\n**Nbr de messages**: ${args[1]}\n**Utilisateur**: ${user}`)
       message.channel.send(embed);
  }
};
 
module.exports.help = {
  name: "purge",
  aliases: ['purge'],
  category : 'moderation',
  description: "Supprime des messages.",
  cooldown: 10,
  usage: '<nb_messages>',
  exemple :["purge 50"],
  isUserAdmin: false,
  permissions: true,
  args: false,
  sousCommdandes : []
};