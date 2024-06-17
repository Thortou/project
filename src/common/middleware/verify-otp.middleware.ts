import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class VerifyOTPOnFirebaseMiddleware implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const idToken = request.headers['idtoken'];
        if (!idToken) {
            throw new HttpException(
                'OTP not provided in the header',
                HttpStatus.UNAUTHORIZED,
            );
        }

        try {
            const tokenString: string = idToken as string;
            const decodedToken = await admin.auth().verifyIdToken(tokenString);
            request['user'] = decodedToken;
            return true;
        } catch (error) {
            throw new HttpException('Invalid OTP', HttpStatus.UNAUTHORIZED);
        }
    }
}