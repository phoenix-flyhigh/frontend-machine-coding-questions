import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter((x) => x);
  let breadCrumbsPath = "";

  return (
    <span>
      {paths.length === 0 ? (
        <span key="Home">Home</span>
      ) : (
        <Link to="/" className="underline font-semibold capitalize">
          Home
        </Link>
      )}
      {paths.map((path, i) => {
        const isLast = i === paths.length - 1;
        breadCrumbsPath += `/${path}`;

        return isLast ? (
          <span key={path}>{` > ${path}`}</span>
        ) : (
          <span key={path}>
            {` > `}
            <Link
              to={breadCrumbsPath}
              className="underline font-semibold capitalize"
            >
              {path}
            </Link>
          </span>
        );
      })}
    </span>
  );
};

export default BreadCrumbs;
