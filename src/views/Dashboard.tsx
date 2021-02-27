import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Content from "../components/Content";
import Footer from "../components/Footer";

function Dashboard() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-auto bg-gray-200 dark:bg-gray-800">
                <Header />

                <NavBar />

                <Content />
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;
