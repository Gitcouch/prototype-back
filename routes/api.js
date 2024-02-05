var express = require('express');

var router = express.Router();
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

var novedadesModel = require('../models/novedadesModel');

router.get('/novedades', async (req, res) => {
  let novedades = await novedadesModel.getNovedades();

  novedades = novedades.map((novedad) => {
    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
        width: 960,
        height: 200,
        crop: 'fill'
      });
      return {
        ...novedad,
        imagen
      }
    }

    return {
      ...novedad,
      image: null
    }
  });

  res.json(novedades);
});

router.post('/contacto', async (req, res) => {
  const mail = {
    to: 'imaezart@gmail.com',
    subject: 'contacto web',
    html: `${req.body.nombre} se contacto a traves de la web y quiere más información a este correo: ${req.body.email}
        <br> Además, hizo el siguiente comentario: ${req.body.mensaje} <br> Su tel es: ${req.body.telefono}`

  }

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transport.sendMail(mail)

  res.status(201).json({
    error: false,
    message: 'Mensaje enviado'
  })
});

module.exports = router;
