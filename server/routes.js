const Router = require("express");
const router = new Router();
const controller = require("./controller");
const { check } = require("express-validator");

router.post(
	"/registration",
	[
		check("username", "Имя пользователя не может быть пустым").trim().notEmpty(),
		check("password", "Пароль должен содержать от 4 до 15 символов").isLength({
			min: 4,
			max: 15,
		}),
		check("email", "Email не может быть пустым").trim().notEmpty(),
	],
	controller.registration
);
router.post("/login", controller.login);

module.exports = router;
