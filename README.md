# Инструкция по запуску проекта

---

```bash
1. Клонируйте репозиторий и перейдите в папку проекта:
    git clone <https://github.com/Filippov-Nikolay/tentai>
    cd tentai

2. Установите все зависимости:
    npm install

3. Установите пакет для работы с Sass:
    npm install sass

4. Зарегистрируйтесь на сайте OpenRouteService и получите API ключ
    (сайт: https://openrouteservice.org/),
    (страница API: https://account.heigit.org/manage/key)

5. Создайте файл .env в корне проекта и добавьте в него ваш ключ:
    REACT_APP_API_KEY_ROUTE=ваш_ключ_от_OpenRouteService

6. Запустите проект:
    npm start

