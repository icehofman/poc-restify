/* global describe:true, before:true, after:true, it:true, baseURL:true */

'use strict';

var should  = require('chai').should(),
    request = require('supertest');


describe("/version", function () {

  it('should return a version', function (done) {
    request(baseURL)
      .get('/version')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        
        res.body.should.be.an('object');
        res.body.should.have.ownProperty('version');
        res.body.version.should.exist;
        res.body.version.should.equal("1.0.0");
        
        return done();
      });
  });

});
