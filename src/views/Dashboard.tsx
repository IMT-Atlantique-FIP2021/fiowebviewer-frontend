import NavBar from "../components/NavBar/NavBar";
import Content from "../components/Content";

function Dashboard() {
  return (
    <div className="flex flex-row">
      <NavBar />
      <Content />
    </div>
  );
}

export default Dashboard;
