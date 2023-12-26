export const CardItem = () => {
  return (
    <div class="px-4 mx-auto max-w-screen-xl">
      <div>
        <div class="flex items-end items-center  mb-4 rounded-full">
          <svg height="100" width="100">
            <circle
              cx="50"
              cy="50"
              r="40"
            
              stroke-width="3"
              fill="green"
            />
          </svg>
          <div className="">
            <h2>Test file recovery</h2>
            <p className="text-green-500 weight-bold font-bold p-3">
              19/02/2024
            </p>
          </div>
        </div>
        <p class="text-gray-500 dark:text-gray-400">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa esse,
          temporibus facere consequatur quae illo magnam suscipit, excepturi,
          numquam eaque est fuga illum neque quam quis qui earum. Veritatis,
          modi.
        </p>
      </div>
    </div>
  );
};
