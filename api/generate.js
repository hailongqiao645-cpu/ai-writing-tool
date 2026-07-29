export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }


  try {

    const { prompt } = req.body;


    const response = await fetch(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },

        body: JSON.stringify({

          model: "deepseek-chat",

          messages: [

            {
              role: "system",
              content:
              "你是一名专业短视频爆款文案专家，擅长抖音、小红书、视频号内容创作。"
            },

            {
              role: "user",
              content:
              `请根据下面主题生成一篇爆款文案：

${prompt}

要求：
1. 输出标题
2. 输出开头3秒吸引人的话
3. 输出完整正文
4. 输出热门标签`
            }

          ],

          temperature:0.8

        })

      }
    );


const data = await response.json();


if(!response.ok){

return res.status(response.status).json({

error:data

});

}


return res.status(200).json({

result:data.choices[0].message.content

});

catch(error){

console.log(error);

return res.status(500).json({

error:error.message

});

}

}
