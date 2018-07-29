import initAndGetDb from './init-and-get-db';

const mongo = {
  db: null,
  async init() {
    this.db = await initAndGetDb();
  },
};

export default mongo;
