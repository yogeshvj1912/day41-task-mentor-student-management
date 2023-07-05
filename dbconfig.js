const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://admin:iXatwYMuvUwaIeMd@cluster0.jvegpfy.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority
  `
);
