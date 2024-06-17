import { TokenPayload } from "src/common/interface/token-payload.interface";

export class ValidateTokenPayloadCommand {
    constructor(public readonly payload: TokenPayload) {}
  }