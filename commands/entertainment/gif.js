const { MessageEmbed } = require('discord.js')
const gifSearch = require('../../utils/gifSearch')

module.exports ={
    name: 'gif',
    description: "Mande um GIF!",
    args: '(Tema)',
    execute: async (message, args, client) =>{
        const searchTerm = args[1] || 'pudim'
        const gif = gifSearch.getGif(searchTerm)

        const gifEmbed = new MessageEmbed()
            .setTitle('Aqui está seu gif!')
            .setImage(gif.image)
            .setURL(gif.url)
            .setFooter(client.footer)
            .setTimestamp()
        message.reply({embeds: [gifEmbed]})
    }
}
