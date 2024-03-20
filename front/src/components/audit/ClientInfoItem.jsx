export const ClientInfoItem = (props) => {
  return (
    <>
      <div class="w-full bg-blue-100 p-4 rounded-lg shadow-md flex items-center justify-between my-3">
        <div className="text-left">
          <p class="text-gray-500">{props.title}</p>
          <h5 class="text-l font-semibold">
            <p>{props.data}</p>
          </h5>
        </div>
      </div>
    </>
  );
};
