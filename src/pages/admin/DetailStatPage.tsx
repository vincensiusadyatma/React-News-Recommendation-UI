import MainLayout from "../../layouts/MainLayout";
import { useNavigate, useParams } from "react-router";
import { Logout } from "../../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import EvaluationService from "../../services/EvaluationService";

// ================= TYPE =================
type MetricPerK = {
  [key: string]: number;
};

type UserMetric = {
  user_id: number;
  precision: MetricPerK;
  recall: MetricPerK;
  f1_score: MetricPerK;
  average_precision: MetricPerK;
  map: number;
};

const DetailStatPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [data, setData] = useState<UserMetric | null>(null);
  const [loading, setLoading] = useState(true);

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

  // ================= FETCH =================
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await EvaluationService.getMetricByUserId(Number(userId));
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // ================= PREPARE =================
  const kValues = [1, 2, 3, 4, 5];

  const precisionData = kValues.map(k => data?.precision?.[`k${k}`] ?? 0);
  const recallData = kValues.map(k => data?.recall?.[`k${k}`] ?? 0);
  const f1Data = kValues.map(k => data?.f1_score?.[`k${k}`] ?? 0);
  const apData = kValues.map(k => data?.average_precision?.[`k${k}`] ?? 0);



  if (loading) {
    return (
      <MainLayout func={handleLogout}>
        <div className="text-white p-10">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout func={handleLogout}>
      <ToastContainer />

      <div className="max-w-6xl mx-auto mt-6 text-white space-y-6">

        <h1 className="text-2xl font-bold">
          Evaluation Dashboard (User {userId})
        </h1>

        {/* ================= MAIN CHART ================= */}
        <Card title="Precision vs Recall vs F1">
          <div className="w-full overflow-hidden">
            <LineChart
              xAxis={[{ data: kValues, label: "K Value" }]}
              yAxis={[{ min: 0, max: 1 }]}
              series={[
                { data: precisionData, label: "Precision", color: "#38bdf8", showMark: true },
                { data: recallData, label: "Recall", color: "#22c55e", showMark: true },
                { data: f1Data, label: "F1 Score", color: "#f59e0b", showMark: true },
              ]}
              height={350}
              grid={{ vertical: true, horizontal: true }}

              margin={{ top: 20, bottom: 40, left: 50, right: 20 }}

              slotProps={{
                mark: {
                  shape: "circle",
                  r: 4,
                  strokeWidth: 0,
                },
              }}
            />
          </div>
        </Card>

        {/* ================= MINI ================= */}
        <div className="grid md:grid-cols-3 gap-6">
          <MiniChart title="Precision" data={precisionData} kValues={kValues} color="#38bdf8" />
          <MiniChart title="Recall" data={recallData} kValues={kValues} color="#22c55e" />
          <MiniChart title="F1 Score" data={f1Data} kValues={kValues} color="#f59e0b" />
        </div>

        {/* ================= BAR ================= */}
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
            margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
          />
        </Card>

     {/* ================= AP ================= */}
<Card title="Average Precision (AP)">
  <LineChart
    xAxis={[{ data: kValues }]}
    yAxis={[{ min: 0, max: 1 }]}
    series={[
      {
        data: apData,
        label: "Average Precision",
        color: "#a78bfa",
        showMark: true
      },
    ]}
    height={320}
    margin={{ top: 20, bottom: 40, left: 50, right: 20 }}

    grid={{ vertical: true, horizontal: true }}
  />
</Card>
      </div>
    </MainLayout>
  );
};

export default DetailStatPage;

// ================= COMPONENT =================

type CardProps = {
  title: string;
  children: React.ReactNode;
};

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="relative overflow-hidden bg-[#1e293b]/80 border border-white/10 rounded-2xl p-5 shadow-xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-200">
        {title}
      </h2>

      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

type MiniChartProps = {
  title: string;
  data: number[];
  kValues: number[];
  color: string;
};

const MiniChart = ({ title, data, kValues, color }: MiniChartProps) => {
  return (
    <Card title={title}>
      <LineChart
        xAxis={[{ data: kValues }]}
        yAxis={[{ min: 0, max: 1 }]}
        series={[
          {
            data,
            color,
            showMark: true,
          },
        ]}
        height={250}
        margin={{ top: 20, bottom: 30, left: 40, right: 20 }}

      
        grid={{ vertical: true, horizontal: true }}

        slotProps={{
          mark: {
            shape: "circle",
            r: 4,
            strokeWidth: 0,
          },
        }}
      />
    </Card>
  );
};