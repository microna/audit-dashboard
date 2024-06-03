export const Features = (props) => {
  const cssStyle =
    props.featureData.length > 5
      ? "text-black font-bold  text-[14px]"
      : "text-yellow-300 text-xl font-bold";
  const featureData =
    props.featureData.length > 3 ? props.featureData : `${props.featureData}%`;

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="w-full bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div className="text-custom text-center ">
          <h4 className="font-semibold mb-2">{props.title}</h4>
          <h5 className={`${cssStyle}`}>{featureData}</h5>
        </div>

        <div className="">
          <img className="h-[100px] w-[120px]" src={props.imgLink} alt="" />
        </div>
      </div>
    </section>
  );
};
