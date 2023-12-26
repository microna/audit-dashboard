export const Features = (props) => {
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="w-full bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div className="text-custom text-center">
          <h4 class="font-semibold">{props.title}</h4>
          <p class="pt-2 text-gray-500">{props.subtitle}</p>
        </div>

        <div className="">
          <img className="h-[100px] w-[150px]" src={props.imgLink} alt="" />
        </div>
      </div>
    </section>
  );
};
