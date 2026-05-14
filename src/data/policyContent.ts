import type { PageSeo } from '../types';

export const SUPPORT_EMAIL = 'support@thefifthstone.com';

export type PolicyRoute =
  | 'shipping-policy'
  | 'return-refund-policy'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'contact'
  | 'faq';

export interface PolicyPageContent {
  route: PolicyRoute;
  seo: PageSeo;
  title: string;
  intro: string;
  lastUpdated?: string;
  sections: PolicySection[];
  showContactForm?: boolean;
}

export interface PolicySection {
  heading: string;
  blocks: PolicyBlock[];
}

export type PolicyBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'email'; email: string };

export const policyPages: Record<PolicyRoute, PolicyPageContent> = {
  'shipping-policy': {
    route: 'shipping-policy',
    seo: {
      title: 'Shipping Policy | The Fifth Stone',
      description:
        'Learn about The Fifth Stone order processing, shipping estimates, tracking, customs, and delivery information.',
    },
    title: 'Shipping Policy',
    intro:
      'At The Fifth Stone, every piece is prepared with care before it begins its journey to you. Please read our shipping policy carefully before placing your order.',
    sections: [
      {
        heading: 'Order Processing',
        blocks: [
          {
            type: 'paragraph',
            text: 'Orders are usually processed within 2–5 business days after payment confirmation. During peak seasons, product launches, holidays, or unexpected delays, processing may take longer.',
          },
          {
            type: 'paragraph',
            text: 'Once your order has been shipped, you will receive a confirmation email with tracking information if tracking is available for your destination.',
          },
        ],
      },
      {
        heading: 'Shipping Destinations',
        blocks: [
          {
            type: 'paragraph',
            text: 'We aim to ship to selected international destinations. Available shipping regions may vary depending on logistics conditions, local regulations, and carrier availability.',
          },
          {
            type: 'paragraph',
            text: 'If your country or region is not available at checkout, we may not currently be able to ship there.',
          },
        ],
      },
      {
        heading: 'Estimated Delivery Time',
        blocks: [
          {
            type: 'paragraph',
            text: 'Estimated delivery times vary depending on the destination, carrier, customs process, and local delivery conditions.',
          },
          {
            type: 'paragraph',
            text: 'The estimated delivery time shown at checkout or in your shipping confirmation is not a guaranteed arrival date. Delays may occur due to customs inspections, weather, public holidays, carrier disruptions, or other factors outside our control.',
          },
        ],
      },
      {
        heading: 'Shipping Fees',
        blocks: [
          {
            type: 'paragraph',
            text: 'Shipping fees, if applicable, will be displayed at checkout before you complete your order. Promotional free shipping offers may be available from time to time and may be subject to specific conditions.',
          },
        ],
      },
      {
        heading: 'Customs, Duties, and Taxes',
        blocks: [
          {
            type: 'paragraph',
            text: 'International orders may be subject to customs duties, import taxes, VAT, or other fees charged by the destination country or region.',
          },
          {
            type: 'paragraph',
            text: 'These charges are not included in the product price or shipping fee unless clearly stated at checkout. The customer is responsible for any applicable customs duties, taxes, or import fees required by local authorities.',
          },
        ],
      },
      {
        heading: 'Incorrect Shipping Information',
        blocks: [
          {
            type: 'paragraph',
            text: 'Please make sure your shipping address is complete and accurate before placing your order.',
          },
          {
            type: 'paragraph',
            text: 'We are not responsible for delays, failed deliveries, or lost packages caused by incorrect or incomplete shipping information provided by the customer.',
          },
          {
            type: 'paragraph',
            text: `If you notice an error in your shipping address, please contact us as soon as possible at ${SUPPORT_EMAIL}. We will do our best to help, but we cannot guarantee changes once the order has been processed or shipped.`,
          },
        ],
      },
      {
        heading: 'Lost or Delayed Packages',
        blocks: [
          {
            type: 'paragraph',
            text: 'If your package appears to be delayed, please first check the tracking information and contact the local carrier when applicable.',
          },
          {
            type: 'paragraph',
            text: `If you still need help, contact us at ${SUPPORT_EMAIL} with your order number. We will assist you in reviewing the situation, but final delivery updates may depend on the carrier.`,
          },
        ],
      },
      {
        heading: 'Contact Us',
        blocks: [
          { type: 'paragraph', text: 'For shipping questions, please contact us at:' },
          { type: 'email', email: SUPPORT_EMAIL },
        ],
      },
    ],
  },
  'return-refund-policy': {
    route: 'return-refund-policy',
    seo: {
      title: 'Return & Refund Policy | The Fifth Stone',
      description: 'Read The Fifth Stone return, refund, exchange, and damaged item policy.',
    },
    title: 'Return & Refund Policy',
    intro:
      'We want you to feel confident when purchasing from The Fifth Stone. Please review our return and refund policy before placing your order.',
    sections: [
      {
        heading: 'Return Window',
        blocks: [
          { type: 'paragraph', text: 'We accept return requests within 14 days after the order is delivered.' },
          {
            type: 'paragraph',
            text: 'To be eligible for a return, the item must be unused, unworn, undamaged, and returned in its original packaging with all included materials.',
          },
        ],
      },
      {
        heading: 'Non-Returnable Items',
        blocks: [
          {
            type: 'paragraph',
            text: 'For hygiene and quality reasons, we may not accept returns for items that have been worn, damaged, altered, or returned without their original packaging.',
          },
          {
            type: 'paragraph',
            text: 'Customized, personalized, final sale, or promotional items may not be eligible for return unless they arrive damaged or defective.',
          },
        ],
      },
      {
        heading: 'How to Request a Return',
        blocks: [
          {
            type: 'paragraph',
            text: `To request a return, please contact us at ${SUPPORT_EMAIL} with the following information:`,
          },
          {
            type: 'list',
            items: [
              'Your order number',
              'The email address used for the order',
              'A brief explanation of the reason for return',
              'Photos or videos if the item arrived damaged or defective',
            ],
          },
          {
            type: 'paragraph',
            text: 'Please do not send items back without contacting us first. Returns sent without approval may not be accepted.',
          },
        ],
      },
      {
        heading: 'Return Shipping',
        blocks: [
          {
            type: 'paragraph',
            text: 'Unless the item arrives damaged, defective, or incorrect due to our error, customers are responsible for return shipping costs.',
          },
          {
            type: 'paragraph',
            text: 'Original shipping fees, customs duties, taxes, and other import-related charges are non-refundable unless required by law.',
          },
        ],
      },
      {
        heading: 'Refunds',
        blocks: [
          {
            type: 'paragraph',
            text: 'Once we receive and inspect your returned item, we will notify you whether the refund is approved.',
          },
          {
            type: 'paragraph',
            text: 'If approved, the refund will be issued to your original payment method. Please note that payment providers and banks may require additional time to process the refund.',
          },
        ],
      },
      {
        heading: 'Damaged, Defective, or Incorrect Items',
        blocks: [
          {
            type: 'paragraph',
            text: `If your item arrives damaged, defective, or incorrect, please contact us within 7 days of delivery at ${SUPPORT_EMAIL}.`,
          },
          {
            type: 'paragraph',
            text: 'Please include your order number and clear photos or videos of the issue. We will review the case and offer a suitable solution, which may include a replacement, refund, or store credit depending on the situation.',
          },
        ],
      },
      {
        heading: 'Exchanges',
        blocks: [
          {
            type: 'paragraph',
            text: 'We may offer exchanges when stock is available. If the item you want is unavailable, we may provide a refund or store credit after the returned item is approved.',
          },
        ],
      },
      {
        heading: 'Color and Natural Variation',
        blocks: [
          {
            type: 'paragraph',
            text: 'Some pieces may show slight variations in color, texture, shine, or appearance due to lighting, screen settings, photography, and material characteristics. These small variations are not considered defects.',
          },
        ],
      },
      {
        heading: 'Contact Us',
        blocks: [
          { type: 'paragraph', text: 'For return or refund questions, please contact:' },
          { type: 'email', email: SUPPORT_EMAIL },
        ],
      },
    ],
  },
  'privacy-policy': {
    route: 'privacy-policy',
    seo: {
      title: 'Privacy Policy | The Fifth Stone',
      description: 'Learn how The Fifth Stone collects, uses, protects, and manages customer information.',
    },
    title: 'Privacy Policy',
    intro:
      'Your privacy matters to us. This Privacy Policy explains how The Fifth Stone collects, uses, and protects your information when you visit our website or place an order.',
    lastUpdated: 'Last updated: May 15, 2026',
    sections: [
      {
        heading: 'Information We Collect',
        blocks: [
          {
            type: 'paragraph',
            text: 'We may collect information you provide directly to us, including your name, email address, shipping address, billing information, order details, and messages you send through our contact forms or customer support channels.',
          },
          {
            type: 'paragraph',
            text: 'We may also collect certain technical information automatically, such as your IP address, browser type, device information, pages viewed, and website interaction data.',
          },
        ],
      },
      {
        heading: 'How We Use Your Information',
        blocks: [
          { type: 'paragraph', text: 'We use your information to:' },
          {
            type: 'list',
            items: [
              'Process and fulfill orders',
              'Provide customer support',
              'Send order confirmations and shipping updates',
              'Improve our website, products, and services',
              'Prevent fraud and protect website security',
              'Comply with legal and regulatory obligations',
              'Send marketing emails only when you have chosen to receive them',
            ],
          },
        ],
      },
      {
        heading: 'Payment Information',
        blocks: [
          {
            type: 'paragraph',
            text: 'Payments are processed by secure third-party payment providers such as PayPal.',
          },
        ],
      },
      {
        heading: 'Cookies and Tracking Technologies',
        blocks: [
          {
            type: 'paragraph',
            text: 'Our website may use cookies and similar technologies to improve your browsing experience, analyze website traffic, remember preferences, and support essential website functions.',
          },
          {
            type: 'paragraph',
            text: 'You can adjust your browser settings to refuse or delete cookies. However, some parts of the website may not function properly without certain cookies.',
          },
        ],
      },
      {
        heading: 'Marketing Communications',
        blocks: [
          {
            type: 'paragraph',
            text: 'If you subscribe to our email list, we may send you updates, product news, offers, or brand stories.',
          },
          {
            type: 'paragraph',
            text: `You can unsubscribe from marketing emails at any time by clicking the unsubscribe link in the email or contacting us at ${SUPPORT_EMAIL}.`,
          },
        ],
      },
      {
        heading: 'Sharing Your Information',
        blocks: [
          { type: 'paragraph', text: 'We do not sell your personal information.' },
          {
            type: 'paragraph',
            text: 'We may share necessary information with trusted service providers who help us operate our website, process payments, fulfill orders, deliver packages, provide customer support, analyze website performance, or comply with legal requirements.',
          },
        ],
      },
      {
        heading: 'Data Security',
        blocks: [
          {
            type: 'paragraph',
            text: 'We take reasonable measures to protect your information from unauthorized access, misuse, loss, or disclosure.',
          },
          {
            type: 'paragraph',
            text: 'However, no method of online transmission or electronic storage is completely secure, and we cannot guarantee absolute security.',
          },
        ],
      },
      {
        heading: 'Your Rights',
        blocks: [
          {
            type: 'paragraph',
            text: 'Depending on your location, you may have the right to access, correct, delete, or restrict the use of your personal information.',
          },
          {
            type: 'paragraph',
            text: `To make a privacy-related request, please contact us at ${SUPPORT_EMAIL}.`,
          },
        ],
      },
      {
        heading: 'Third-Party Links',
        blocks: [
          {
            type: 'paragraph',
            text: 'Our website may contain links to third-party websites or services. We are not responsible for the privacy practices, content, or policies of those third parties.',
          },
        ],
      },
      {
        heading: 'Contact Us',
        blocks: [
          { type: 'paragraph', text: 'For privacy questions, please contact:' },
          { type: 'email', email: SUPPORT_EMAIL },
        ],
      },
    ],
  },
  'terms-of-service': {
    route: 'terms-of-service',
    seo: {
      title: 'Terms of Service | The Fifth Stone',
      description: 'Review the terms and conditions for using The Fifth Stone website and purchasing products.',
    },
    title: 'Terms of Service',
    intro:
      'Welcome to The Fifth Stone. By accessing our website or purchasing from us, you agree to the following Terms of Service. Please read them carefully.',
    lastUpdated: 'Last updated: May 15, 2026',
    sections: [
      {
        heading: 'Overview',
        blocks: [
          {
            type: 'paragraph',
            text: 'These Terms of Service apply to your use of our website, products, content, and services. If you do not agree to these terms, please do not use our website or place an order.',
          },
        ],
      },
      {
        heading: 'Eligibility',
        blocks: [
          {
            type: 'paragraph',
            text: 'By using this website, you confirm that you are legally able to enter into a binding agreement in your location, or that you are using the website with permission from a parent or legal guardian where required.',
          },
        ],
      },
      {
        heading: 'Products and Descriptions',
        blocks: [
          {
            type: 'paragraph',
            text: 'We do our best to display product images, colors, descriptions, materials, and details as accurately as possible.',
          },
          {
            type: 'paragraph',
            text: 'However, product appearance may vary slightly due to lighting, screen settings, photography, and natural or handmade characteristics. We do not guarantee that your device display will show every color or detail perfectly.',
          },
        ],
      },
      {
        heading: 'Orders',
        blocks: [
          {
            type: 'paragraph',
            text: 'When you place an order, you agree that all information provided is accurate, complete, and current.',
          },
          {
            type: 'paragraph',
            text: 'We reserve the right to refuse, cancel, or limit any order if we suspect fraud, unauthorized activity, pricing errors, inventory issues, or violation of these Terms.',
          },
        ],
      },
      {
        heading: 'Pricing and Availability',
        blocks: [
          {
            type: 'paragraph',
            text: 'Product prices, availability, promotions, and shipping options may change without notice.',
          },
          {
            type: 'paragraph',
            text: 'We reserve the right to correct errors, inaccuracies, or omissions at any time, including after an order has been submitted.',
          },
        ],
      },
      {
        heading: 'Payment',
        blocks: [
          {
            type: 'paragraph',
            text: 'Payments are processed by secure third-party payment providers such as PayPal.',
          },
        ],
      },
      {
        heading: 'Shipping, Returns, and Refunds',
        blocks: [
          {
            type: 'paragraph',
            text: 'Shipping, returns, refunds, exchanges, customs duties, and delivery-related issues are governed by our Shipping Policy and Return & Refund Policy.',
          },
          { type: 'paragraph', text: 'Please review those policies before placing an order.' },
        ],
      },
      {
        heading: 'Intellectual Property',
        blocks: [
          {
            type: 'paragraph',
            text: 'All content on this website, including text, images, graphics, logos, product names, brand concepts, page design, and visual elements, belongs to The Fifth Stone or its content providers unless otherwise stated.',
          },
          {
            type: 'paragraph',
            text: 'You may not copy, reproduce, distribute, modify, or use our content for commercial purposes without written permission.',
          },
        ],
      },
      {
        heading: 'Brand and Symbolic Meaning',
        blocks: [
          {
            type: 'paragraph',
            text: 'The Fifth Stone is inspired by Eastern mythology and symbolic storytelling. Our products are designed as jewelry and personal accessories.',
          },
          {
            type: 'paragraph',
            text: 'Any references to repair, protection, rebirth, or symbolic meaning are artistic and emotional expressions. They are not medical, spiritual, religious, or therapeutic guarantees.',
          },
        ],
      },
      {
        heading: 'User Conduct',
        blocks: [
          {
            type: 'paragraph',
            text: 'You agree not to misuse our website, interfere with its security, attempt unauthorized access, upload harmful code, use the site for illegal purposes, or violate the rights of others.',
          },
        ],
      },
      {
        heading: 'Limitation of Liability',
        blocks: [
          {
            type: 'paragraph',
            text: 'To the fullest extent permitted by law, The Fifth Stone shall not be liable for indirect, incidental, special, or consequential damages arising from your use of our website, products, or services.',
          },
        ],
      },
      {
        heading: 'Changes to These Terms',
        blocks: [
          {
            type: 'paragraph',
            text: 'We may update these Terms of Service from time to time. Changes will be posted on this page with an updated date.',
          },
          {
            type: 'paragraph',
            text: 'Your continued use of the website after changes are posted means you accept the revised terms.',
          },
        ],
      },
      {
        heading: 'Contact Us',
        blocks: [
          { type: 'paragraph', text: 'For questions about these Terms, please contact:' },
          { type: 'email', email: SUPPORT_EMAIL },
        ],
      },
    ],
  },
  contact: {
    route: 'contact',
    seo: {
      title: 'Contact Us | The Fifth Stone',
      description:
        'Contact The Fifth Stone for order support, shipping questions, returns, collaborations, or general inquiries.',
    },
    title: 'Contact Us',
    intro: 'Need help with your order, shipping, returns, or a general question? We are here to help.',
    showContactForm: true,
    sections: [
      {
        heading: 'Customer Support',
        blocks: [
          { type: 'paragraph', text: 'For customer support, please email us at:' },
          { type: 'email', email: SUPPORT_EMAIL },
          { type: 'paragraph', text: 'Please include your order number if your message is about an existing order.' },
        ],
      },
      {
        heading: 'Response Time',
        blocks: [
          {
            type: 'paragraph',
            text: 'We usually respond within 1–3 business days. During holidays, product launches, or high-volume periods, replies may take longer.',
          },
        ],
      },
      {
        heading: 'Before You Contact Us',
        blocks: [
          { type: 'paragraph', text: 'To help us assist you faster, please include:' },
          {
            type: 'list',
            items: [
              'Your order number',
              'The email address used for your order',
              'A clear description of your question or issue',
              'Photos or videos if your item arrived damaged, defective, or incorrect',
            ],
          },
        ],
      },
      {
        heading: 'Business and Collaboration Inquiries',
        blocks: [
          { type: 'paragraph', text: 'For collaboration, press, or business inquiries, please contact us at:' },
          { type: 'email', email: SUPPORT_EMAIL },
        ],
      },
      {
        heading: 'A Note from The Fifth Stone',
        blocks: [
          {
            type: 'paragraph',
            text: 'The Fifth Stone was created for those who are drawn to stories of repair, protection, and rebirth. Whether you are asking about an order or sharing your connection with the piece, we are glad to hear from you.',
          },
        ],
      },
    ],
  },
  faq: {
    route: 'faq',
    seo: {
      title: 'FAQ | The Fifth Stone',
      description:
        'Frequently asked questions about The Fifth Stone products, shipping, returns, materials, and symbolic meaning.',
    },
    title: 'Frequently Asked Questions',
    intro:
      'Here are answers to common questions about The Fifth Stone, our products, shipping, returns, and symbolic design.',
    sections: [
      {
        heading: 'What is The Fifth Stone?',
        blocks: [
          {
            type: 'paragraph',
            text: 'The Fifth Stone is a jewelry brand inspired by the Eastern myth of mending the sky. Our pieces are designed around the idea of repair, protection, and rebirth — a symbolic reminder for those moving through change.',
          },
        ],
      },
      {
        heading: 'Is the necklace based on a real myth?',
        blocks: [
          {
            type: 'paragraph',
            text: 'Yes. The concept is inspired by the myth of Nüwa mending the sky with five-colored stones. The Fifth Stone imagines the final stone as something left for those still seeking their own form of repair and protection.',
          },
        ],
      },
      {
        heading: 'Does the necklace have healing powers?',
        blocks: [
          {
            type: 'paragraph',
            text: 'No. The Fifth Stone is a symbolic jewelry piece. Any references to mending, protection, or rebirth are artistic and emotional expressions, not medical, spiritual, or therapeutic claims.',
          },
        ],
      },
      {
        heading: 'Will the product look exactly like the photos?',
        blocks: [
          {
            type: 'paragraph',
            text: 'We try to show each piece as accurately as possible. However, slight differences may appear due to lighting, screen settings, photography, and natural variation in materials.',
          },
        ],
      },
      {
        heading: 'How long does shipping take?',
        blocks: [
          {
            type: 'paragraph',
            text: 'Shipping time depends on your destination, carrier, customs process, and local delivery conditions. Please check our Shipping Policy for more details.',
          },
        ],
      },
      {
        heading: 'Can I return my order?',
        blocks: [
          {
            type: 'paragraph',
            text: 'We accept eligible return requests within 14 days after delivery. Items must be unused, unworn, undamaged, and returned in their original packaging. Please review our Return & Refund Policy before requesting a return.',
          },
        ],
      },
      {
        heading: 'What should I do if my item arrives damaged?',
        blocks: [
          {
            type: 'paragraph',
            text: `Please contact us within 7 days of delivery at ${SUPPORT_EMAIL}. Include your order number and clear photos or videos of the issue so we can review your case.`,
          },
        ],
      },
      {
        heading: 'Do you ship internationally?',
        blocks: [
          {
            type: 'paragraph',
            text: 'We aim to ship to selected international destinations. Available regions may vary depending on logistics conditions and carrier availability.',
          },
        ],
      },
      {
        heading: 'How can I contact customer support?',
        blocks: [
          {
            type: 'paragraph',
            text: `You can contact us at ${SUPPORT_EMAIL}. Please include your order number if your message is about an existing order.`,
          },
        ],
      },
      {
        heading: 'Can I wear The Fifth Stone every day?',
        blocks: [
          {
            type: 'paragraph',
            text: 'The necklace is designed as a wearable jewelry piece, but we recommend keeping it away from water, perfume, chemicals, sweat, and rough impact to help preserve its appearance.',
          },
        ],
      },
    ],
  },
};
