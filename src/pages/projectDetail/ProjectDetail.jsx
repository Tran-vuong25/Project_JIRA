import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hook-redux";
import { setProjectDetail } from "../../redux/project-slice";
import { getProjectDetail } from "../../services/project.service";
import { InfoMain } from "./infoMain/InfoMain";

export function ProjectDetail() {
  const params = useParams();
  const {projectDetail} = useAppSelector((state) => state.projectReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!params.projectId) return;

    getProjectDetail(params.projectId)
      .then((resp) => {
        dispatch(setProjectDetail(resp.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.projectId]);
  console.log(projectDetail);

  return (
    <div>
      {projectDetail ? (
        <InfoMain data={projectDetail} />
      ) : (
        <p>wait a minute...</p>
      )}
    </div>
  );
}