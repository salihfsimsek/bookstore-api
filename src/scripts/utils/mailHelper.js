const nodeMailer = require('nodemailer');

const mailHelper = async (files) => {
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    // send mail with defined transport object
    try {
        await transporter.sendMail({
            from: `${process.env.EMAIL}`, // sender address
            to: "salihfiratsimsek@gmail.com, salihsimseeek@gmail.com", // list of receivers
            subject: "Report",
            attachments: files
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = { mailHelper }