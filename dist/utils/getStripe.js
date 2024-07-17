"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_js_1 = require("@stripe/stripe-js");
let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = (0, stripe_js_1.loadStripe)(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        return stripePromise;
    }
};
exports.default = getStripe;
