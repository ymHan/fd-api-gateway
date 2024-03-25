import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Strategy, VerifyCallback } from 'passport-apple';

export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(private readonly jwtService: JwtService) {
    super(
      {
        clientID: process.env.APPLE_CLIENT_ID,
        teamID: process.env.APPLE_TEAM_ID,
        callbackURL: process.env.APPLE_CALLBACK_URL,
        keyID: process.env.APPLE_KEY_ID,
        privateKeyString: process.env.APPLE_KEY_STRING,
        passReqToCallback: true,
      },
      async function (req: any, accessToken: string, refreshToken: string, idToken: string, profile: any, done: VerifyCallback) {
        try {
          const idTokenDecoded = jwtService.decode(idToken);
          const { sub, email } = idTokenDecoded;
          const id = sub ? sub : email;
          const userInfo = req.body.user ? JSON.parse(req.body.user) : ''; //최초 로그인시에만 전달받음
          const name = userInfo ? userInfo.firstName + userInfo.lastName : '';
          const provider = 'apple';

          const user = {
            email,
            name,
            provider,
            providerId: id,
          };
          done(null, user);
        } catch (error) {
          done(error);
        }
      },
    );
  }
}
