import {Link, useNavigate} from "react-router-dom";

export default function ProfileDataTable(type: string, data: Array<string>) {
  let title = "";
  let baseRoute = "";

  const navigate = useNavigate();
  switch (type) {
    case "tracks":
      title = "Liked Tracks";
      baseRoute = "/Tune/Track/";
      break;
    case "following":
      title = "Following";
      baseRoute = "/Account/Profile/";
      break;
    case "followers":
      title = "Follower";
      baseRoute = "/Account/Profile/";
      break;
  }
  return (
      <div>
        <h1>{title}</h1>
        <table className="table">
          <thead>
          <tr>
            <td>
              <strong>{title}</strong>
            </td>
          </tr>
          </thead>
          <tbody>
          {data !== undefined && data.map((id: any) => (
              <tr key={id}>
                <td>
                  <Link to={`${baseRoute}${id}`}>{id}</Link>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  )
};