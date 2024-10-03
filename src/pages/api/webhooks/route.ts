import Stripe from 'stripe';
import { prisma } from '../../../server/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Initialize Stripe with API version and secret key.
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Configures the bodyParser to not parse JSON in case of webhook events.
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * The main function for handling stripe webhook events.
 *
 * @param {NextApiRequest} req - The api request.
 * @param {NextApiResponse} res - The api response.
 *
 * @returns {Object} - The response object with a message indicating the request success or failure.
 */
export default async function webhookHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // We are going to add things here

  /**
   * In Stripe webhooks, the request body contains the event details and is signed by Stripe
   * to verify its legitimacy. Therefore, the request might be streaming
   * (especially if they're several KBs in size) and might not fit the bodyparser's cap.
   * By disabling the bodyparser, we can get the raw, unbuffered request body.
   */
  const readable = req.read();
  const buffer = Buffer.from(readable);

  try {
    /**
     * The Stripe Signature is a HTTP header that Stripe uses to sign an event.
     * This signature is used to validate the event and confirm that it came from Stripe webhooks.
     */
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    //   Rest of the code goes here

    try {
      /**
       * Construct the event from Stripe saigned signature, request body and the Stripe secret.
       */
      event = stripe.webhooks.constructEvent(buffer, sig, webhookSecret);

      /**
       * The Stripe subscription object
       */
      const subscription = event.data.object as Stripe.Subscription;

      switch (event.type) {
        /**
         * Event to handle customer subscription created
         */
        case 'customer.subscription.created':
          /**
           * Update the user in the database to active status and give them owner role.
           */
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
        /**
         * Event to handle customer subscription deleted
         */
        case 'customer.subscription.deleted':
          /**
           * Update the user in the database to inactive status and demote to guest role.
           */
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
        /**
         * Default case for unhandled event types.
         */
        default:
          console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
          break;
      }
    } catch (err) {
      /**
       * Error handling block for try-constructEvent
       */
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';

      if (!(err instanceof Error)) console.log('Not instance of error', err);

      /**
       * Log the error message and request details for tracking.
       */
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
    /**
     * Catch all error handling
     */
    return res
      .setHeader('Allow', 'POST')
      .status(405)
      .send({
        error: {
          message: 'Method Not Allowed',
        },
      });
  }
}
