import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Registration')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user',
  })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'User registered',
    type: () => ({ token: String }),
  })
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate and generate a token for the user',
  })
  @ApiResponse({
    status: 200,
    description: 'User authenticated',
    type: () => ({ token: String }),
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() Logindto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(Logindto);
  }
}
