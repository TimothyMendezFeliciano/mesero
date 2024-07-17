import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { trpc } from '../utils/trpc';
import getStripe from '../utils/getStripe';

export const tiers = [
  {
    name: 'Equipo Pequeño',
    id: 'tier-basic',
    href: 'prod_QHAtBpFEjFYwtv',
    priceId: 'price_1PQcYAP08TtvTynpEPMh2hcg',
    price: { monthly: '$15', annually: '$12' },
    description: 'Everything necessary to get started.',
    features: [
      '5 products',
      'Up to 1,000 subscribers',
      'Basic analytics',
      '48-hour support response time',
    ],
  },
  {
    name: 'Equipo Mediano',
    id: 'tier-essential',
    href: 'prod_QHBC8COpBMgvog',
    priceId: 'price_1PQcqIP08TtvTynp5Ulu95Pk',
    price: { monthly: '$30', annually: '$24' },
    description:
      'Everything in Basic, plus essential tools for growing your business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
  },
  {
    name: 'Equipo Grande',
    id: 'tier-growth',
    href: 'prod_QMPubtgAb1fw0O',
    priceId: 'price_1PVh4QP08TtvTynprD9PvlMP',
    price: { monthly: '$60', annually: '$48' },
    description:
      'Everything in Essential, plus collaboration tools and deeper insights.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
      'Custom reporting tools',
    ],
  },
];

interface Tier {
  name: string;
  id: string;
  href: string;
  priceId: string;
  price: { monthly: string; annually: string };
  description: string;
  features: string[];
}

interface HeaderWithThreeColumnsProps {
  topic: string;
  subTopic: string;
  description: string;
  tiers: Tier[];
}

export function Tier({
  name,
  id,
  price,
  description,
  features,
  priceId,
}: Tier) {
  const { mutateAsync } = trpc.stripe.checkout.useMutation();

  const handleCreateCheckoutSession = async (priceId) => {
    const { result } = await mutateAsync({ priceId });
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: result.id,
    });
    console.warn(error.message);
  };

  return (
    <div key={id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
      <h3 id={id} className="text-base font-semibold leading-7 text-gray-900">
        {name}
      </h3>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className="text-5xl font-bold tracking-tight text-gray-900">
          {price.monthly}
        </span>
        <span className="text-sm font-semibold leading-6 text-gray-600">
          /month
        </span>
      </p>
      <p className="mt-3 text-sm leading-6 text-gray-500">
        {price.annually} per month if paid annually
      </p>
      <button
        onClick={() => handleCreateCheckoutSession(priceId)}
        aria-describedby={id}
        className="mt-10 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Adquirir
      </button>
      <p className="mt-10 text-sm font-semibold leading-6 text-gray-900">
        {description}
      </p>
      <ul
        role="list"
        className="mt-6 space-y-3 text-sm leading-6 text-gray-600"
      >
        {features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <CheckCircleIcon
              className="h-6 w-5 flex-none text-indigo-600"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HeaderWithThreeColumns({
  topic,
  subTopic,
  description,
  tiers,
}: HeaderWithThreeColumnsProps) {
  return (
    <div className={'bg-white py-24 sm:py-32'}>
      <div className={'mx-auto max-w-7xl px-6 lg:px-8'}>
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {topic}
          </h2>
          {subTopic && (
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {subTopic}
            </p>
          )}
        </div>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">
            {description}
          </p>
        )}
      </div>
      <div className={'mt-20 flow-root'}>
        <div
          className={
            'isolate -m-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4'
          }
        >
          {tiers.map((tier, index) => (
            <Tier key={index} {...tier} />
          ))}
        </div>
      </div>
    </div>
  );
}
