export const LayoutProvider = ({ children }) => {
  return (
    <div className="">
      <div className="w-full h-[50px] bg-red-400"></div>
      {children}
    </div>
  );
};
