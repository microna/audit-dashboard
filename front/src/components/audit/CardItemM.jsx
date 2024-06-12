import cardItemMimg from "../../img/carditem2.png";

export const CardItemM = ({ auditData }) => {
  return (
    <div className="py-2 px-4">
      <div className="flex flex-col items-center justify-center w-[100%]">
        <img src={cardItemMimg} alt="" />

        <h2 className="my-4">
          DR Status -{" "}
          <span className="text-red-500 font-bold">{auditData.drStatus}</span>
        </h2>

        <p className="text-center text-[12px] text-gray-500">
          Carrying out a full disaster recovery & business continuity audit will
          provide insight into how long it would take to recover data in the
          event of a system failure
        </p>
      </div>
    </div>
  );
};
