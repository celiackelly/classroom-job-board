const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const refresh = require('passport-oauth2-refresh')
const mongoose = require('mongoose')
const User = require('../models/User')
const moment = require('moment');

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` })
      }
      if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using Google. To enable password login, sign in using Google, and then set a password under your user profile.' })
        //need to add this functionality in user profile
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) {
          return done(null, user)
        }
        return done(null, false, { msg: 'Invalid email or password.' })
      })
    })
  }))

  /**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.  
 *     - If there is, return an error message. (Account merging not supported) - NOT NEEDED 
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

   const googleStrategyConfig = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  }, (req, accessToken, refreshToken, params, profile, done) => {
    if (req.user) {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.googleId = profile.id;
          user.tokens.push({
            kind: 'google',
            accessToken,
            accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
            refreshToken,
          });
          user.firstName = profile.firstName;
          user.lastName = profile.lastName;
          user.save((err) => {
            req.flash('info', { msg: 'Google account has been linked.' });
            done(err, user);
          });
        });
      } else {
      User.findOne({ googleId: profile.id }, (err, existingUser) => {
        if (err) { return done(err); }
        if (existingUser) {
          return done(null, existingUser);
        }
        User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
          if (err) { return done(err); }
          if (existingEmailUser) {
            req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from your user profile.' });
            done(err);
          } else {
            const user = new User();
            user.email = profile.emails[0].value;
            user.googleId = profile.id;
            user.tokens.push({
              kind: 'google',
              accessToken,
              accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
              refreshToken,
            });
            user.firstName = profile.firstName;
            user.lastName = profile.lastName;
            user.save((err) => {
              done(err, user);
            });
          }
        });
      });
    }
  });
  passport.use('google', googleStrategyConfig);
  refresh.use('google', googleStrategyConfig);

    passport.serializeUser((user, done) => {
      done(null, user.id)
    })
  
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user))
    })

  }


