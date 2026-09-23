/**
 * Policy documents for LegalPage. Every word is Tatvyra's own, reproduced
 * verbatim: the Privacy Policy, and the Shipping, Refund & Cancellation,
 * Terms & Conditions and Disclaimer policies. Only the structure — the
 * sections, their headings and the numbered list — is added here.
 *
 * Block types: { text } is a paragraph, { type: 'head', text } a heading
 * within a policy, { type: 'list', items } a numbered list, and
 * { type: 'note', text } an aside set apart from the running text.
 */

export const PRIVACY_POLICY = {
  eyebrow: 'Policies',
  title: 'Privacy Policy',
  description: 'This privacy policy tells you how we use personal information collected at this site.',
  contactTitle: 'Questions about this policy',
  intro: [
    {
      text: 'Thank you for visiting our website. This privacy policy tells you how we use personal information collected at this site. Please read this privacy policy before using the site or submitting any personal information. By using the site, you are accepting the practices described in this privacy policy. These practices may be changed, but any changes will be posted, and changes will only apply to activities and information on a going forward, not retroactive basis. You are encouraged to review the privacy policy whenever you visit the site to make sure that you understand how any personal information you provide will be used.',
    },
    {
      type: 'note',
      text: 'the privacy practices set forth in this privacy policy are for this web site only. If you link to other web sites, please review the privacy policies posted at those sites.',
    },
  ],
  sections: [
    {
      id: 'collection-of-information',
      title: 'Collection of Information',
      blocks: [
        {
          text: 'We collect personally identifiable information, like names, postal addresses, email addresses, etc., when voluntarily submitted by our visitors. By submitting your email address, you are giving us permission to add you to our e-newsletter list.',
        },
      ],
    },
    {
      id: 'cookie-tracking-technology',
      title: 'Cookie/Tracking Technology',
      blocks: [
        {
          text: 'The Site may use cookie and tracking technology depending on the features offered. Cookie and tracking technology are useful for gathering information such as browser type and operating system, tracking the number of visitors to the Site, and understanding how visitors use the Site. Cookies can also help customize the Site for visitors. Personal information cannot be collected via cookies and other tracking technology, however, if you previously provided personally identifiable information, cookies may be tied to such information. Aggregate cookie and tracking information may be shared with third parties.',
        },
      ],
    },
    {
      id: 'distribution-of-information',
      title: 'Distribution of Information',
      blocks: [
        {
          text: 'We may share information with governmental agencies or other companies assisting us in fraud prevention or investigation. We may do so when:',
        },
        {
          type: 'list',
          items: [
            'Permitted or required by law; or,',
            'Trying to protect against or prevent actual or potential fraud or unauthorized transactions; or,',
            'Investigating fraud that has already taken place. The information is not provided to these companies for marketing purposes.',
          ],
        },
      ],
    },
    {
      id: 'commitment-to-data-security',
      title: 'Commitment to Data Security',
      blocks: [
        {
          text: 'Your personally identifiable information is kept secure. Only authorized employees, agents, and contractors (who have agreed to keep information secure and confidential) have access to this information. All emails and newsletters from this site allow you to opt out of further mailings.',
        },
        { text: 'We reserve the right to make changes to this policy. Any changes to this policy will be posted.' },
      ],
    },
  ],
}

export const OUR_POLICIES = {
  eyebrow: 'Shopping with Tatvyra',
  title: 'Our Policies',
  description:
    'Shipping, refund and cancellation, terms and conditions, and disclaimer for the Tatvyra website.',
  contactTitle: 'Questions about our policies',
  intro: [
    { text: 'The policies that apply to using the Tatvyra website and ordering from it, in one place.' },
  ],
  sections: [
    {
      id: 'shipping-policy',
      title: 'Shipping Policy',
      blocks: [
        {
          text:
            'Tatvyra aims to process and deliver orders safely and efficiently.',
        },
        { type: 'head', text: 'Order Processing' },
        {
          text:
            'Orders are processed after successful order confirmation and payment, where applicable.',
        },
        {
          text:
            'Processing and delivery times may vary depending on the delivery location, product availability, order volume, and other operational circumstances.',
        },
        { type: 'head', text: 'Delivery' },
        {
          text:
            'Orders are delivered to the address provided by the customer during checkout.',
        },
        {
          text:
            'Estimated delivery information, where applicable, will be communicated during the ordering process.',
        },
        {
          text:
            'Delivery timelines may be affected by circumstances such as public holidays, weather conditions, logistical disruptions, courier delays, or other factors beyond Tatvyra’s reasonable control.',
        },
        { type: 'head', text: 'Shipping Charges' },
        {
          text:
            'Applicable shipping charges, if any, will be displayed during the checkout process before the order is completed.',
        },
        { type: 'head', text: 'Order Tracking' },
        {
          text:
            'Where tracking is available, customers may receive shipment tracking information after their order has been dispatched.',
        },
        { type: 'head', text: 'Delivery Issues' },
        {
          text:
            'If an order is received in a damaged condition, is incorrect, or has not been received as expected, customers should contact Tatvyra with their order details so that the issue can be reviewed.',
        },
        { type: 'head', text: 'Incorrect Delivery Information' },
        {
          text:
            'Customers are responsible for providing accurate delivery information while placing an order. Tatvyra may not be responsible for delays resulting from incorrect or incomplete information provided by the customer.',
        },
        {
          text:
            'Tatvyra reserves the right to update this policy from time to time.',
        },
      ],
    },
    {
      id: 'refund-and-cancellation-policy',
      title: 'Refund & Cancellation Policy',
      blocks: [
        {
          text:
            'At Tatvyra, we want you to have a smooth shopping experience. If you have an issue with your order, please contact us and our team will assist you with the appropriate resolution.',
        },
        { type: 'head', text: 'Order Cancellation' },
        {
          text:
            'Orders may be cancelled before they are processed or dispatched. Once an order has been dispatched, cancellation may no longer be possible.',
        },
        {
          text:
            'Cancellation requests can be made by contacting Tatvyra with your order details.',
        },
        { type: 'head', text: 'Returns' },
        {
          text:
            'Returns may be accepted in cases where a product is delivered damaged, defective, incorrect, or otherwise does not meet the applicable order conditions.',
        },
        {
          text:
            'Products should remain unused and in their original packaging wherever applicable.',
        },
        {
          text:
            'Due to the nature of food and wellness products, certain products may not be eligible for return once opened or used.',
        },
        { type: 'head', text: 'Damaged or Incorrect Products' },
        {
          text:
            'If you receive a damaged, defective, or incorrect product, please contact Tatvyra with your order details and relevant photographs of the product and packaging.',
        },
        {
          text:
            'Our team will review the request and provide the appropriate resolution.',
        },
        { type: 'head', text: 'Refunds' },
        {
          text:
            'Where a refund is approved, it will be processed through the applicable payment method. The time taken for the refund to reflect in your account may vary depending on the payment provider or bank.',
        },
        {
          text:
            'Refund eligibility and applicable charges may vary depending on the circumstances of the order.',
        },
        {
          text:
            'Tatvyra reserves the right to update this policy from time to time.',
        },
      ],
    },
    {
      id: 'terms-and-conditions',
      title: 'Terms & Conditions',
      blocks: [
        {
          text:
            'Welcome to Tatvyra. By accessing this website or purchasing products through it, you agree to these Terms & Conditions.',
        },
        { type: 'head', text: 'Website Use' },
        {
          text:
            'The Tatvyra website is intended for lawful and personal use. Users must not misuse the website, interfere with its operation, attempt unauthorized access, or use the website for fraudulent or unlawful purposes.',
        },
        { type: 'head', text: 'Product Information' },
        {
          text:
            'Tatvyra makes reasonable efforts to ensure that product descriptions, images, ingredients, nutritional information, and other product details displayed on the website are accurate.',
        },
        {
          text:
            'Product appearance, packaging, labelling, and other visual details may vary from the images shown on the website.',
        },
        { type: 'head', text: 'Product Availability' },
        {
          text:
            'All products are subject to availability. Tatvyra reserves the right to modify product availability, discontinue products, or limit quantities where necessary.',
        },
        { type: 'head', text: 'Pricing and Orders' },
        {
          text:
            'Product prices displayed on the website may change from time to time.',
        },
        {
          text:
            'Applicable charges, taxes, and shipping costs, where applicable, will be displayed during the ordering process.',
        },
        {
          text:
            'Tatvyra reserves the right to cancel an order in circumstances such as product unavailability, payment issues, suspected fraudulent activity, or technical or pricing errors.',
        },
        { type: 'head', text: 'Intellectual Property' },
        {
          text:
            'All content available on the Tatvyra website, including text, images, graphics, logos, illustrations, product information, videos, and website design, belongs to Tatvyra or its respective licensors unless otherwise stated.',
        },
        {
          text:
            'Such content may not be copied, reproduced, modified, distributed, or commercially used without appropriate permission.',
        },
        { type: 'head', text: 'Third-Party Services' },
        {
          text:
            'Tatvyra may use third-party services such as payment providers, delivery partners, analytics services, and other technology providers.',
        },
        {
          text:
            'These services may operate under their own terms and policies.',
        },
        { type: 'head', text: 'Changes to These Terms' },
        {
          text:
            'Tatvyra reserves the right to modify these Terms & Conditions when necessary. Updated terms will be published on this website.',
        },
        { type: 'head', text: 'Contact' },
        {
          text:
            'For questions regarding these Terms & Conditions, please contact Tatvyra through the contact information provided on the website.',
        },
      ],
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      blocks: [
        {
          text:
            'The information provided on the Tatvyra website is intended for general informational and wellness purposes only.',
        },
        {
          text:
            'Tatvyra’s products and the information presented on this website are not intended to diagnose, treat, cure, or prevent any disease or medical condition.',
        },
        {
          text:
            'Product information, ingredients, nutritional information, and other details should be reviewed carefully before use. Customers should consider their individual circumstances and seek appropriate professional advice where necessary.',
        },
        {
          text:
            'Individual results and experiences may vary. No specific health or wellness outcome is guaranteed through the use of Tatvyra products.',
        },
        {
          text:
            'The information provided on this website should not be considered a substitute for professional medical advice, diagnosis, or treatment.',
        },
        {
          text:
            'Tatvyra makes reasonable efforts to keep website information accurate and up to date but does not guarantee that all information will always be complete, current, or free from errors.',
        },
        {
          text:
            'Tatvyra reserves the right to update website content and this disclaimer from time to time.',
        },
      ],
    },
  ],
}
