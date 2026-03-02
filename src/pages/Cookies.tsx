import Layout from "@/components/Layout";
import AmbientLight from "@/components/AmbientLight";

const Cookies = () => (
  <Layout>
    <section className="pt-16 pb-24 relative overflow-hidden">
      <AmbientLight />
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Cookiebeleid</h1>
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>Deze website maakt gebruik van cookies om uw ervaring te verbeteren en het gebruik van de website te analyseren.</p>
          <h2 className="text-lg font-semibold text-foreground">Wat zijn cookies?</h2>
          <p>Cookies zijn kleine tekstbestanden die op uw apparaat worden geplaatst wanneer u een website bezoekt. Ze helpen de website om uw voorkeuren te onthouden en het gebruik te analyseren.</p>
          <h2 className="text-lg font-semibold text-foreground">Welke cookies gebruiken wij?</h2>
          <p><strong className="text-foreground">Functionele cookies:</strong> Noodzakelijk voor het functioneren van de website (bijv. taalvoorkeur).</p>
          <p><strong className="text-foreground">Analytische cookies:</strong> Helpen ons begrijpen hoe bezoekers de website gebruiken (geanonimiseerd).</p>
          <h2 className="text-lg font-semibold text-foreground">Cookies beheren</h2>
          <p>U kunt cookies beheren of uitschakelen via uw browserinstellingen. Let op: het uitschakelen van cookies kan de functionaliteit van de website beperken.</p>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p>Vragen over ons cookiebeleid? Neem contact op via info@autronisgroup.com.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Cookies;
