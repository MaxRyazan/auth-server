import { IUser } from "./src/globalClasses/IUser";

const user1 = new IUser('Max', 'max@mail.ru', '$2a$05$ATJn4QvJWzrNJMQ1o6vFduKthN5WQIgVavcD45VuNhwHaQ.NbbBO2')
user1.refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heCIsImlhdCI6MTY5OTc5NjA4OSwiZXhwIjoxNzAwNDAwODg5fQ.QUUVBpoqhkU4fhSJl4zMMA-uWYPgBWt5GktTw92DxNM"
export const USER_DB = [user1]