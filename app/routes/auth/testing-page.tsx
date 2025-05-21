import { Link } from "react-router";

const TestingPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Testing Page</h1>
            <p>This is a testing component.</p>
            <div className="p-4 border rounded-md">
                <h2 className="text-lg font-semibold mb-2">Component Content</h2>
                <p>Add your test content here.</p>
            </div>
            <div className="mt-4">
                <Link to="/auth/login" className="text-blue-500 hover:underline">
                    Go back to login
                </Link>
            </div>
        </div>
    );
};

export default TestingPage;