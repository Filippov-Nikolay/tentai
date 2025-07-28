# Инструкция по запуску проекта

---

```bash
1. Клонируйте репозиторий и перейдите в папку проекта:
    git clone https://github.com/Filippov-Nikolay/tentai
    cd tentai

2. Установите все зависимости:
    npm install

5. Зарегистрируйтесь на сайте OpenRouteService и получите API ключ
    (сайт: https://openrouteservice.org/),
    (страница API: https://account.heigit.org/manage/key)

6. Создайте файл .env в корне проекта и добавьте в него ваш ключ:
    REACT_APP_API_KEY_ROUTE = "ваш_ключ_от_OpenRouteService"

7. Запустите проект:
    npm start
```

--- 

# Описание (уточнения):
    - При изменении маршрутов (Route), данные сохраняются в localStorage с задержкой 400 мс (используется debounce для снижения количества запросов к API).
    - В правом блоке заказа (RightBar/Order) отображаются только первая и последняя точки маршрута из списка Route.
