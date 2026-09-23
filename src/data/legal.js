/**
 * Policy documents for LegalPage. Supplied wording is reproduced verbatim: the
 * whole Privacy Policy, and the Refund & Cancellation, Terms & Conditions and
 * Disclaimer copy. The Shipping Policy is placeholder until Tatvyra supplies
 * and approves the final text: it says what the policy will cover and makes no
 * commitment of its own — no timelines, charges, eligibility rules, addresses
 * or legal terms.
 *
 * Block types: { text } is a paragraph, { type: 'list', items } a numbered
 * list, { type: 'note', text } an aside set apart from the running text, and
 * { type: 'pending', text } marks copy still to be provided and approved.
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
    'Shipping, refund and cancellation, terms and conditions, and disclaimer for the Tatvyra website. Final policies will be provided and approved by Tatvyra.',
  contactTitle: 'Questions about our policies',
  intro: [
    { text: 'The policies that apply to using the Tatvyra website and ordering from it, in one place.' },
    {
      type: 'pending',
      text: '[The text on this page is a placeholder. Each policy will be replaced with final content provided and approved by Tatvyra.]',
    },
  ],
  sections: [
    {
      id: 'shipping-policy',
      title: 'Shipping Policy',
      blocks: [
        { text: 'Tatvyra’s shipping policy will explain how orders placed through this website are processed and delivered.' },
        {
          text: 'The final policy will cover order processing, delivery locations, delivery timelines, shipping charges, and order tracking.',
        },
        { type: 'pending', text: '[Final shipping policy to be provided and approved by Tatvyra.]' },
      ],
    },
    {
      id: 'refund-and-cancellation-policy',
      title: 'Refund & Cancellation Policy',
      blocks: [
        {
          text: 'Tatvyra’s refund and cancellation policy will explain the conditions under which customers may cancel an order, request a return, or receive a refund.',
        },
        {
          text: 'The final policy will include eligibility requirements, applicable timelines, procedures for damaged or incorrect orders, and refund processing information.',
        },
        { type: 'pending', text: '[Final refund and cancellation policy to be provided and approved by Tatvyra.]' },
      ],
    },
    {
      id: 'terms-and-conditions',
      title: 'Terms & Conditions',
      blocks: [
        {
          text: 'These Terms & Conditions govern the use of the Tatvyra website and the purchase of products through the website.',
        },
        {
          text: 'The final terms will cover website usage, product information, pricing, orders, payments, promotions, cancellations, returns, and other applicable conditions.',
        },
        { type: 'pending', text: '[Final Terms & Conditions to be provided and approved by Tatvyra.]' },
      ],
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer',
      blocks: [
        {
          text: 'The information provided on the Tatvyra website is intended for general informational and wellness purposes.',
        },
        {
          text: 'Product information, ingredients, usage recommendations, and other content should be read together with the information provided on the product packaging.',
        },
        {
          text: 'The final disclaimer, including any applicable product, health, wellness, and regulatory statements, will be provided and approved by Tatvyra.',
        },
        { type: 'pending', text: '[Final disclaimer to be provided and approved by Tatvyra.]' },
      ],
    },
  ],
}
