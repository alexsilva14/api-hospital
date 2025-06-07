const {Router} = require("express");
const routes = Router();

const ContactController = require('./controllers/ContactController');
const CategoryController = require('./controllers/CategoryController');

// Rotas (antigo routes.js embutido aqui)
routes.get("/contacts",ContactController.index);
routes.get("/contacts/:id",ContactController.show);
routes.post("/contacts", ContactController.store);
routes.put("/contacts/:id",ContactController.update);
routes.delete("/contacts/:id", ContactController.delete);

routes.get("/categories", CategoryController.index);
routes.get("/categories/:id", CategoryController.show);
routes.post("/categories",CategoryController.store);
routes.put("/categories/:id", CategoryController.update);
routes.delete("/categories/:id", CategoryController.delete);

module.exports = routes;
