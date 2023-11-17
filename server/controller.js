const User = require("./models/User");
const { validationResult } = require("express-validator");

class Controller {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: "Ошибка регистрации", errors });
			}

			const { username, password, email, gender } = req.body;

			const isUsernameExisted = await User.findOne({ username });
			if (isUsernameExisted) {
				return res
					.status(400)
					.json({ message: "Пользователь с таким именем уже зарегистрирован" });
			}
			const isEmailExisted = await User.findOne({ email });
			if (isEmailExisted) {
				return res
					.status(400)
					.json({ message: "Пользователь с таким email уже зарегистрирован" });
			}

			const user = new User({ username, password, email, gender });
			await user.save();
			return res.json({ message: "Пользователь успешно зарегистрирован" });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: "Ошибка регистрации" });
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username });
			if (!user) {
				return res.status(400).json({ message: "Пользователь с таким именем не найден" });
			}
			const validPassword = user.password;
			if (validPassword !== password) {
				return res
					.status(400)
					.json({ message: "Для данного пользователя указан неверный пароль" });
			}
			return res.json({ message: "Успешная авторизация" });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: "Ошибка авторизации" });
		}
	}
}

module.exports = new Controller();
