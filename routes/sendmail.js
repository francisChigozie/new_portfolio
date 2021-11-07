const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
       .config()

   async function sendmail(email){
    try{

     const  transporter = nodemailer.createTransport({
     host: 'smtp-relay.sendinblue.com',
     port: 587,
     secure: false,
     auth: {
         user: 'cyriacus1210@gmail.com',
         pass: '1MEYrXzsO6ngTH7R'
  },
  tls:{
      rejectUnauthorized: false
  }
});

        var mailOptions = {
        from: 'cyriacus1210@gmail.com',
        to: email,
        subject: 'A Warm Welcome To You And I Will Write You Soon',
        text: 'Hallo, Welcome to my codig space',
        html: "<h3>Click on the link below to complete the process:</h3><br>" +
    "</a><br><a href='https://github.com/francisChigozie'> Visit My Git/Hub</a><br><br>" +
        "From the Management:<br>Franksoft Inc GmbH<br>Germany"
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