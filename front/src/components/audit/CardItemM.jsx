export const CardItemM = ({ auditData }) => {

  return (
    <div className="py-8 px-4 mx-auto ">
      <div className="flex flex-col items-center justify-center w-[100%]">
        <svg height="100" width="100">
          <circle cx="50" cy="50" r="40" stroke-width="3" fill="green" />
        </svg>

        <h2 className="mb-2">
          DR Status -{" "}
          <span className="text-red-500 font-bold">{auditData.drStatus}</span>
        </h2>

        <p className="text-center text-sm text-gray-500">
          Carrying out a full disaster recovery & business continuity audit will
          provide insight into how long it would take to recover data in the
          event of a system failure
        </p>
      </div>
    </div>
  );
};
