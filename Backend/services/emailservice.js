const brevoClient = require("../config/brevo");
const brevo = require("@getbrevo/brevo");


const sendEmail = async(to, subject, message)=>{

    try{

        let email = new brevo.SendSmtpEmail();


        email.sender = {
            name: process.env.EMAIL_NAME,
            email: process.env.EMAIL_FROM
        };


        email.to = [
            {
                email: to
            }
        ];


        email.subject = subject;


        email.htmlContent = `
            <h2>${subject}</h2>
            <p>${message}</p>
        `;


        await brevoClient.sendTransacEmail(email);


        console.log("Email sent");


    }
    catch(error){

        console.log(error);

    }

}


module.exports = sendEmail;