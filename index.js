require("dotenv").config()
const express = require('express')

const app = express()
const porta = process.env.PORT || 3000

app.get('/', async (_req, res) => {
    res.send('<h1> Servidor de internet NodeJS funcionando.</h1>')
})
app.listen(porta, () => console.log('> Servidor NodeJS funcionando na porta ' + porta + '.'))

const { Intents } = require('discord.js')
const PuniBot = require('./PuniBot')
const client = new PuniBot({ intents: new Intents(32767) })

client.once('ready', async () => {
    console.log(process.memoryUsage().rss / 512 / 512)
    client.prefix = process.env.PREFIX
    client.guild = client.guilds.cache.get('926539282733203546')
    client.canais = client.channels.cache
    client.footer = { text: client.guild.name, iconURL: client.guild.iconURL() }
    client.initListeners('./listeners')
    client.initCommands('./commands')
    client.users.fetch('407734609967841299', false).then((owner) => {
        owner.createDM().then(dmChannel => {
            dmChannel.messages.fetch({ limit: 100 })
            .then((messages) => {
                messages = messages.filter( m => { return m.author.id === client.user.id })
                messages.forEach(message => {
                    message.delete()
                })
            })
            owner.send('Estou online 🤨👍')
        })
    })
})

client.login(process.env.TOKEN)
.then(() => {
    console.log(`Logado como ${client.user.tag}.`)
})
.catch(err => {
    console.log(`Falha ao iniciar o bot : ${err}`)
})