'use strict';

const { Router } = require('express');
const superagent = require('superagent');
const httpErrors = require('http-errors');
const Account = require('../model/account.js');
const basicAuth = require('../lib/basic-auth-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware');

const authRouter = module.exports = new Router();

authRouter.post('/auth', (req, res, next) => {
  Account.create(req.body)
    .then(account => account.tokenCreate())
    .then(token => {
      res.cookie('X-CharityChoice-Token', token, { maxAge: 604800000 });
      res.json({ token });
    })
    .catch(next);
});

authRouter.get('/oauth/google', (req, res) => {
  if (!req.query.code) {
    res.redirect(process.env.CLIENT_URL);
  } else {
    superagent.post('https://www.googleapis.com/oauth2/v4/token')
      .type('form')
      .send({
        code: req.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.API_URL}/oauth/google`,
      })
      .then((res) => {
        console.log(res.body);
        if (!res.body.access_token)
          throw new Error('no access token');
        return res.body.access_token;
      })
      .then(accessToken => {
        return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
          .set('Authorization', `Bearer ${accessToken}`);
      })
      .then(res => {
        return Account.handleGoogleOAuth(res.body);
      })
      .then(account => account.tokenCreate())
      .then(token => {
        res.cookie('X-CharityChoice-Token', token, { maxAge: 604800000 });
        res.redirect(process.env.CLIENT_URL);
      })
      .catch(err => {
        console.error(err);
        res.cookie('X-CharityChoice-Token', '');
        res.redirect(process.env.CLIENT_URL + '?error=oauth');
      });

  }
});

authRouter.get('/auth', basicAuth, (req, res, next) => {
  req.account.tokenCreate()
    .then(token => {
      res.cookie('X-CharityChoice-Token', token, { maxAge: 604800000 });
      res.json({ token });
    })
    .catch(next);
});

authRouter.put('/auth', basicAuth, (req, res, next) => {

  if (!req.body.username || !req.body.email || !req.body.password)
    return next(httpErrors(400, '__REQUEST_ERROR__ username, email, and password required'));

  req.account.update(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
});
