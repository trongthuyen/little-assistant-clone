import nodemailer from 'nodemailer'

const {
    MAIL_HOST,
    MAIL_PORT,
    ADMIN_EMAIL,
    ADMIN_PASS
} = process.env

export const sendMail = (to, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        secure: false,
        auth: {
            user: ADMIN_EMAIL,
            pass: ADMIN_PASS
        }
    })

    const options = {
        from: ADMIN_EMAIL,
        to: to,
        subject: subject,
        html: htmlContent
    }

    return transporter.sendMail(options)
}
