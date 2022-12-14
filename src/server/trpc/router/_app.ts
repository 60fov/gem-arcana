import { router } from "../trpc";
import { authRouter } from "./auth";
import { gemRouter } from "./gem";
import { userRouter } from "./user";

export const appRouter = router({
  gem: gemRouter,
  user: userRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
