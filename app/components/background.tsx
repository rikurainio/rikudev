export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-zinc-950">
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />

      {/* Very Subtle Glows */}
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-zinc-800/20 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-zinc-800/10 blur-[150px]" />

      {/* Grid Pattern or similar minimal element if desired - let's skip for pure minimal */}
    </div>
  );
};
