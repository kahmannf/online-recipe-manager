const email = require('emailjs');
const config = require('./config');


const server = email.server.connect(config.email);

const sendmail = (message) => {
    server.send(message, (err, message) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log('Email send');
        } 
    });
};


module.exports = {
    registrationmail: (user) => {

        var message = {
            text: 'Hallo '+ user.alias +',\n\n'
                    + 'Zum aktivieren deines Rezept-Manager-Account folge bitte diesem Link:\n' 
                    + config.server.baseurl + 'password.html?key=' + user.registerkey + '\n\n'
                    + 'Wenn du gar nicht versucht hast, dich beim Rezeptmanager zu registrieren, ignoriere diese Email bitte\n'
                    + '\n\n\n\n'
                    + 'Dies ist eine automatisch generierte Email. Bitte nicht Antworten. Bei Fragen wende dich bitte an support@recipe.kahmann.com \n', 
            from: 'Rezept Manager <noreply@recipe.kahmann.com>',
            to: user.alias + ' <' + user.email + '>', 
            subject: 'Account-Aktivierung',
            attachment:
            [
                {
                    data: '<html><p>Hallo '+ user.alias +',</p>'
                    + '<p>Zum aktivieren deines Rezept-Manager-Account folge bitte diesem Link:</p>' 
                    + '<a href="' + config.server.baseurl + 'password.html?key=' + user.registerkey + '">Passwort festlegen</a>'
                    + '<p>Wenn du gar nicht versucht hast, dich beim Rezeptmanager zu registrieren, ignoriere diese Email bitte</p>'
                    + '<br/><br/><br/><br/>'
                    + '<p>Dies ist eine automatisch generierte Email. Bitte nicht Antworten. Bei Fragen wende dich bitte an support@recipe.kahmann.com</p>'
                    + '</html>', 
                    alternative:true
                }
            ]
        };

        sendmail(message);
    },
}