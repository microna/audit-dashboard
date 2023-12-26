export const ClientInfoItem = (props) => {
  return (
    <>
      <div class="w-full bg-blue-100 p-4 rounded-lg shadow-md flex items-center justify-between my-3">
        <div className="text-left">
          <p class="text-gray-500">{props.subtitle}</p>
          <h5 class="text-l font-semibold">{props.title}</h5>
        </div>
      </div>
    </>
  );
};
