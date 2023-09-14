import Login from "./components/Login/Login";
import { BrowserRouter as Router , Route, Routes } from "react-router-dom";
import ViewJobs from "./components/candidate/ViewJobs";
import AdminPanel from "./components/admin/AdminPanel";

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" Component={Login}/>            
          <Route exact path="/instructor" Component={ViewJobs}/>
          <Route path="/admin" Component={AdminPanel}/>
        </Routes>
      </Router>
  );
}

export default App;
