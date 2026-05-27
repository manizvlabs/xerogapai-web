import { Breadcrumb } from '../components/ui/Breadcrumb';

const EFFECTIVE_DATE = 'April 21, 2026';
const LAST_UPDATED = 'May 7, 2026';
const COMPANY = 'VyaptIX';
const EMAIL = 'hello@vyaptix.com';
const WEBSITE = 'vyaptix.com';

export function TermsOfService() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#050D1A] border-b border-white/10">
        <div className="container-main py-3">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
        </div>
      </div>

      <section className="hero-luxury-bg text-white py-14 md:py-20">
        <div className="container-main text-center">
          <h1 className="font-heading font-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>Terms of Service</h1>
          <p className="text-white/85 text-lg">Effective date: {EFFECTIVE_DATE}</p>
          <p className="text-slate-300 text-sm mt-1">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#0A1628]">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <div className="p-5 bg-[#06CEFF]/8 border border-[#06CEFF]/20 rounded-xl mb-10">
              <p className="text-slate-200 text-sm">
                Please read these Terms of Service carefully before using VyaptIX's website or products. By accessing or using our services, you agree to be bound by these terms.
              </p>
            </div>

            <TermsSection title="1. Acceptance of Terms">
              <p>
                By accessing {WEBSITE} or using any {COMPANY} product (including the AI Review Generator at reviews.vyaptix.ai and AgentMitra), you agree to these Terms of Service and our Privacy Policy. If you are using our services on behalf of an organisation, you represent that you have the authority to bind that organisation to these terms.
              </p>
              <p>
                If you do not agree to these terms, you must not use our services.
              </p>
            </TermsSection>

            <TermsSection title="2. Description of Services">
              <p>{COMPANY} provides AI-powered business software products, currently including:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-200 mt-2">
                <li><strong className="text-white">AI Review Generator</strong> — a platform that helps businesses collect customer feedback and generate Google review text using artificial intelligence</li>
                <li><strong className="text-white">AgentMitra</strong> — a role-based service operations platform for managing agent workflows and client interactions</li>
              </ul>
              <p className="mt-3">
                We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice. We are not liable to you or any third party for any such modification, suspension, or discontinuation.
              </p>
            </TermsSection>

            <TermsSection title="3. Account Registration and Access">
              <ul className="list-disc pl-5 space-y-1 text-slate-200">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You are responsible for all activity that occurs under your account</li>
                <li>You must notify us immediately at {EMAIL} if you suspect unauthorised access to your account</li>
                <li>You must be at least 18 years old to use our services</li>
              </ul>
            </TermsSection>

            <TermsSection title="4. Acceptable Use">
              <p>You agree not to use our services to:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-200 mt-2">
                <li>Violate any applicable law or regulation</li>
                <li>Generate fake, fraudulent, or misleading reviews</li>
                <li>Infringe any intellectual property rights of {COMPANY} or any third party</li>
                <li>Upload or transmit viruses, malware, or any other malicious code</li>
                <li>Attempt to reverse engineer, decompile, or disassemble any part of our software</li>
                <li>Use our services in a way that disrupts, degrades, or impairs their operation</li>
                <li>Scrape, crawl, or extract data from our platforms without written permission</li>
                <li>Resell, sublicense, or otherwise commercialise our services without written authorisation</li>
              </ul>
              <p className="mt-3">
                We reserve the right to suspend or terminate your access if we determine, at our sole discretion, that you have violated these acceptable use standards.
              </p>
            </TermsSection>

            <TermsSection title="5. Intellectual Property">
              <p>
                All content, software, designs, trademarks, and other materials on our website and products are the property of {COMPANY} or our licensors. Nothing in these terms grants you any right, title, or interest in our intellectual property.
              </p>
              <p className="mt-3">
                You retain ownership of any content or data you submit to our services. By submitting content, you grant {COMPANY} a limited, non-exclusive licence to use that content solely to provide and improve our services.
              </p>
            </TermsSection>

            <TermsSection title="6. Google Review Compliance">
              <p>
                Our AI Review Generator is designed to assist real customers in articulating genuine experiences. You agree to use it only to help actual customers post honest reviews about real interactions with your business. You must not use our platform to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-200 mt-2">
                <li>Generate reviews from people who have not had a genuine interaction with your business</li>
                <li>Incentivise or coerce customers into posting reviews</li>
                <li>Violate Google's review policies or any applicable platform guidelines</li>
              </ul>
              <p className="mt-3">
                {COMPANY} is not responsible for any action taken by Google or other platforms in relation to reviews generated or posted through our service.
              </p>
            </TermsSection>

            <TermsSection title="7. Fees and Payment">
              <p>
                Some of our services are available on a paid subscription basis. Pricing, billing cycles, and payment terms are described at the point of purchase or in a separate order form or agreement. We reserve the right to change pricing with 30 days' notice to existing subscribers. All fees are exclusive of applicable taxes unless stated otherwise.
              </p>
              <p className="mt-3">
                Refunds are handled on a case-by-case basis. To request a refund, contact us at {EMAIL} within 14 days of your payment.
              </p>
            </TermsSection>

            <TermsSection title="8. Disclaimer of Warranties">
              <p>
                Our services are provided on an "as is" and "as available" basis without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p className="mt-3">
                {COMPANY} does not warrant that: (a) the services will be uninterrupted, error-free, or secure; (b) any defects will be corrected; (c) the services are free of viruses or other harmful components; or (d) the results obtained from using the services will be accurate or reliable.
              </p>
            </TermsSection>

            <TermsSection title="9. Limitation of Liability">
              <p>
                To the maximum extent permitted by applicable law, {COMPANY} and its directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill, arising out of or in connection with your use of our services, even if we have been advised of the possibility of such damages.
              </p>
              <p className="mt-3">
                Our total liability to you for any claim arising out of or relating to these terms or our services shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </TermsSection>

            <TermsSection title="10. Indemnification">
              <p>
                You agree to indemnify, defend, and hold harmless {COMPANY} and its officers, directors, employees, and agents from any claim, liability, damage, loss, or expense (including reasonable legal fees) arising from: (a) your use of our services; (b) your violation of these terms; or (c) your infringement of any third-party rights.
              </p>
            </TermsSection>

            <TermsSection title="11. Termination">
              <p>
                Either party may terminate these terms at any time. You may stop using our services at any time. We may suspend or terminate your access immediately if you violate these terms or if we are required to do so by law.
              </p>
              <p className="mt-3">
                On termination, your right to use our services ceases immediately. Provisions that by their nature should survive termination (including intellectual property, limitation of liability, and governing law) will survive.
              </p>
            </TermsSection>

            <TermsSection title="12. Governing Law and Disputes">
              <p>
                These terms are governed by the laws of India, without regard to its conflict of law provisions. Any dispute arising out of or relating to these terms or our services shall be subject to the exclusive jurisdiction of the courts located in India.
              </p>
              <p className="mt-3">
                Before initiating formal proceedings, we encourage you to contact us at {EMAIL} to resolve any dispute informally.
              </p>
            </TermsSection>

            <TermsSection title="13. Changes to These Terms">
              <p>
                We may update these Terms of Service from time to time. We will notify you of material changes by updating the effective date and, where appropriate, by email or a prominent notice on our website. Your continued use of our services after such changes constitutes acceptance of the updated terms.
              </p>
            </TermsSection>

            <TermsSection title="14. Contact Us">
              <p>Questions about these Terms of Service? Contact us:</p>
              <div className="mt-4 p-5 bg-white/5 rounded-xl border border-white/10">
                <p className="font-semibold text-white">{COMPANY}</p>
                <p className="text-slate-200 mt-1">
                  Email: <a href={`mailto:${EMAIL}`} className="text-secondary-400 hover:underline">{EMAIL}</a>
                </p>
                <p className="text-slate-200">Website: {WEBSITE}</p>
              </div>
            </TermsSection>
          </div>
        </div>
      </section>
    </>
  );
}

function TermsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-heading font-bold text-white mb-4 pb-2 border-b border-white/10">{title}</h2>
      <div className="text-slate-200 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
