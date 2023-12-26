import { Header } from "../components/Header";

export const LayoutProvider = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <Header />
      {children}
    </div>
  );
};
