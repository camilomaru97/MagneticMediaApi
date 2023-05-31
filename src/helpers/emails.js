const nodemailer = require("nodemailer")

const emailRegistro = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.GMAIL_HOST,
        port: process.env.GMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
        
    });

    const { name, email, token } = data;

    //Enviar el email
    await transport.sendMail({
        from: 'magneticmedia.com',
        to: email,
        subject: 'Verifica tu cuenta en magneticmedia.com',
        text: 'Verifica tu cuenta en magneticmedia.com',
        html: `
            <p>Hola ${name}, verifica tu cuenta de magneticmedia.com</p>
            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
            <a href="${process.env.BACKEND_URL}:${process.env.PORT}/api/auth/confirm/${token}"> Confirmar Cuenta </a> </p>

            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
}


module.exports = { emailRegistro }