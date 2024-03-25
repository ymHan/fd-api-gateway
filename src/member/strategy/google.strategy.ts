import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URI,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    try {
      const { id, name, emails } = profile;
      const fullname = name.familyName + name.givenName;
      const provider = 'google';

      const user = {
        email: emails[0].value,
        name: fullname,
        provider,
        providerId: id,
      };

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
