import ApiConfig from "../config/ApiConfig"
// import axios from 'axios';

const GetNews = async (page: number, perPage: number, query: string = "") => {
    try {
        let url = "";

        if (query.trim() !== "") {
            const params = new URLSearchParams({
                q: query,
                page: page.toString(),
                per_page: perPage.toString()
            });

            url = `${ApiConfig.BASE_URL}/news/search?${params.toString()}`;
        } else {
            const params = new URLSearchParams({
                page: page.toString(),
                per_page: perPage.toString()
            });

            url = `${ApiConfig.BASE_URL}/news/page?${params.toString()}`;
        }

        const response = await fetch(url);

    
        if (!response.ok) {
            const errData = await response.json().catch(() => null);
            const message = errData?.message || "Request gagal";
            throw new Error(message);
        }

        const data = await response.json();
        return data;

    } catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    } else {
        console.log("Error tidak diketahui");
    }
}
};

const GetNewsDetail = async (id: number) => {
    try {
        const res = await fetch(ApiConfig.BASE_URL + `/news/${id}`);

        if (!res.ok) {
            let message = "Get News Detail Failed";

            try {
                const errData = await res.json();
                message = errData.message || message;
            } catch {
                // kosong
            }

            throw new Error(message);
        }

        const data = await res.json();
        return data;

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Error");
    }
};


const GetRecommendation = async (newsId: number, topK: number = 5) => {
    try {
        const url = ApiConfig.BASE_URL + `/ucb/${newsId}?top_k=${topK}`;

        const res = await fetch(url);

        if (!res.ok) {
            let message = "Get Recommendation Failed";

            try {
                const errData = await res.json();
                message = errData.message || message;
            } catch {
                // kosong
            }

            throw new Error(message);
        }

        const data = await res.json();
        return data;

    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Error");
    }
};

const SubmitFeedback = async (
  userId: number,
  newsId: number,
  feedback: number 
) => {
  try {
    const res = await fetch(ApiConfig.BASE_URL + "/ucb/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        news_id: newsId,
        feedback: feedback
      })
    });

    if (!res.ok) {
      let message = "Submit Feedback Failed";

      try {
        const errData = await res.json();
        message = errData.message || message;
      } catch {
        // kosong
      }

      throw new Error(message);
    }

    const data = await res.json();
    return data;

  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : "Error");
  }
};
export {GetNews,GetNewsDetail, GetRecommendation, SubmitFeedback}