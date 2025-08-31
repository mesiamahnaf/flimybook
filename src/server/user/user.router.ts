import { procedure, publicProcedure, router } from "@/server/trpc/server";

//Services
import { UserService } from "./user.service";
const userService = new UserService();

//Input
import { registerInput, verifyEmailInput, loginInput, userUpdateInput } from "./input/user.input";

export const userRouter = router({
    getUser: procedure.query(() => {
        return userService.getUser();
    }),
    register: publicProcedure.input(registerInput).mutation(({ input }) => {
        return userService.register(input);
    }),
    verifyEmail: publicProcedure.input(verifyEmailInput).mutation(({ input }) => {
        return userService.verifyEmail(input);
    }),
    login: publicProcedure.input(loginInput).mutation(({ input }) => {
        return userService.login(input);
    }),
    count: procedure.query(({ ctx }) => {
        return userService.count(ctx.session);
    }),
    update: procedure.input(userUpdateInput).mutation(({ input, ctx }) => {
        return userService.update(input, ctx.session)
    })
});