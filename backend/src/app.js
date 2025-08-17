const express = require("express");
const app = express();

const path = require('path')
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser")
const Redis = require('ioredis');



// const redis = new Redis({
//   host: '192.168.1.100',   // Replace with your Redis server IP
//   port: 6379,              // Replace with your Redis port if different
//   password: 'yourpassword' // If Redis is password-protected
// });

// //Uncomment this when using local development
// //From this to
// // const allowedOrigins = [
// //   "http://localhost:3000",
// //    "http://34.142.129.6",
// //   "https://dev.damselbiz.com",
// //   "https://dev.app.damselbiz.com"
// // ];

// // // CORS options
// // const corsOptions = {
// //   origin: (origin, callback) => {
// //     if (!origin || allowedOrigins.includes(origin)) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error('Not allowed by CORS'));
// //     }
// //   },
// //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
// //   allowedHeaders: [
// //     "Origin",
// //     "X-Requested-With",
// //     "Content-Type",
// //     "Accept",
// //     "Authorization",
// //     "X-Token" 
// //   ],
// //   credentials: true,
// // };

// // app.use(cors(corsOptions));
// //this

app.use(morgan('tiny'))
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// // Swagger setup
// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Damsel API",
//       version: "0.0.1",
//       description: "Damsel API documentation",
//     },
//     servers: [
//       {
//         url: "http://localhost:8000/",
//         description: "Local server",
//       },
//       {
//         url: "http://34.142.129.6",
//         description: "Live server",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// //service imports
// const {autoInactiveExpiredOffers} = require("./services/offer.service");

// // Routes imports
const {base_router} = require('./routes');
// const categoryRouter = require("./routes/category.route");
// const subcategoryRouter = require("./routes/subcategory.route");
// const brandRouter = require("./routes/brand.route");
// //const stockRouter = require("./routes/stock.route");
// const productRouter = require("./routes/product.route");
// const ratingRouter = require("./routes/rating.route");
// // const swaggerJSDoc = require("swagger-jsdoc");
// const offerRouter = require("./routes/offer.route");
// const tagsRouter = require("./routes/tags.route");
// const userRouter = require('./routes/user.route');
// const contactRouter = require('./routes/contact.route');
// const orderRouter = require('./routes/order.route');
// const testimonialRouter = require('./routes/testimonials.route');
// const FAQRouter = require('./routes/faq.route');
// //const bannerRouter = require('./routes/banner.route');
// //autoInactiveExpiredOffers("* * * * * *", true);

// // Offer Service - Automatically deactivate expired offers
// // This line schedules a cron job to run every second and also executes 
// // the `autoInactiveExpiredOffers` function once when the backend restarts or starts.
// //
// // - The schedule "* * * * * *" represents every second. For more details on cron 
// //   syntax, refer to the node-cron documentation: 
// //   https://github.com/node-cron/node-cron/blob/master/README.md
// // - The `true` parameter ensures that expired offers are deactivated immediately 
// //   upon backend startup, in addition to the scheduled execution.
// autoInactiveExpiredOffers("0 0 * * *", true);


// // Routes
app.use("/api/v1/", base_router)
// app.use("/api/v1/categories", categoryRouter);
// app.use("/api/v1/subcategories", subcategoryRouter);
// app.use("/api/v1/brands", brandRouter);
// app.use("/api/v1/products", productRouter);
// app.use("/api/v1/ratings", ratingRouter);
// app.use("/api/v1/offers", offerRouter);
// app.use("/api/v1/banners", bannerRouter);
// app.use("/api/v1/orders", orderRouter);

// app.use("/api/v1/tags", tagsRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/contacts', contactRouter);
// app.use('/api/v1/testimonial', testimonialRouter);
// app.use('/api/v1/faq', FAQRouter);

module.exports = app