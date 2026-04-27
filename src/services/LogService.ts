import ApiConfig from "../config/ApiConfig";


export type RecommendationLogPayload = {
  user_id: number;
  recommendations: number[];
  relevants: number[];
};

export type RecommendationLogResponse = {
  status: string;
  message: string;
  data: {
    id: number;
    user_id: number;
    recommendations: number[];
    relevants: number[];
  };
};

class LogService {

  
static async createLog(
  userId: number,
  recommendations: number[],
  relevants: number[]
) {
  const res = await fetch(ApiConfig.BASE_URL + "/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      recommendations: recommendations,
      relevants: relevants
    })
  })

  return await res.json()
}

  static async getLogs() {
    const res = await fetch(`${ApiConfig.BASE_URL}/logs`);

    if (!res.ok) {
      throw new Error("Failed to fetch logs");
    }

    return res.json();
  }


  static async getUserLogs(userId: number) {
    const res = await fetch(
      `${ApiConfig.BASE_URL}/logs/user/${userId}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user logs");
    }

    return res.json();
  }


  static async deleteLog(logId: number) {
    const res = await fetch(
      `${ApiConfig.BASE_URL}/log/${logId}`,
      {
        method: "DELETE"
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete log");
    }

    return res.json();
  }
}

export default LogService;