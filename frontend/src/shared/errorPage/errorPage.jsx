import { useRouteError, Link } from "react-router-dom";

// import "./ErrorPage.css";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="error-container">
      <div className="error-message">
        <h1>Oops!</h1>
        <p>
          Sorry, the following error has occurred:{" "}
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <Link to="/" className="error-link">
        <p>Go back to the mainpage</p>
      </Link>
    </div>
  );
};

export default ErrorPage;
