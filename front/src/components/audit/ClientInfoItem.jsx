export const ClientInfoItem = ({ children }) => {
  return (
    <>
      <div class="w-full bg-blue-100 p-4 rounded-lg shadow-md flex items-center justify-between my-3">
        <div className="text-left">{children}</div>
      </div>
    </>
  );
};
