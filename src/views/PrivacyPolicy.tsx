import { Section } from '../components/layout/Section';

const EFFECTIVE_DATE = 'April 21, 2026';
const LAST_UPDATED = 'May 7, 2026';
const COMPANY = 'VyaptIX';
const EMAIL = 'hello@vyaptix.com';
const WEBSITE = 'vyaptix.com';

export function PrivacyPolicy() {
  return (
    <>
<section className="hero-luxury-bg text-white py-14 md:py-20">
        <div className="container-main text-center">
          <h1 className="font-playfair italic font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>Privacy Policy</h1>
          <p className="text-white/85 text-lg">Effective date: {EFFECTIVE_DATE}</p>
          <p className="text-slate-300 text-sm mt-1">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto prose-vyaptix">
          <PolicySection title="1. Who We Are">
            <p>
              {COMPANY} ("we", "our", or "us") operates {WEBSITE} and the products available through it, including the AI Review Generator platform (reviews.vyaptix.ai) and AgentMitra. We are incorporated in India. This Privacy Policy explains how we collect, use, store, and protect personal information when you use our website or products.
            </p>
          </PolicySection>

          <PolicySection title="2. Information We Collect">
            <h4 className="font-semibold text-text mt-4 mb-2">Information you provide directly</h4>
            <ul className="list-disc pl-5 space-y-1 text-text-secondary">
              <li>Name, email address, phone number, and company name submitted through contact or enquiry forms</li>
              <li>Messages and files you send us via our contact form</li>
              <li>Account information when you register for our products</li>
            </ul>
            <h4 className="font-semibold text-text mt-4 mb-2">Information collected automatically</h4>
            <ul className="list-disc pl-5 space-y-1 text-text-secondary">
              <li>Pages visited, time spent, and navigation paths on our website (via PostHog analytics)</li>
              <li>Browser type, operating system, and device information</li>
              <li>IP address and approximate geographic location</li>
              <li>Referring URLs and search terms</li>
            </ul>
            <h4 className="font-semibold text-text mt-4 mb-2">Information from product usage</h4>
            <ul className="list-disc pl-5 space-y-1 text-text-secondary">
              <li>For the AI Review Generator: customer feedback text submitted through your business's review flow</li>
              <li>For AgentMitra: client records, workflow data, and interaction logs entered by authorised users</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-1 text-text-secondary">
              <li>To respond to your enquiries and schedule demos</li>
              <li>To deliver and maintain our products and services</li>
              <li>To send transactional communications (account setup, product updates)</li>
              <li>To understand how our website and products are used and improve them</li>
              <li>To comply with applicable laws and regulations</li>
              <li>To contact you about relevant product updates or offers, where you have consented</li>
            </ul>
            <p className="mt-3 text-text-secondary">
              We do not sell your personal data to third parties. We do not use your data for automated decision-making that produces legal or similarly significant effects.
            </p>
          </PolicySection>

          <PolicySection title="4. Third-Party Services">
            <p className="text-text-secondary mb-3">We use the following third-party services that may process your data on our behalf:</p>
            <div className="space-y-3">
              {[
                { name: 'Zoho CRM', purpose: 'Contact form submissions and sales pipeline management. Data is stored on Zoho\'s servers. See Zoho\'s privacy policy at zoho.com/privacy.html.' },
                { name: 'PostHog', purpose: 'Website analytics (consent-gated). PostHog is only initialised after you accept cookies. No personally identifiable data is sent unless you submit a form. See posthog.com/privacy.' },
                { name: 'Calendly', purpose: 'Demo booking and meeting scheduling. When you book a meeting via our site, Calendly processes your name, email, and timezone. See calendly.com/privacy.' },
                { name: 'Vercel', purpose: 'Website hosting and serverless functions. Vercel processes request metadata as part of serving the site. See vercel.com/legal/privacy-policy.' },
                { name: 'Google', purpose: 'Our AI Review Generator product interfaces with Google My Business. Customer review text submitted through the product flows to Google\'s platform as directed by the end user.' },
              ].map((service) => (
                <div key={service.name} className="p-4 bg-background rounded-lg border border-border-light">
                  <p className="font-semibold text-text mb-1">{service.name}</p>
                  <p className="text-sm text-text-secondary">{service.purpose}</p>
                </div>
              ))}
            </div>
          </PolicySection>

          <PolicySection title="5. Cookies">
            <p className="text-text-secondary">
              Our website uses cookies and similar tracking technologies for analytics and to remember your preferences. These include:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-text-secondary">
              <li><strong>Essential cookies</strong> — required for basic site functionality</li>
              <li><strong>Analytics cookies</strong> — used by PostHog to understand usage patterns</li>
            </ul>
            <p className="mt-3 text-text-secondary">
              You can disable cookies in your browser settings. Disabling analytics cookies does not affect your ability to use the site.
            </p>
          </PolicySection>

          <PolicySection title="6. Data Retention">
            <p className="text-text-secondary">
              We retain contact form data in Zoho CRM for as long as it is relevant to our business relationship with you, or as required by applicable law. Analytics data is retained in accordance with PostHog's retention settings. You can request deletion of your data at any time by contacting us at {EMAIL}.
            </p>
          </PolicySection>

          <PolicySection title="7. Your Rights">
            <p className="text-text-secondary mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 text-text-secondary">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict certain processing</li>
              <li>Withdraw consent at any time (where processing is based on consent)</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="mt-3 text-text-secondary">
              To exercise any of these rights, email us at <a href={`mailto:${EMAIL}`} className="text-primary-500 hover:underline">{EMAIL}</a>. We will respond within 30 days.
            </p>
          </PolicySection>

          <PolicySection title="8. Data Security">
            <p className="text-text-secondary">
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. These include HTTPS encryption for all data in transit and restricted access to personal data within our team. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </PolicySection>

          <PolicySection title="9. Children's Privacy">
            <p className="text-text-secondary">
              Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If we become aware that we have inadvertently collected such data, we will delete it promptly.
            </p>
          </PolicySection>

          <PolicySection title="10. International Data Transfers">
            <p className="text-text-secondary">
              {COMPANY} is based in India. If you are accessing our services from outside India, your data may be transferred to and processed in India or in the countries where our third-party providers operate. By using our services, you consent to this transfer.
            </p>
          </PolicySection>

          <PolicySection title="11. Changes to This Policy">
            <p className="text-text-secondary">
              We may update this Privacy Policy from time to time. When we do, we will update the effective date at the top of this page. Material changes will be communicated via email (if we have your contact details) or via a notice on our website. Your continued use of our services after any changes constitutes your acceptance of the revised policy.
            </p>
          </PolicySection>

          <PolicySection title="12. Contact Us">
            <p className="text-text-secondary">
              If you have any questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="mt-4 p-5 bg-background rounded-xl border border-border-light">
              <p className="font-semibold text-text">{COMPANY}</p>
              <p className="text-text-secondary mt-1">
                Email: <a href={`mailto:${EMAIL}`} className="text-primary-500 hover:underline">{EMAIL}</a>
              </p>
              <p className="text-text-secondary">Website: {WEBSITE}</p>
            </div>
          </PolicySection>
        </div>
      </Section>
    </>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-text mb-4 pb-2 border-b border-border-light">{title}</h2>
      <div className="text-text-secondary leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
