module.exports = async function botActivity(client) {
    const guild = client.guilds.cache.get('926539282733203546')
    const { user: puniBot,
            tag: botTag ,
            prefix: botPrefix } = client

    const stats = ['online', 'dnd', 'idle']

    setInterval(() => {
        const activities = [
            { name: 'ð¥ Cineminha!', type: 'STREAMING', url: 'https://www.netflix.com/watch/81073022?trackId=14170033&tctx=1%2C0%2Cbb356764-ae2a-42ea-afac-69e403b2ac9e-42496442%2C09551ab6-8494-4e9b-bdca-5f41cf065a47_24951814X9XX1641901381014%2C09551ab6-8494-4e9b-bdca-5f41cf065a47_ROOT%2C%2C%2C' },
            { name: 'ð® Como fazer um pudim?', type: 'PLAYING' },
            { name: `${guild.memberCount} membros ð¥³`, type: 'PLAYING' },
            { name: `${botTag} âï¸`, type: 'PLAYING' },
            { name: `${botPrefix} help`, type: 'PLAYING' },
            { name: 'Sem minha crush ð', type: 'PLAYING' },
            { name: 'ð Anda perdido ? me mencione!', type: 'PLAYING' },
            { name: 'ð Entre em contato para reportar qualquer bug.', type: 'PLAYING' },
            { name: 'ð® Pudim na lua?', type: 'PLAYING' },
            { name: 'ð® Desfrute de um belo pudim', type: 'PLAYING' },
            { name: 'ð® Pudim Pudim Pudim', type: 'PLAYING' },
            { name: 'ð©âð Mais Comandos legais para VocÃª!', type: 'PLAYING' }
        ]
        const randomActivity = activities[Math.floor(Math.random() * activities.length)]
        const randomStatus = stats[Math.floor(Math.random() * stats.length)]

        puniBot.setPresence({ activities: [randomActivity], status: randomStatus })
    }, 20000)
}
