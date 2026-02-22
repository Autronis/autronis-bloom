import Layout from "@/components/Layout";

const Privacy = () => (
  <Layout>
    <section className="pt-16 pb-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Privacybeleid</h1>
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>AutronisGroup respecteert uw privacy en verwerkt persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).</p>
          <h2 className="text-lg font-semibold text-foreground">Welke gegevens verzamelen wij?</h2>
          <p>Wij verzamelen alleen de gegevens die u zelf aan ons verstrekt via onze contactformulieren: naam, emailadres, bedrijfsnaam, en eventuele aanvullende informatie die u deelt.</p>
          <h2 className="text-lg font-semibold text-foreground">Waarvoor gebruiken wij uw gegevens?</h2>
          <p>Uw gegevens worden uitsluitend gebruikt om contact met u op te nemen over uw aanvraag, en om onze dienstverlening te verbeteren.</p>
          <h2 className="text-lg font-semibold text-foreground">Bewaring</h2>
          <p>Wij bewaren uw gegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld, met een maximum van 24 maanden.</p>
          <h2 className="text-lg font-semibold text-foreground">Uw rechten</h2>
          <p>U heeft recht op inzage, correctie en verwijdering van uw persoonsgegevens. Neem contact op via info@autronisgroup.com.</p>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p>Voor vragen over dit privacybeleid kunt u contact opnemen via info@autronisgroup.com.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Privacy;
