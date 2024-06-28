import Stripe from 'stripe';
import { prisma } from '../../../server/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function webhookHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // We are going to add things here
  try {
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    //   Rest of the code goes here

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

      const subscription = event.data.object as Stripe.Subscription;

      switch (event.type) {
        case 'customer.subscription.created':
          await prisma.user.update({
            where: {
              stripeCustomerId: subscription.customer as string,
            },
            data: {
              isActive: true,
              role: 'OWNER',
            },
          });
          break;
        case 'customer.subscription.deleted':
          await prisma.user.update({
            where: {
              stripeCustomerId: subscription.customer as string,
            },
            data: {
              isActive: false,
              role: 'GUEST',
            },
          });
          break;

        default:
          console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
          break;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';

      if (!(err instanceof Error)) console.log('Not instance of error', err);
      console.log(`❌ Error message: ${errorMessage}`, {
        body: req.body,
        sig: req.headers['stripe-signature'],
      });

      return res.status(400).send({
        error: {
          message: `Webhook Error: ${errorMessage}`,
        },
      });
    }

    return res.send({
      received: true,
    });
  } catch (e) {
    return res
      .setHeader('Allow', 'POST')
      .status(405)
      .send({
        error: {
          message: 'Method Not Allowed',
        },
      });
    // return NextResponse.json(
    //   {
    //     error: {
    //       message: 'Method Not Allowed',
    //     },
    //   },
    //   { status: 405 },
    // ).headers.set('Allow', 'POST');
  }
}
