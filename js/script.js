document.addEventListener("DOMContentLoaded", () => {
	// Forms Switch
	const loginBtn = document.querySelector(".login-btn"),
		registerBtn = document.querySelector(".register-btn"),
		formContainer = document.querySelector(".form-container"),
		body = document.body;

	function switcher(classToAdd, classToRemove) {
		formContainer.classList.remove(classToRemove);
		formContainer.classList.add(classToAdd);
		body.classList.remove(classToRemove);
		body.classList.add(classToAdd);
	}

	loginBtn.addEventListener("click", () => {
		switcher("login", "register");
	});

	registerBtn.addEventListener("click", () => {
		switcher("register", "login");
	});

	const formRegister = document.querySelector(".form-register");
	const formLogin = document.querySelector(".form-login");
	const noticeBlock = document.createElement("div");
	noticeBlock.classList.add("form__notice");

	// Fetch
	const postData = async (url, data) => {
		const response = await fetch(url, {
			method: "POST",
			body: data,
			headers: {
				"Content-type": "application/json",
			},
		});

		const responseJSON = await response.json();

		if (!response.ok) {
			throw new Error(`${responseJSON.errors?.errors[0]?.msg || responseJSON.message}`);
		}

		return responseJSON;
	};

	// Получение данных из форм и преобразование в json
	function parseData(form) {
		const formData = new FormData(form);
		if (form === formRegister) {
			formData.delete("password-repeat");
		}
		const json = JSON.stringify(Object.fromEntries(formData.entries()));
		return json;
	}

	// Проверка совпадают ли пароли
	function isPasswordRepeated() {
		const password = formRegister.querySelector(".form__password").value;
		const passwordRepeat = formRegister.querySelector(".form__password-repeat").value;

		console.log(password, passwordRepeat);
		if (password === passwordRepeat) {
			return true;
		}

		return false;
	}

	// Уведомление об успешности авторизации/регистрации
	function showNotice(form, isSuccess, message) {
		const formHeader = form.querySelector(".form__header");
		noticeBlock.textContent = message;

		if (isSuccess) {
			noticeBlock.classList.remove("notice-error");
			noticeBlock.classList.add("notice-success");
		} else {
			noticeBlock.classList.remove("notice-success");
			noticeBlock.classList.add("notice-error");
		}

		formHeader.append(noticeBlock);
	}

	// Подвязка fetch к форме
	function bindPostData(form, url) {
		form.addEventListener("submit", evt => {
			evt.preventDefault();

			if (form === formRegister && !isPasswordRepeated()) {
				showNotice(form, false, "Пароли не совпадают");
				return;
			}

			const data = parseData(form);
			postData(url, data)
				.then(data => {
					showNotice(form, true, data.message);
					form.reset();
				})
				.catch(e => {
					showNotice(form, false, e.message);
				});
		});
	}

	bindPostData(formRegister, "http://localhost:5000/auth/registration");
	bindPostData(formLogin, "http://localhost:5000/auth/login");
});
