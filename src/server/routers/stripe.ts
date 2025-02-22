/**
 * The `stripeRouter` is a tRPC-router instance exposing a single `checkout` mutation.
 * It is used to create a Stripe checkout session for a user that has a stripeCustomerId.
 * @module stripeRouter
 */

import { authedProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import Stripe from 'stripe';
import * as z from 'zod';
import { Session } from 'next-auth';

/**
 * The `stripeRouter` object exports a tRPC-router configuration that includes a `checkout` mutation.
 * This mutation creates a Stripe checkout session for a user that has a stripeCustomerId associated with their account.
 * If the user is not authenticated, or the user does not exist, the mutation will throw an error.
 * The mutation will also throw an error if it is unable to create the checkout session.
 */
export const stripeRouter = router({
  /**
   * The `checkout` mutation creates a Stripe checkout session for a user that has a stripeCustomerId.
   * - If the user is not authenticated or the stripeCustomerId is not set, the mutation throws an error.
   * - The mutation throws an error if it cannot create a session.
   * @function checkout
   * @async
   * @param {Object} context - The tRPC context object.
   * @property {Object} ctx.session - The session object.
   * @throws {TRPCError} - If user is not registered as a customer
   * @throws {TRPCError} - If user does not exist
   * @throws {TRPCError} - If unable to create an invoice session
   * @returns {Object} Response object with status, message, and session result.
   */

  checkout: authedProcedure
    .input(
      z.object({
        priceId: z.coerce
          .string({
            required_error: 'Product ID is required',
            invalid_type_error: 'Must be of type string',
          })
          .min(1),
      }),
    )

    .mutation(
      async ({
        input,
        ctx,
      }): Promise<{
        status: number;
        message: string;
        result: Stripe.Response<Stripe.Checkout.Session>;
      }> => {
        if (typeof ctx.session?.user === 'undefined') {
          throw new Error('Invalid session');
        }

        const session: Session = ctx.session;
        if (session === null) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Session Not Found',
          });
        }

        if (
          session?.user &&
          !('stripeCustomerId' in session.user) &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          !session?.user?.stripeCustomerId
        ) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'No estas registrado como cliente.',
          });
        }
        if (!session?.user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Usuario no existe. Por favor registrese.',
          });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
          apiVersion: '2024-04-10',
        });

        const checkoutSession = await stripe.checkout.sessions.create({
          mode: 'subscription',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          customer: session.user.stripeCustomerId,
          line_items: [
            {
              price: input.priceId,
              quantity: 1,
            },
          ],
          success_url: `${process.env.APP_URL}/dashboard/admin`,
          cancel_url: `${process.env.APP_URL}/error`,
          subscription_data: {
            metadata: {
              payingUserId: session.user.email,
            },
          },
        });

        if (!checkoutSession.url) {
          throw new TRPCError({
            code: 'NOT_IMPLEMENTED',
            message: 'No se pudo crear sesión de factura.',
          });
        }

        return {
          status: 201,
          message: 'Sesión creada!',
          result: checkoutSession,
        };
      },
    ),
});
