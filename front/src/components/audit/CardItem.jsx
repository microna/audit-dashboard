import formatDate from "../../utils/dateFormatter";
import CardItemImg from "../../img/carditem1.png";

export const CardItem = ({ auditData }) => {
  return (
    <div className="p-4 mx-auto max-w-screen-xl border border-solid border-grey rounded-md shadow-md">
      <div>
        <div className="flex items-center gap-4 mb-4 rounded-full">
          <img src={CardItemImg} alt="" />
          <div className="">
            <h2>Test file recovery</h2>
            <p className="text-green-500 weight-bold font-bold pt-3">
              {formatDate(auditData.fileTestRecovery)}
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
