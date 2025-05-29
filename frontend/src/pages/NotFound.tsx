import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col text-center p-4">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="text-lg mt-2 text-gray-700">Page Not Found</p>
      <Link to="/" className="mt-4 text-blue-600 underline">
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
