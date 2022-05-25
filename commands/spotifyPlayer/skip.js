const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'sskip',
    aliases: ['pular'],
    description: 'Pular música',
    execute: async (message, _args, client) => {
        const voiceChannel = message.member.voice.channel
        const queue = client.player.getQueue(message.guild)

        if (!queue || !queue.playing) return message.reply('Não há nenhuma musica sendo tocada!')
        if (voiceChannel != queue.metadata.channel) return message.reply('Você precisa entrar no mesmo canal de voz!')

        const currentTrack = queue.current
        queue.skip()

        const playEmbed = new MessageEmbed()
            .setColor(client.colors['default'])
            .setTitle(`✅ | Musica skipada: ${currentTrack}`)

        message.channel.send({ embeds: [playEmbed] })
    }
}