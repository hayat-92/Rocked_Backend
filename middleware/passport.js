const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("./config");
const { tokenTypes } = require("./tokens");
const { User } = require("../models");

const accessExpirationMinutes = 240;
const ACCESS = "access";
const secret1="thisisasamplesecret";


const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
};


const jwtVerify = async (payload, done) => {

  if(payload.type !== ACCESS){
    return done(Error("Invalid token type"), null);
  }

  User.findById(payload.sub, function(err, user){
    
    if(err){
      return done(err, false);
    }

    if (!user) {
      return done(null, false);
    }

    if(user){
      return done(null, user);
    }
  })
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
