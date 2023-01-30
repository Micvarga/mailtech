import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MyEfficiencyReportsPage from "./Pages/MyEfficiencyReportsPage/MyEfficiencyReports";
import TeamMetricsReportsPage from "./Pages/TeamMetricsReportsPage/TeamMetricsReportsPage";
import ReportProductionPage from "./Pages/ReportProductionPage/ReportProductionPage";
import VolumeReportsPage from "./Pages/VolumeReportsPage/VolumeReportsPage";
import WorkedHoursReportsPage from "./Pages/WorkedHoursReportsPage/WorkedHoursReportsPage";
import Register_RemoveUsersPage from "./Pages/Register_RemoveUsersPage/Register_RemoveUsersPage";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                    path="/efficiency"
                    element={<MyEfficiencyReportsPage />}
                />
                <Route path="production" element={<ReportProductionPage />} />
                <Route path="metrics" element={<TeamMetricsReportsPage />} />
                <Route path="volume" element={<VolumeReportsPage />} />
                <Route path="hours" element={<WorkedHoursReportsPage />} />
                <Route path="users" element={<Register_RemoveUsersPage />} />
            </Routes>
        </div>
    );
}

export default App;
