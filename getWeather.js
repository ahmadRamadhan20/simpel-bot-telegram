const https = require('https')

async function getWeather(ctx) {
    let place = ctx.message.text.split(' ')
    const [, kota1, kota2] = place
    let kota = kota1

    if (kota2 !== undefined) {
        kota = kota1 + ' ' + kota2
    }
    console.log(kota)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${process.env.WEATHER_TOKEN}&units=metric`
    https.get(url, function (res) {
        //error handling
        if (res.statusCode != 200) {
            ctx.reply(
                'Wah kamu belum masukan kota nih atau data yang kamu cari ga ketemu nih, coba cari dengan kota lain, \ncontoh: /cuaca jakarta'
            )
        } else {
            res.on('data', function (data) {
                data = JSON.parse(data)
                let temp = data.main.temp
                let flike = data.main.feels_like
                let min_temp = data.main.temp_min
                let max_temp = data.main.temp_max
                let humidity = data.main.humidity
                ctx.telegram.sendMessage(
                    ctx.chat.id,
                    `Cuaca di ${kota.toUpperCase()} \n\n<b>suhu</b> : ${temp}° \n<b>terasa seperti</b> : ${flike}° \n<b>suhu minimum</b> : ${min_temp}° \n<b>suhu maksimal</b> : ${max_temp}° \n<b>kelembaban</b> : ${humidity}° \n\nSemoga harimu menyenangkan ${
                        ctx.message.from.first_name
                    } 😊`,
                    { parse_mode: 'HTML' }
                )
            })
        }
    })
}

module.exports = getWeather
