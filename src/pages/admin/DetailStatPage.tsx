import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router";
import { Logout } from "../../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";

const DetailStatPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await Logout();
      if (result.message === "logout success") {
        toast.success("Logout Successfully", {
          onClose: () => navigate("/auth/login"),
          autoClose: 1500,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };


  const kValues = [1, 2, 3, 4, 5];

  const precisionData = [0.90, 0.82, 0.74, 0.68, 0.62];
  const recallData = [0.30, 0.45, 0.60, 0.68, 0.75];

  const f1Data = precisionData.map((p, i) => {
    const r = recallData[i];
    return (2 * p * r) / (p + r);
  });

  const apData = [0.90, 0.86, 0.80, 0.76, 0.72];
  const MAP = apData.reduce((a, b) => a + b, 0) / apData.length;

  return (
    <MainLayout func={handleLogout}>
      <ToastContainer />

      <div className="max-w-6xl mx-auto mt-6 text-white space-y-6">

        <h1 className="text-2xl font-bold">
          Evaluation Dashboard
        </h1>

        {/* MAIN CHART */}
        <Card title="Precision vs Recall vs F1">
      <LineChart
  xAxis={[{ data: kValues, label: "K Value" }]}
  yAxis={[{ min: 0, max: 1 }]}
  series={[
    {
      data: precisionData,
      label: "Precision",
      color: "#38bdf8",
      showMark: true,
    },
    {
      data: recallData,
      label: "Recall",
      color: "#22c55e",
      showMark: true,
    },
    {
      data: f1Data,
      label: "F1 Score",
      color: "#f59e0b",
      showMark: true,
    },
  ]}
  height={350}
  grid={{ vertical: true, horizontal: true }}


  slotProps={{
    mark: {
      shape: "circle",     
      r: 5,                
      strokeWidth: 0,      
    },
  }}
/>
        </Card>

        {/* MINI */}
        <div className="grid md:grid-cols-3 gap-6">
          <MiniChart title="Precision" data={precisionData} kValues={kValues} color="#38bdf8" />
          <MiniChart title="Recall" data={recallData} kValues={kValues} color="#22c55e" />
          <MiniChart title="F1 Score" data={f1Data} kValues={kValues} color="#f59e0b" />
        </div>

        {/* BAR */}
        <Card title="Comparison">
          <BarChart
            xAxis={[{ scaleType: "band", data: kValues }]}
            yAxis={[{ min: 0, max: 1 }]}
            series={[
              { data: precisionData, label: "Precision", color: "#38bdf8" },
              { data: recallData, label: "Recall", color: "#22c55e" },
              { data: f1Data, label: "F1 Score", color: "#f59e0b" },
            ]}
            height={320}
          />
        </Card>

        {/* AP */}
        <Card title="Average Precision (AP)">
          <LineChart
            xAxis={[{ data: kValues }]}
            yAxis={[{ min: 0, max: 1 }]}
            series={[
              { data: apData, label: "Average Precision", color: "#a78bfa", showMark: true },
            ]}
            height={320}
          />
        </Card>

        {/* MAP */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-2xl p-6 text-center backdrop-blur-md shadow-xl">
          <h2 className="text-lg text-gray-300">
            Mean Average Precision (MAP)
          </h2>
          <p className="text-4xl font-bold text-green-400 mt-2">
            {(MAP * 100).toFixed(2)}%
          </p>
        </div>

      </div>
    </MainLayout>
  );
};

export default DetailStatPage;


// COMPONENT
const Card = ({ title, children }: any) => {
  return (
    <div className="bg-[#1e293b]/80 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-200">
        {title}
      </h2>
      {children}
    </div>
  );
};

const MiniChart = ({ title, data, kValues, color }: any) => {
  return (
    <Card title={title}>
      <LineChart
        xAxis={[{ data: kValues }]}
        yAxis={[{ min: 0, max: 1 }]}
        series={[{ data, color, showMark: true }]}
        height={250}
      />
    </Card>
  );
};