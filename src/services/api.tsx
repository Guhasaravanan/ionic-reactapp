import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export const fetchTodos = () => axios.get(API_URL);
export const addTodo = (todo: {
  todo: string;
  completed?: boolean;
  userId: number;
}) => axios.post("https://dummyjson.com/todos/add", todo);

export const updateTodo = (
  id: number,
  data: { todo: string; completed: boolean }
) => axios.put(`${API_URL}/${id}`, data);
export const deleteTodo = (id: number) => axios.delete(`${API_URL}/${id}`);
