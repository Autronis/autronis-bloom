import { motion } from "framer-motion";

const ToolStackBlock = () => {
  return (
    <section className="py-6 sm:py-10 border-t border-border relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/[0.02] blur-[80px]"
          animate={{
            scale: [1.1, 0.9, 1.1],
            x: [0, 30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-primary/[0.02] blur-[70px]"
          animate={{
            scale: [0.9, 1.15, 0.9],
            x: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
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
