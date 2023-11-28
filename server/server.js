const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://test:BIQN9wnySF4Nlpcl@cluster0.rc3cmmf.mongodb.net/?retryWrites=true&w=majority";
const stripe = require("stripe")(
  "sk_test_51OAKXCEAPdD1ekGcyvsex0Y1afIFbHTdgO1p48UYVwpnF3LWfTgWytzOfzv8HTvG6ADKGLd0YESfi7dwkA4pBUwK00ZlAz7Uyi"
);
var cors = require("cors");
const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();

const databaseUrl = process.env.DATABASE_URL;
const YOUR_DOMAIN = "https://amst-sports.onrender.com";

const corsOptions = {
  origin: "https://amst-sports.onrender.com",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const endpointSecret =
  "whsec_85d808219348c5cffde8e65ccea6db9f9f75aa97e0d41b8b83ba19261c7a7987";

const bodyParser = require("body-parser");

app.post(
  "/webhook",
  // bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];
    console.log("ENTERED WEBHOOK");

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
      console.log(lineItems);

      // Fulfill the purchase...
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

async function updateInventory(productId, quantity) {
  try {
    const response = await axios.patch("/api/products/updateQuantity", {
      productId,
      quantity,
    });

    console.log(
      `Inventory updated for product ID ${productId}. New quantity: ${response.data.quantity}`
    );
  } catch (error) {
    console.error(
      `Error updating inventory for product ID ${productId}:`,
      error.response.data
    );
    // Handle the error appropriately
  }
}

async function fulfillOrder(lineItems) {
  var dateTimes = JSON.parse(lineItems.dateAndTimes);
  var uid = lineItems.userId;
  console.log(uid);
  console.log(dateTimes);

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
    console.log(day);
    console.log(times);

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
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
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

async function run() {
  const database = client.db("amstsports");
  const bookings = database.collection("bookings");
  const query = { date: "2023-11-28" };
  const movie = await bookings.findOne(query);
  console.log(movie);
}

// run();

// console.log(bookings);

// async function run() {
// try {
//   // Connect the client to the server	(optional starting in v4.7)
//   await client.connect();
//   // Send a ping to confirm a successful connection
//   await client.db("admin").command({ ping: 1 });
//   console.log("Pinged your deployment. You successfully connected to MongoDB!");
// } finally {
//   // Ensures that the client will close when you finish/error
//   await client.close();
// }
// }
// run().catch(console.dir);

// const Booking = require("./models/booking");
const mongoose = require("mongoose");

// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("Connected to MongoDB Atlas");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB Atlas:", error);
//   });

// console.log(db.listCollections());

mongoose.connect(uri);
// mongoose.connect("mongodb://localhost/bookings");
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// console.log(db.client);

app.use(express.json());

const bookingsRouter = require("./routes/bookings");
app.use("/bookings", bookingsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
