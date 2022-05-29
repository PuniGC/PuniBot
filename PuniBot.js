const { Client, Collection } = require('discord.js')
const utils = require('./utils')
const Fs = require('fs')

module.exports = class PuniBot extends Client {
    constructor(options = {}) {
        super(options)

        this.prefix = process.env.PREFIX.toLowerCase()

        this.commands = new Collection()
        this.categories = []

        Object.assign(this, utils)
    }

    loginBot(token) {
        this.login(token)
            .then(() => this.logger.warn('[DEBUG] ::', `Logado como ${this.user.tag}.\n`, true))
            .catch(err => this.logger.error('[FAIL] ::', 'Falha ao iniciar o bot : ' + err, true))
    }

    restartBot() {
        this.destroy()
        this.loginBot(process.env.TOKEN)
    }

    getFooter(guild) {
        return guild ? { text: guild.name, iconURL: guild.iconURL({ dynamic: true, size: 1024 }) } : null
    }

    initCommands(path) {
        const files = Fs.readdirSync(path)
        const filesLength = files.length
        Fs.readdirSync(path).forEach((file, index) => {
            try {
                const filePath = path + '/' + file
                if (file.endsWith('.js')) {
                    try {
                        const command = require(filePath)
                        const commandName = file.replace(/.js/g, '').toLowerCase()

                        this.commands.set(commandName, command)
                        if (this.categories.indexOf(command.category) == -1 && command.category !== 'ownerOnly')
                            this.categories.push(command.category)

                        return this.logger.debug('[DEBUG] ::',
                            ` (${++index}/${filesLength}) Loaded ${file} command.`)
                    }
                    catch (err) {
                        console.log(err)
                        return this.logger.error('[FAIL] ::',
                            `(${++index}) Fail when loading ${file} command.`, false, err)
                    }
                }
                if (Fs.lstatSync(filePath).isDirectory()) {
                    console.log(`\n[${this.logger.getDate()}] Directory: ${file}`)
                    this.initCommands(filePath)
                }
            }
            catch (err) {
                console.error(err)
            }
        })
    }

    initListeners(path) {
        const files = Fs.readdirSync(path)
        const filesLength = files.length
        console.log(`\n[${this.logger.getDate()}] Directory: ${path.split('/').pop()}`)
        files.forEach((file, index) => {
            try {
                const filePath = path + '/' + file
                if (file.endsWith('.js')) {
                    try {
                        const Listener = require(filePath)
                        Listener(this)
                        return this.logger.debug('[DEBUG] ::',
                            ` (${++index}/${filesLength}) Loaded ${file} event.`)
                    }
                    catch (err) {
                        return this.logger.error('[FAIL] ::',
                            `(${++index}) Fail when loading ${file} event.`, false, err)
                    }
                }
                if (Fs.lstatSync(filePath).isDirectory())
                    this.initListeners(filePath)

            }
            catch (err) {
                console.error(err)
            }
        })
    }
}
