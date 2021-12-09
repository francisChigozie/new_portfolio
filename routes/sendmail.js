const { name } = require('ejs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
       dotenv.config({path:'./config/config.env'})

   async function sendmail(email){
    try{
     const  transporter = nodemailer.createTransport({
     host: 'mail.chigoziefrancis-portfolio.dev',
     port: 587,
     secure: false,
     auth: {
         user: 'contactfrancis@chigoziefrancis-portfolio.dev',
         pass: process.env.SENDMAIL_PASS,
  },
  tls:{
      rejectUnauthorized: false
  }
});

        var mailOptions = {
        from: `"Francis Web & App" <contactfrancis@chigoziefrancis-portfolio.dev>`,
        to: email,
        subject: 'A Warm Welcome',
        text: 'Write you soon',
        html: "<h3>Thank You and I Will write you soon:</h3><br>" +
              "</a><br><a href='https://github.com/francisChigozie'> Visit My Git/Hub</a><br><br>" +
               "From the Management:<br>Francis Web & App  <br> Europe"
         
    };

    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
    }catch(error){
        console.log(error.message)
    }
}

module.exports = sendmail;