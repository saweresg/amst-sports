require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI;
const stripe = require("stripe")(process.env.STRIPE_KEY);
var cors = require("cors");
const express = require("express");
const app = express();
const axios = require("axios");

const databaseUrl = process.env.DATABASE_URL;
const YOUR_DOMAIN = process.env.DOMAIN_URL;

const corsOptions = {
  origin: process.env.DOMAIN_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const endpointSecret = process.env.ENDPOINT_SECRET;

const bodyParser = require("body-parser");

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log(err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        }
      );
      const lineItems = sessionWithLineItems.metadata;

      fulfillOrder(lineItems);
    }

    response.status(200).end();
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors(corsOptions));

async function fulfillOrder(lineItems) {
  var dateTimes = JSON.parse(lineItems.dateAndTimes);
  var uid = lineItems.userId;

  var dates = Object.keys(dateTimes).sort();

  try {
    console.log(`${databaseUrl}/users/${uid}`);
    await axios.patch(`${databaseUrl}/users/${uid}`, {
      bookings: dateTimes,
    });
  } catch (err) {
    console.log("Error creating post:", err.message);
  }

  dates.forEach(async function (day) {
    times = dateTimes[day];

    try {
      await axios.patch(`${databaseUrl}/bookings/${day}`, {
        slots: times,
      });
    } catch (err) {
      console.error("Error creating post:", err.message);
    }
  });
}

function formatDate(yearMonthDay) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let arr = yearMonthDay.split("-");
  return monthNames[parseInt(arr[1] - 1)] + " " + arr[2] + " " + arr[0];
}

app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body.selected);

  //validate req.body.selected to check that a blocked dayTime is not being passed
  //clean it without those entries
  //if cleaned() is empty: do not create stripe session, just return
  //else: do what i was already

  const session = await stripe.checkout.sessions.create({
    line_items: Object.keys(req.body.selected)
      .sort()
      .map((item) => {
        return {
          price_data: {
            currency: "cad",
            product_data: {
              name:
                formatDate(item) +
                " @ " +
                req.body.selected[item].join(":00,\n ") +
                ":00",
            },
            unit_amount: 8000,
          },
          quantity: req.body.selected[item].length,
        };
      }),
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/account`,
    cancel_url: `${YOUR_DOMAIN}/booking`,
    metadata: {
      userId: req.body.customer.uid,
      dateAndTimes: JSON.stringify(req.body.selected),
    },
    customer_email: req.body.customer.email,
  });

  res.json({ url: session.url });
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const mongoose = require("mongoose");

mongoose.connect(uri);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const bookingsRouter = require("./routes/bookings");
app.use("/bookings", bookingsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
