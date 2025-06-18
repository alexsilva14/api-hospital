const { Router } = require("express");
const routes = Router();


const EspecialidadeController = require('./controllers/EspecialidadeController');
const PacienteController = require('./controllers/PacienteController');
const ProfissionalController = require('./controllers/ProfissionalController');
const AtendimentoController = require('./controllers/AtendimentoController');


// Rotas Especialidades
routes.get("/especialidades", EspecialidadeController.index);
routes.get("/especialidades/:id", EspecialidadeController.show);
routes.post("/especialidades", EspecialidadeController.store);
routes.put("/especialidades/:id", EspecialidadeController.update);
routes.delete("/especialidades/:id", EspecialidadeController.delete);

// Rotas Pacientes
routes.get("/pacientes", PacienteController.index);
routes.get("/pacientes/:id", PacienteController.show);
routes.post("/pacientes", PacienteController.store);
routes.put("/pacientes/:id", PacienteController.update);
routes.delete("/pacientes/:id", PacienteController.delete);

// Rotas Profissionais
routes.get('/profissionais', ProfissionalController.index);
routes.get('/profissionais/:id', ProfissionalController.show);
routes.post('/profissionais', ProfissionalController.store);
routes.put('/profissionais/:id', ProfissionalController.update);
routes.delete('/profissionais/:id', ProfissionalController.delete);

// Rotas Atendimentos
routes.get("/atendimentos", AtendimentoController.index);
routes.get("/atendimentos/:id", AtendimentoController.show);
routes.post("/atendimentos", AtendimentoController.store);
routes.put("/atendimentos/:id", AtendimentoController.update);
routes.delete("/atendimentos/:id", AtendimentoController.delete);


module.exports = routes;
