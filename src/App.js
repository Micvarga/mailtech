import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import LoginPage from "./Pages/LoginPage";
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
            </Routes>
            <Routes>
                <Route
                    path="efficiency"
                    element={<MyEfficiencyReportsPage />}
                />
            </Routes>
            <Routes>
                <Route path="production" element={<ReportProductionPage />} />
            </Routes>
            <Routes>
                <Route path="metrics" element={<TeamMetricsReportsPage />} />
            </Routes>
            <Routes>
                <Route path="volume" element={<VolumeReportsPage />} />
            </Routes>
            <Routes>
                <Route path="hours" element={<WorkedHoursReportsPage />} />
            </Routes>
        </div>
    );
}

export default App;
