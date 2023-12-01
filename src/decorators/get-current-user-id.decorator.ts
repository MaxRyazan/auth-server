import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUserIdDecorator  = createParamDecorator(
    (context: ExecutionContext): number => {
        const request = context.switchToHttp().getRequest()
        return request.user['sub']
    }
)