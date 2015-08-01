import { Client } from '../src/index.js'
import { RequestLogger, ResponseLogger } from 'stackable-fetcher'

describe('Client', () => {
  let client = new Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })
  client.getFetcher().use(RequestLogger).use(ResponseLogger);

  describe('#createResource', () => {
    it.only('does not raise any error', (done) => {
      client.createResource({ parentId: 'a', pathPart: 'b', restapiId: 'c' }).then((resource) => {
        done();
      });
    });
  });

  describe('#createRestapi', () => {
    it('does not raise any error', (done) => {
      client.createRestapi({ name: 'a' }).then((restapi) => {
        done();
      });
    });
  });

  describe('#listResources', () => {
    it('does not raise any error', (done) => {
      client.listResources({ restapiId: 'a' }).then((resources) => {
        done();
      });
    });
  });

  describe('#listRestapis', () => {
    it('does not raise any error', (done) => {
      client.listRestapis().then((restapis) => {
        done();
      });
    });
  });
});
