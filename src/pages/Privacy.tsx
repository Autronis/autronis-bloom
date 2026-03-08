// Layout is provided by App.tsx

const Privacy = () => (
  <section className="pt-16 pb-24 relative overflow-hidden">
    <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <p>Autronis respects your privacy and processes personal data in accordance with the General Data Protection Regulation (GDPR).</p>
        <h2 className="text-lg font-semibold text-foreground">What data do we collect?</h2>
        <p>We only collect the data you provide to us through our contact forms: name, email address, company name, and any additional information you share.</p>
        <h2 className="text-lg font-semibold text-foreground">What do we use your data for?</h2>
        <p>Your data is used exclusively to contact you about your inquiry and to improve our services.</p>
        <h2 className="text-lg font-semibold text-foreground">Retention</h2>
        <p>We do not retain your data longer than necessary for the purpose for which it was collected, with a maximum of 24 months.</p>
        <h2 className="text-lg font-semibold text-foreground">Your rights</h2>
        <p>You have the right to access, correct, and delete your personal data. Contact us at info@autronis.com.</p>
        <h2 className="text-lg font-semibold text-foreground">Contact</h2>
        <p>For questions about this privacy policy, please contact info@autronis.com.</p>
      </div>
    </div>
  </section>
);

export default Privacy;
