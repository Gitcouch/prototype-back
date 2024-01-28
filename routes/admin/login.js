var express = require("express");
var router = express.Router();

var usuariosModel = require("./../../models/usuariosModel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("admin/login", {
    // Llama a login.hbs
    layout: "admin/layout",
  });
});

router.get("/logout", function (req, res, next) {
  req.session.destroy(); // destuye las variables de sección
  res.render("admin/login", {
    // Llama a login.hbs
    layout: "admin/layout",
  });
});

router.post("/", async (req, res, next) => {
  try {
    const { user, password } = req.body; // Capturando Flavia,  Captura 1234

    var data = await usuariosModel.getUserByUsernameAndPassword(user, password);

    if (!!data) {
      req.session.id_user = data.id; // id nombre de la columna de la tabla en base de datos
      req.session.nombre = data.user; // user nombre de la columna de la tabla en base de datos
      res.redirect("/admin/novedades");
    } else {
      res.render("admin/login", {
        layout: "admin/layout",
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
    next(error); // Pasa el error al siguiente middleware
  }
});

module.exports = router;
