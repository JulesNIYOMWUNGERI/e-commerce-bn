import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
const expect = chai.expect;
chai.use(chaiHttp);

describe('Sample Test', function() {
  it('should return a response with status code 200', function(done) {
    chai.request(app)
      .get('/sample_test')
      .end(function(err, res) {
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});
