import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from "./dashboardItems/Sidebar";
import './Dashboard.css'

export const Dashboard = () => {
    return (
        <div className="d-flex">
            <div className="col-auto">
                <Sidebar/>
            </div>
            <div>
            </div>
        </div>
    )
}