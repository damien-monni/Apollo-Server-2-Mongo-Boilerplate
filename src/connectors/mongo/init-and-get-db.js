import { MongoClient } from 'mongodb';
import settings from '../../settings';

// Connection URL
const url = settings.mongoUrl;

// Database Name
const dbName = settings.mongoDbName;

const initAndGetDb = async () => {
  try {
    const client = await MongoClient.connect(
      url,
      { useNewUrlParser: true },
    );
    return client.db(dbName);
  } catch (err) {
    console.log(err);
  }
};

export default initAndGetDb;
