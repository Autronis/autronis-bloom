const ToolStackBlock = () => {
  return (
    <section className="py-6 sm:py-10 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 text-center max-w-md relative z-10">
        <p className="text-[10px] font-semibold text-primary mb-1.5 tracking-widest uppercase">
          Integrations
        </p>
        <h2 className="text-lg sm:text-xl font-bold mb-1.5">
          Works with your current stack
        </h2>
        <p className="text-xs text-muted-foreground mb-2">
          We connect CRM, finance, operations and custom systems.
        </p>
        <p className="text-[11px] text-muted-foreground/70 italic">
          Does your system have an API? Then we can integrate.
        </p>
      </div>
    </section>
  );
};

export default ToolStackBlock;
