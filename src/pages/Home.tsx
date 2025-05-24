import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonToast,
} from "@ionic/react";
import TodoList from "../components/todo/Todos";
import TodoForm from "../components/todo/TodoForm";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../services/api";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toastMsg, setToastMsg] = useState("");

  const loadTodos = async () => {
    try {
      const res = await fetchTodos();
      setTodos(res.data.todos);
    } catch {
      setToastMsg("Failed to load todos");
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async (todo: string) => {
    try {
      // Add userId and completed fields as required by the API
      const res = await addTodo({ todo, completed: false, userId: 1 });
      setTodos([res.data, ...todos]);
      setToastMsg("Todo added!");
    } catch {
      setToastMsg("Failed to add todo");
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      await updateTodo(id, {
        todo: todos.find((t) => t.id === id)?.todo || "",
        completed,
      });
      setTodos(todos.map((t) => (t.id === id ? { ...t, completed } : t)));
    } catch {
      setToastMsg("Failed to update todo");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
      setToastMsg("Todo deleted!");
    } catch {
      setToastMsg("Failed to delete todo");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TodoForm onAdd={handleAdd} />
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
        <IonToast
          isOpen={!!toastMsg}
          message={toastMsg}
          duration={2000}
          onDidDismiss={() => setToastMsg("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
