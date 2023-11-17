const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", router);

const start = async () => {
	try {
		await mongoose.connect(`mongodb+srv://cookie:cookie123@cluster.2wdl1iw.mongodb.net/?retryWrites=true&w=majority

		`);
		app.listen(PORT, () => {
			console.log(`Сервер запущен на порту ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
