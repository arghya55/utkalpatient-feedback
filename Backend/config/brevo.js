const brevo = require('@getbrevo/brevo');


const client = new brevo.TransactionalEmailsApi();


client.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);


module.exports = client;