const express = require("express");
const request = require("request");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  request(
    { url: "https://elephant-api.herokuapp.com/elephants" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error" });
      }

      res.json(JSON.parse(body));
    }
  );
});

app.get("/elephant/:id", (req, res) => {
  const index = req.params.id;
  request(
    { url: "https://elephant-api.herokuapp.com/elephants" },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error" });
      }

      const matchingElephant = JSON.parse(body).filter((e) => e.index == index);
      res.json(matchingElephant[0]);
    }
  );
});

app.get("/sex/:sex", (req, res) => {
  const sex = req.params.sex;
  request(
    { url: `https://elephant-api.herokuapp.com/elephants/sex/${sex}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error" });
      }

      res.json(JSON.parse(body));
    }
  );
});

app.get("/species/:species", (req, res) => {
  const species = req.params.species;
  request(
    { url: `https://elephant-api.herokuapp.com/elephants/species/${species}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error" });
      }

      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
