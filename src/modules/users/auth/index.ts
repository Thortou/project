import { Provider } from "@nestjs/common";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";

export const strategies: Provider[] = [LocalStrategy, JwtStrategy];