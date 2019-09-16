const obj = {
    to: '1',
    from: 'sshshshsh',
    html: '213213'
}


const tets = function(obj){

    // const to = obj.to ? obj.to : 'Prazan'
    // const fr = obj.from ? obj.from : 'Prazan'
    // const sub = obj.subject ? obj.subject : 'Prazan'
    // const html = obj.html ? obj.html : 'Prazan'

    const mail = {
        to: obj.to ? obj.to : 'Prazan',
        from: obj.from ? obj.from : 'Prazan',
        subject: obj.subject ? obj.subject : 'Prazan',
        html: obj.html ? obj.html : 'Prazan'
    }

    console.log(mail)
}

tets(obj)



/*

let to = obj.to ? obj.to : 'Prazan'
        let fr = obj.from ? obj.from : 'Prazan'
        let sub = obj.subject ? obj.subject : 'Prazan'
        // const text = obj.text ? obj.text : 'Prazan'
        let html = obj.html ? obj.html : `<h1> Prazan </h1>`


        const mail = {
            to: 'stefan.zivic.1997@gmail.com',
            from: 'test@example.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<h1>sakjdlsjalkdjsakljdlksajdlj</h1>',
          };

        let mail = {
            to: to,
            from: fr,
            subject: sub,
            html: html
        }
        
        */