// Layout is provided by App.tsx

const Cookies = () => (
  <section className="pt-16 pb-24 relative overflow-hidden">
    <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <p>This website uses cookies to improve your experience and analyze website usage.</p>
        <h2 className="text-lg font-semibold text-foreground">What are cookies?</h2>
        <p>Cookies are small text files placed on your device when you visit a website. They help the website remember your preferences and analyze usage.</p>
        <h2 className="text-lg font-semibold text-foreground">Which cookies do we use?</h2>
        <p><strong className="text-foreground">Functional cookies:</strong> Necessary for the website to function (e.g., language preference).</p>
        <p><strong className="text-foreground">Analytical cookies:</strong> Help us understand how visitors use the website (anonymized).</p>
        <h2 className="text-lg font-semibold text-foreground">Managing cookies</h2>
        <p>You can manage or disable cookies through your browser settings. Please note: disabling cookies may limit website functionality.</p>
        <h2 className="text-lg font-semibold text-foreground">Contact</h2>
        <p>Questions about our cookie policy? Contact us at info@autronis.com.</p>
      </div>
    </div>
  </section>
);

export default Cookies;
