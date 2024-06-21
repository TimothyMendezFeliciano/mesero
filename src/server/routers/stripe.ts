import { authedProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import Stripe from 'stripe';

export const stripeRouter = router({
  checkout: authedProcedure.mutation(async ({ ctx }) => {
    const session = ctx.session;
    if (!session?.user?.stripeCustomerId) {
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

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-04-10',
    });

    // TODO: Add price for tier
    const checkoutSession = await stripe.checkout.sessions.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      mode: 'subscription',
      customer: session.user.stripeCustomerId,
      line_items: [
        {
          price: 0.0,
          quantity: 1,
        },
      ],
      success_url: `${process.env.APP_URL}/success`,
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
  }),
});
