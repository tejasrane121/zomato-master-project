import JwtPassport from "passport-jwt";

//Database model
import {UserModel} from "../database/User";

const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "ZomatoApp"
};

export default (passport) => {
  passport.UserModel(
  new JwtStrategy(options, async(jwt__payload, done)=>{
    try {
      const doesUserExist = UserModel.findById(jwt__payload.user);
      if(!doesUserExist) return done(null, false);

      return done(null, doesUserExist);
    } catch (error) {
      throw new Error(error);
    }
  })
  )
};
