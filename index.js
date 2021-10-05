const { Telegraf } = require('telegraf')
const getWeather = require('./getWeather')
const short = require('./short')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    ctx.telegram.sendMessage(
        ctx.chat.id,
        `Halo selamat datang di bot sederhana untuk menampilkan cuaca berdasarkan kota dan shortener url \n\n/cuaca = /cuaca tangerang selatan \n/short = /short linkygmaudishort`
    )
})

bot.command('cuaca', (ctx) => {
    getWeather(ctx)
})

bot.command('short', (ctx) => {
    short(ctx)
})

bot.launch()
