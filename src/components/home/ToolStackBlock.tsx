const ToolStackBlock = () => {
  return (
    <section className="py-6 sm:py-10 border-t border-border relative overflow-hidden">
      {/* Static background glow - no continuous animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 text-center max-w-md relative z-10">
        <p className="text-[10px] font-semibold text-primary mb-1.5 tracking-widest uppercase">
          Integraties
        </p>
        <h2 className="text-lg sm:text-xl font-bold mb-1.5">
          Werkt met uw huidige stack
        </h2>
        <p className="text-xs text-muted-foreground mb-2">
          We koppelen CRM, finance, operations en maatwerksystemen.
        </p>
        <p className="text-[11px] text-muted-foreground/70 italic">
          Heeft uw systeem een API? Dan kunnen wij integreren.
        </p>
      </div>
    </section>
  );
};

export default ToolStackBlock;
