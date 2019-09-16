import sgMail from '@sendgrid/mail'
// sgMail.setApiKey('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')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
module.exports = {
    sendConfrimMail: async (obj) => {
        // sgMail.setApiKey('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')
        const mail = {
            to: obj.to ? obj.to : 'Prazan',
            from: obj.from ? obj.from : 'Prazan',
            subject: obj.subject ? obj.subject : 'Prazan',
            html: obj.html ? obj.html : `<h1> Prazan </h1>`
        }
        console.log(mail)
        await sgMail.send(mail)
    }
}