const OverviewSkeleton = () => {
  return (
    // Responsive padding: smaller on mobile, larger on desktop
    <div className="p-4 md:p-8 space-y-6 animate-pulse max-w-7xl mx-auto">
      
      {/* 1. Main Balance Card - Fluid height for better scaling */}
      <div className="h-44 md:h-52 bg-slate-500 rounded-3xl w-full"></div>

      {/* 2. Stat Cards - 1 col on mobile, 2 on small tablets, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="h-28 bg-slate-500 rounded-2xl"></div>
        <div className="h-28 bg-slate-500 rounded-2xl"></div>
        {/* The 3rd card only shows its own row on mobile, or joins the grid on lg */}
        <div className="h-28 bg-slate-500 rounded-2xl sm:col-span-2 lg:col-span-1"></div>
      </div>

      {/* 3. Recent Transactions List */}
      <div className="space-y-4 pt-4">
        {/* Title placeholder */}
        <div className="h-6 bg-slate-500 rounded-lg w-32 md:w-48"></div>
        
        {/* List items - hiding 2 on mobile to keep the screen clean */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className={`h-16 bg-slate-500 rounded-2xl w-full border border-slate-500 
              ${i > 3 ? 'hidden md:block' : ''}`} // Logic: Show fewer items on mobile
          ></div>
        ))}
      </div>
    </div>
  );
};

export default OverviewSkeleton;