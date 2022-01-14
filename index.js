require("dotenv").config();
const express = require('express')

const app = express()
const porta = process.env.PORT

app.get('/', async (_req, res) => {
    res.send('<h1> Servidor de internet NodeJS funcionando.</h1>')
})
app.listen(porta, () => console.log('> Servidor NodeJS funcionando na porta ' + porta + '.'))

const { Intents } = require('discord.js')
const PuniBot = require('./PuniBot')
const intents = new Intents(32767);
const client = new PuniBot({ intents: intents });

client.once('ready', async () => {
    console.log(process.memoryUsage().rss / 512 / 512)
    client.prefix = process.env.PREFIX
    client.guild = client.guilds.cache.get('926539282733203546')
    client.canais = client.channels.cache
    client.footer = { text: client.guild.name, iconURL: client.guild.iconURL() }
    client.initListeners('./listeners')
    client.initCommands('./commands')
})

client.login(process.env.TOKEN)
.then(() => {
    console.log(`Logado como ${client.user.tag}.`)
})
.catch(err => {
    console.log(`Falha ao iniciar o bot :::: ${err}`)
})