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
