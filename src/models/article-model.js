import MongoCollection from '../connectors/mongo/MongoCollection';
import { ObjectID } from 'mongodb';

const articleCol = new MongoCollection('article');

const publicFields = { _id: 1, title: 1, content: 1 };

const articleModel = {
  async getAll({ limit }) {
    const docs = await articleCol
      .getCol()
      .find({}, { projection: publicFields, limit, sort: { _id: -1 } })
      .toArray();
    return docs;
  },
  async getById({ articleId }) {
    const doc = await articleCol
      .getCol()
      .findOne({ _id: new ObjectID(articleId) }, { projection: publicFields });
    return doc;
  },
  async insertOne({ title, content }) {
    const result = await articleCol.getCol().insertOne({
      title,
      content,
    });
    return result && result.result && result.result.ok && result.ops[0];
  },
};

export default articleModel;
