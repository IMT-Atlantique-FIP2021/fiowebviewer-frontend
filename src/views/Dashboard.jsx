import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Result from "../components/Result";
import TestingComponent from "../components/TestingComponent";
import Footer from "../components/Footer";

function Dashboard() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-auto bg-gray-200 dark:bg-gray-800">
                <Header />

                <NavBar />

                <Result />
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;
