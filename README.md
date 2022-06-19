# crud-api

Проект в режиме разработки запускается командой: "npm run start:dev"
Проект в режиме production запускается командой: "npm run start:prod"

Сервер для запуска - http://localhost:3000/

Список ручек для проверки:
GET api/user - возвращает всех пользователей
GET api/user/${userId} - возвращает пользователя по id
POST api/user - создает пользователя (пример для проверки: {"username":"Inga Baranets","age":33,"hobbies":["programming","yoga","travelling"]}
PUT api/user/{userId} - обновляет пользователя по id
DELETE api/user/${userId} - удаляет пользователя по id

Есть тесты по трем сценариям:

1. Получение всех пльзователей (файл getUsers.test.js)
2. Создание пользователя (файл createAndGetUser.test.js)
3. Получение пользователя по id из второго сценария (файл createAndGetUser.test.js)
   Запуск тестов: "npm run test"
