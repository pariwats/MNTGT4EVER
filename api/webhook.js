export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).send("Webhook OK");
  }

  const events = req.body.events;

  console.log("LINE EVENT:", JSON.stringify(events));

  return res.status(200).json({
    message: "received"
  });
}
