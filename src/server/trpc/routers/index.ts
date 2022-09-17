/**
 * This file contains the root router of your tRPC-backend
 */
import { authRouter } from 'feature/next-auth/router';
import ssgRouter from 'feature/ssg/router';

import { t } from '../trpc';
import { sourceRouter } from './source';

export const appRouter = t.router({
  healthcheck: t.procedure.query(() => 'ok'),

  source: sourceRouter,
  ssg: ssgRouter,
  auth: authRouter,
});
export type AppRouter = typeof appRouter;

// TODO: remove this
// /**
//  * Create your application's root router
//  * If you want to use SSG, you need export this
//  * @link https://trpc.io/docs/v10/ssg
//  * @link https://trpc.io/docs/v10/router
//  */
// export const appRouter2 = createRouter()
//   /**
//    * Add data transformers
//    * @link https://trpc.io/docs/data-transformers
//    */
//   .transformer(superjson)
//   /**
//    * Optionally do custom error (type safe!) formatting
//    * @link https://trpc.io/docs/error-formatting
//    */
//   // .formatError(({ shape, error }) => { })

//   .merge('source.', sourceRouter)
//   // features:
//   .merge(nextAuthRouter)
//   .merge(ssgRouter)
//   .merge(reactHookFormRouter)
//   .interop();