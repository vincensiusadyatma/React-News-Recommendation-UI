import OrbitProgress from "react-loading-indicators/OrbitProgress";

type loadingProps = {
    isLoading: boolean
}

const Loading = ({isLoading}:loadingProps) => {
  return (
    <div className={`${isLoading ? "flex" : "hidden"} fixed inset-0  justify-center items-center z-50 bg-[rgba(0,0,0,0.7)]`}>
      <OrbitProgress color="#118be9" size="medium" text="" textColor="#5633d3" />
    </div>
  );
};

export default Loading;