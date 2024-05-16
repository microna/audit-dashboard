export const Features = (props) => {
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="w-full bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div className="text-custom text-center">
          <h4 class="font-semibold">{props.title}</h4>
          <h5 class="text-xl font-bold text-yellow-300">
            {props.featureData}
          </h5>
        </div>

        <div className="">
          <img className="h-[100px] w-[150px]" src={props.imgLink} alt="" />
        </div>
      </div>
    </section>
  );
};
