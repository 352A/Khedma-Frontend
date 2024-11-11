import { useContext, useEffect, useState } from "react";
import VerifyAccountPaper from "./VerifyAccountPaper";
import { authContext } from "../../../Context/AuthContext";
import api from "../../utils/api";
import VerifyAccountPaperSkeleton from "./VerifyAccountPaperSkeleton";

export default function Unverified() {
  const { token, bearerKey } = useContext(authContext);
  const [application, setApplication] = useState([]);
  const getApplicationEndPoint = "craftsman/application";
  const frontNationalIDUpload = "craftsman/frontNationalID";
  const frontNationalIDUpdate = `craftsman/${application?._id}/frontNationalID`;
  const backNationalIDUpload = "craftsman/backNationalID";
  const backNationalIDUpdate = `craftsman/${application?._id}/backNationalID`;
  const certificateIDUpload = "craftsman/certificateOfCriminal";
  const certificateUpdate = `craftsman/${application?._id}/certificateOfCriminal`;

  async function getCraftsmanApplication() {
    try {
      const { data } = await api.get(getApplicationEndPoint, {
        headers: {
          authorization: `${bearerKey}${token}`,
        },
      });
      setApplication(data.application);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCraftsmanApplication();
  }, []);

  return (
    <>
      {application?.length === 0 ? (
        <div className="items-center justify-evenly gap-x-10 lg:flex lg:flex-row-reverse">
          <div className="m-auto mb-10 w-4/5 lg:w-1/3">
            <VerifyAccountPaperSkeleton />
          </div>
          <div className="m-auto mb-10 w-4/5 lg:w-1/3">
            <VerifyAccountPaperSkeleton />
          </div>
          <div className="m-auto mb-10 w-4/5 lg:w-1/3">
            <VerifyAccountPaperSkeleton />
          </div>
        </div>
      ) : application === null ? (
        <div className="mt-5 flex flex-col-reverse gap-5 lg:flex-row-reverse">
          <VerifyAccountPaper
            uploadEndPoint={frontNationalIDUpload}
            updateEndPoint={frontNationalIDUpdate}
            paperUrl={null}
            status={null}
            getCraftsmanApplication={getCraftsmanApplication}
            title={"الوجه الامامي للبطاقة الشخصية"}
          />
          <VerifyAccountPaper
            uploadEndPoint={backNationalIDUpload}
            updateEndPoint={backNationalIDUpdate}
            paperUrl={null}
            status={null}
            getCraftsmanApplication={getCraftsmanApplication}
            title={"الوجه الخلفي للبطاقة الشخصية"}
          />
          <VerifyAccountPaper
            uploadEndPoint={certificateIDUpload}
            updateEndPoint={certificateUpdate}
            paperUrl={null}
            status={null}
            getCraftsmanApplication={getCraftsmanApplication}
            title={"صورة شخصية مع صورةالبطاقة"}
          />
        </div>
      ) : (
        <div className="mt-5 flex flex-col-reverse gap-5 lg:flex-row-reverse">
          <VerifyAccountPaper
            uploadEndPoint={frontNationalIDUpload}
            updateEndPoint={frontNationalIDUpdate}
            paperUrl={application?.documents?.frontNationalID?.secure_url}
            status={application?.documents?.frontNationalID?.status}
            getCraftsmanApplication={getCraftsmanApplication}
            title={"الوجه الامامي للبطاقة الشخصية"}
          />
          <VerifyAccountPaper
            uploadEndPoint={backNationalIDUpload}
            updateEndPoint={backNationalIDUpdate}
            paperUrl={application?.documents?.backNationalID?.secure_url}
            status={application?.documents?.backNationalID?.status}
            getCraftsmanApplication={getCraftsmanApplication}
            title={"الوجه الخلفي للبطاقة الشخصية"}
          />
          <VerifyAccountPaper
            uploadEndPoint={certificateIDUpload}
            updateEndPoint={certificateUpdate}
            paperUrl={application?.documents?.certificateOfCriminal?.secure_url}
            status={application?.documents?.certificateOfCriminal?.status}
            getCraftsmanApplication={getCraftsmanApplication}
            title={"صورة شخصية مع صورة البطاقة"}
          />
        </div>
      )}
    </>
  );
}
