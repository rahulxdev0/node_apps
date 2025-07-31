const express = require("express");
const { connectDB } = require("./connect");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const URL = require("./models/url");
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

async function startServer() {
  try {
    await connectDB("mongodb://localhost:27017/shorturl");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

startServer();

app.use("/", staticRoute)
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  console.log("Entry found:", entry);
  res.status(200).redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
