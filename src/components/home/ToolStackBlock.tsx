const ToolStackBlock = () => {
  return (
    <section className="py-12 sm:py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
        <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
          Integraties
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Werkt met uw huidige stack
        </h2>
        <p className="text-muted-foreground mb-4">
          We koppelen CRM, finance, operations en maatwerksystemen.
        </p>
        <p className="text-sm text-muted-foreground/70 italic">
          Heeft uw systeem een API? Dan kunnen wij integreren.
        </p>
      </div>
    </section>
  );
};

export default ToolStackBlock;
