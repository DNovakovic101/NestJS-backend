import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {JwtService,} from '@nestjs/jwt';
import {LoginDto, TokenDto} from "../../../dto";
import {UserEntity} from "../../../entity";

@Injectable()
export class LoginService {

  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
    private readonly _jwtService: JwtService
  ) {
  }

  async login(loginDto: LoginDto): Promise<TokenDto> {
    const user = await this._userRepository.findOne({
      email: loginDto.email.toLocaleLowerCase()
    });

    if (!user) {
      throw new NotFoundException(`User with email ${loginDto.email} not found`);
    }

    if (!await bcrypt.compare(loginDto.password, user.password)) {
      throw new UnauthorizedException('Wrong password');
    }

    const response = new TokenDto();
    response.jwt = this._issueJwtToken(user.id);
    response.refresh = this._issueRefreshToken(user.id);

    return response;
  }

  async refreshToken(tokenDto: TokenDto): Promise<TokenDto> {
    try {
      this._jwtService.verify(
        tokenDto.jwt,
        {
          secret: process.env.JWT_SECRET_KEY
        }
      );

      return tokenDto;
    } catch (jwtVerifyError) {
      if (jwtVerifyError.name === 'TokenExpiredError') {
        let tokenData;

        try {
          tokenData = this._jwtService.verify(
            tokenDto.refresh,
            {
              secret: process.env.REFRESH_TOKEN_SECRET_KEY
            }
          );
        } catch (refreshVerifyError) {
          throw new UnauthorizedException('Refresh token is not valid');
        }

        const user = await this._userRepository.findOne({id: tokenData.userId});

        if (!user) {
          throw new NotFoundException(`User with id ${tokenData.userId} not found`);
        }

        tokenDto.jwt = this._issueJwtToken(tokenData.userId);
        return tokenDto;
      } else {
        throw new BadRequestException(`Unknown token exception: ${jwtVerifyError.name}`);
      }
    }
  }

  private _issueJwtToken(userId: number): string {
    return this._jwtService.sign({userId: userId});
  }

  private _issueRefreshToken(userId: number): string {
    return this._jwtService.sign(
      {userId: userId},
      {secret: process.env.REFRESH_TOKEN_SECRET_KEY, expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRATION)}
    );
  }
}
