import "./global.css"
import type { ReactNode } from "react";

export const metadata = {
  title: "HDFC Mutual Fund Chat Bot",
  description: "The place to go for all your F1 doubts",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
