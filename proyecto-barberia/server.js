 const express = require('express');
 const bodyParser = require('body-parser');
 const nodemailer = require('nodemailer');
 const path = require('path');

 const app = express();
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname, './public')));
 app.use(express.static("public"))



     // Configuración del transporte de correo electrónico con nodemailer
     const transporter = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
             user: 'jorgeluislezcano1988@gmail.com', // Reemplaza con tu dirección de correo electrónico
             pass: 'ymeputallhzqhend' // Reemplaza con tu contraseña
         }
     });

     app.post('/enviar', (req, res) => {
      const { nombre, apellido, email, celular, horario } = req.body;


     // Contenido del correo electrónico
     const mailOptions = {
         from: 'jorgeluislezcano1988@gmail.com', // Reemplaza con tu dirección de correo electrónico
         to: 'jorgeluislezcano1988@gmail.com', // Reemplaza con la dirección de correo electrónico de destino
         subject: 'Nuevo turno solicitado',
         text: `Nombre: ${nombre} ${apellido}\nEmail: ${email}\nCelular: ${celular}\nHorario: ${horario}`
     };

     // Envío del correo electrónico
     transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
             console.log(error);
             res.status(500).send('Ocurrió un error al enviar el correo electrónico');
         } else {
             console.log('Correo electrónico enviado:', info.response);
             res.send('Gracias por solicitar un turno. Nos pondremos en contacto contigo pronto.');
           
         }
     });
 });


 // envio de consulta formulario index.html
 app.post('/enviar-consulta', (req, res) => {
    const { nombre, email, consulta } = req.body;
  
    // Configuración del transporte de correo electrónico con nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'jorgeluislezcano1988@gmail.com', // Reemplaza con tu dirección de correo electrónico
        pass: 'ymeputallhzqhend' // Reemplaza con tu contraseña
      }
    });
  
    // Contenido del correo electrónico
    const mailOptions = {
      from: 'jorgeluislezcano1988@gmail.com', // Reemplaza con tu dirección de correo electrónico
      to: 'jorgeluislezcano1988@gmail.com', // Reemplaza con la dirección de correo electrónico de destino
      subject: 'Nueva consulta recibida',
      text: `Nombre: ${nombre}\nEmail: ${email}\nConsulta: ${consulta}`
    };
  
    // Envío del correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al enviar el correo electrónico');
      } else {
        console.log('Correo electrónico enviado:', info.response);
        res.send('Gracias por enviar tu consulta. Nos pondremos en contacto contigo pronto.');
      }
    });
  });
    


  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
   
    res.setHeader("Access-Control-Allow-Origin","*")
    
});
const port = process.env.PORT || 8080;

app.listen(port, () => {
 console.log(`Servidor corriendo en http://localhost:${port}`);    
});