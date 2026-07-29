module.exports = async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }


  try {

    const { prompt } = req.body;


    if (!prompt) {
      return res.status(400).json({
        error: "没有输入内容"
      });
    }


    const response = await fetch(
      "https://api.siliconflow.cn/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SILICONFLOW_API_KEY}`
        },

        body: JSON.stringify({

          model: "deepseek-ai/DeepSeek-V3",

          messages: [

            {
              role: "system",
              content:
              "你是一名专业爆款文案大师，擅长抖音、小红书、短视频文案。"
            },

            {
              role: "user",
              content: prompt
            }

          ]

        })

      }
    );


    const data = await response.json();


    console.log("DeepSeek返回:", data);


    if (!response.ok) {

      return res.status(response.status).json({
        error:data
      });

    }


    return res.status(200).json({

      result:data.choices[0].message.content

    });


  } catch(error) {


    console.log("服务器错误:", error);


    return res.status(500).json({

      error:error.message

    });

  }

};
