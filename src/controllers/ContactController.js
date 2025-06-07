const ContactRepository = require('../Repositories/ContactRepository')

class ContactController{
  async index(request, response){
       const contacts = await ContactRepository.findAll();
       response.json(contacts)
  }
    
  async show(request, response){
    const {id} = request.params;

    const contact = await ContactRepository.findById(id);

    if(!contact){
      return response.status(404).json({ error: "Contato não encontrado"});

    }
    
    response.json(contact);
  
  }

  async store(request, response){
      
    const{name, email, phone, category_id} = request.body

    if(!name) {
      return response.status(400).json({error: "Nome é obrigatorio!"})
    }

    if(email) {
      const contactByEmail = await ContactRepository.
      findByEmail(email)


      if(contactByEmail){
        return response.status(400).json({error:
          "Esse e-mail ja esta em uso!"})
      }

    }


const contact = await ContactRepository.create({
  name,
  email: email || null,
  phone: phone || null,
  category_id: category_id || null
})

response.status(201).json(contact)


    
  }

 async update(request, response){
  
    const {id} = request.params
    const{name, email, phone, category_id} = request.body

    const contact = await ContactRepository.findById(id)
    if(!contact){
      return response.status(404).json({error: "Contato não encontrado"})
    }
    

    if(email){
      const contactByEmail = await ContactRepository.findByEmail(email)
      if(contactByEmail){
        return response.status(400).json({error: "O e-mail ja esta em uso"})
      }
    }
    
    await ContactRepository.update(id, {
      name: name ?? contact.name,
      email: email ?? contact.email,
      phone: phone ?? contact.phone,
      category_id: category_id ?? contact.category_id
    })

    const updateContact = await ContactRepository.findById(id)
    response.status(200).json(updateContact)


  }

  async delete(request, response){
  const {id} = request.params;

  if(!id){
    return response.status(400).json({error: "ID de contato invalido"})
  }

await ContactRepository.delete(id)

response.sendStatus(204)

  }

}

module.exports = new ContactController();