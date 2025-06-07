const CategoryRepository = require("../Repositories/CategoryRepository");

class CategoryController {
  async index(request, response) {
    const category = await CategoryRepository.findAll();
    response.json(category);
  }

  async show(request, response) {
    const categoryId = request.params.id;
    const category = await CategoryRepository.findById(categoryId);
    if (!category) {
      return response.status(404).json({ error: "Categoria não encontrada" });
    }
    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ error: "Nome é obrigatório!" });
    }
    const category = await CategoryRepository.create(name);
    response.status(201).json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const category = await CategoryRepository.findById(id);
    if (!category) {
      return response.status(404).json({ error: "Categoria não encontrada" });
    }
    if (!name) {
      return response.status(400).json({ error: "Nome é obrigatório!" });
    }

    await CategoryRepository.update(id, name);

    const updatedCategory = await CategoryRepository.findById(id);

    response.json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    const category = await CategoryRepository.findById(id);
    if (!category) {
      return response.status(404).json({ error: "Categoria não encontrada" });
    }
    await CategoryRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
