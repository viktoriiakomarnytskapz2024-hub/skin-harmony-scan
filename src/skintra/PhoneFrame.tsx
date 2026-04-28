import { ReactNode } from "react";

export const PhoneFrame = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen w-full flex items-center justify-center p-0 sm:p-6 glow-bg">
    <div className="relative w-full sm:w-[400px] sm:h-[860px] h-screen sm:rounded-[3rem] overflow-hidden sm:border-[10px] sm:border-foreground/90 sm:shadow-[0_30px_80px_-20px_hsl(218_60%_30%/0.4)] bg-background">
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {children}
      </div>
    </div>
  </div>
);