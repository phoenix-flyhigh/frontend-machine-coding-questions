import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter((x) => x);
  let breadcrumbpath = "";

  return pathnames.length === 0 ? (
    <></>
  ) : (
    <div className="flex gap-2">
      <Link to="/" className="underline text-md font-semibold capitalize">
        Home
      </Link>
      {pathnames.map((s, index) => {
        const isLast = index === pathnames.length - 1;
        breadcrumbpath += `/${s}`;

        return isLast ? (
          <span key={s}> {`>  ${s}`} </span>
        ) : (
          <span key={s}>
            {`>  `}
            <Link
              to={breadcrumbpath}
              className="underline text-md font-semibold capitalize"
            >
              {s}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
