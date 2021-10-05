const axios = require('axios')

async function shortenerUrl(ctx) {
    let url = ctx.message.text.split(' ')[1]
    if (!url) {
        ctx.reply(
            `Silahkan ketikan atau salin url yang mau kamu pendekan yah \ncontoh: /short https://www.frontendmentor.io/solutions/responsive-time-tracking-dashboard-5kYHx1ogy`
        )
    }

    await axios
        .get(`http://tinyurl.com/api-create.php?url=${url}`)
        .then(function (res) {
            console.log(res.data)
            const { data } = res
            ctx.reply(
                `Yeayyyyy berhasil memendekan url \n\nHasil shortlink kamu  : ${data} \n\nTerimakasihh yah 😄`
            )
        })
        .catch(function (err) {
            console.error(err)
        })
}

module.exports = shortenerUrl
