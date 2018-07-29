import { ObjectID } from 'mongodb';

const generateArticleModel = ({ db }) => {
  const col = db.collection('article');
  const publicFields = { _id: 1, title: 1, content: 1 };
  return {
    getAll: async ({ limit }) => {
      const docs = await col
        .find({}, { projection: publicFields, limit, sort: { _id: -1 } })
        .toArray();
      return docs;
    },
    getById: async ({ articleId }) => {
      const doc = await col.findOne(
        { _id: new ObjectID(articleId) },
        { projection: publicFields },
      );
      return doc;
    },
    insertOne: async ({ title, content }) => {
      const result = await col.insertOne({
        title,
        content,
      });
      return result && result.result && result.result.ok && result.ops[0];
    },
  };
};

export default generateArticleModel;
