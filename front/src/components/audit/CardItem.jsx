export const CardItem = ({ auditData }) => {
  return (
    <div className="px-4 mx-auto max-w-screen-xl">
      <div>
        <div className="flex items-end items-center  mb-4 rounded-full">
          <svg height="100" width="100">
            <circle cx="50" cy="50" r="40" stroke-width="3" fill="green" />
          </svg>
          <div className="">
            <h2>Test file recovery</h2>
            <p className="text-green-500 weight-bold font-bold pt-3">
              {auditData.fileTestRecovery}
            </p>
          </div>
        </div>
        <p className="">
          We recovered the following files ‘master document’ from your main
          SharePoint library, we also recovered ‘email to client’ from
          01/01/2023 from Chris’ email. If you would like other backup sources
          checked please let us know
        </p>
      </div>
    </div>
  );
};
