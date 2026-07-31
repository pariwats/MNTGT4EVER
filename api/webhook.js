export default function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).send("LINE Webhook Ready");
  }

  if (req.method === "POST") {

    console.log("LINE EVENT:");
    console.log(JSON.stringify(req.body, null, 2));

    return res.status(200).json({
      status: "ok"
    });

  }

  return res.status(405).send("Method Not Allowed");
}
