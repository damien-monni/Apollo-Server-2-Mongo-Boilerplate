import mongo from './mongo';

export default class MongoCollection {
  constructor(name) {
    this.name = name;
    this.col = mongo.db && mongo.db.collection(this.name);
  }

  getCol() {
    if (!this.col) {
      this.col = mongo.db && mongo.db.collection(this.name);
    }

    return this.col;
  }
}
