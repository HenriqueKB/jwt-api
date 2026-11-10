const Reader = require('./reader.model');

const readerService = {
  create: async (readerData) => {
    try {
      return await Reader.create(readerData);
    } catch (error) {
      throw new Error('Erro ao cadastrar leitor: ' + error.message);
    }
  },

  findById: async (id) => {
    return await Reader.findByPk(id);
  },

  findByCpf: async (cpf) => {
    return await Reader.findOne({ where: { cpf } });
  },

  findAll: async () => {
    return await Reader.findAll();
  },

  update: async (id, readerData) => {
    const reader = await Reader.findByPk(id);
    if (!reader) throw new Error('Leitor não encontrado!');
    return await reader.update(readerData);
  },

  delete: async (id) => {
    const reader = await Reader.findByPk(id);
    if (!reader) throw new Error('Leitor não encontrado!');
    return await reader.destroy();
  }
};

module.exports = readerService;