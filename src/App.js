import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MyEfficiencyReportsPage from "./Pages/MyEfficiencyReports";
import TeamMetricsReportsPage from "./Pages/TeamMetricsReportsPage";
import ReportProductionPage from "./Pages/ReportProductionPage";
import VolumeReportsPage from "./Pages/VolumeReportsPage";
import WorkedHoursReportsPage from "./Pages/WorkedHoursReportsPage";
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
            </Routes>
        </div>
    );
}

export default App;
