export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Background Base */}
      <div className="absolute inset-0 bg-white" />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />

      {/* Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-200/40 blur-[130px] animate-blob animate-float" />
      <div className="absolute top-[10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-blue-200/40 blur-[130px] animate-blob animate-float animation-delay-2000" />
      <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-orange-200/30 blur-[110px] animate-blob animate-float animation-delay-4000" />
      <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-pink-200/30 blur-[100px] animate-blob animate-float animation-delay-2000" />
      <div className="absolute top-[40%] left-[30%] w-[700px] h-[700px] rounded-full bg-emerald-100/20 blur-[160px] animate-blob animate-float" />
      <div className="absolute top-[60%] right-[20%] w-[650px] h-[650px] rounded-full bg-indigo-100/20 blur-[150px] animate-blob animate-float animation-delay-4000" />

      {/* Extra Mesh-like Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-white/20" />
    </div>
  );
};
