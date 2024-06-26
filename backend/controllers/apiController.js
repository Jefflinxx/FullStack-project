import { getData } from "./getData.js";
import { clockIn } from "./clockIn.js";

const apiController = {
  async getData(req, res) {
    try {
      const result = await getData(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      console.error("Error querying database", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async clockIn(req, res) {
    try {
      await clockIn(req.body);
      res.status(200).json({ message: "打卡成功" });
    } catch (err) {
      console.error("Error processing clock-in request", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getHTML(req, res) {
    console.log(req);
    res.sendFile(path.join(__dirname, "views", "test.html"));
  },
};

export default apiController;
