export const activateEmail = payload => {
    const html = `<div><div style="width: 600px; height: 600px; margin: 0 auto; text-align: center; padding 20px; border: 1px solid #333; border-radius: 10px; box-shadow: 0 0 5px 10px #333;">
        <p style="font-size: 20px; color: #333; text-align: center;">${payload.text}</p>
        <div style="text-align: center; width: 300px; padding: 12px; margin: 16px auto; background: #242424; border-radius: 10px"><a href="${payload.url}" style="font-size: 20px; color: #fff; text-decoration: none">Kích hoạt tài khoản</a></div>
    </div></div>`
    return html
}