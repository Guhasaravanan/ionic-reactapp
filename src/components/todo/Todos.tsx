import React from 'react';
import { IonList, IonItem, IonLabel, IonCheckbox, IonButton } from '@ionic/react';

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

interface Props {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete }) => (
  <IonList>
    {todos.map((item) => (
      <IonItem key={item.id}>
        <IonCheckbox
          slot="start"
          checked={item.completed}
          onIonChange={() => onToggle(item.id, !item.completed)}
        />
        <IonLabel>{item.todo}</IonLabel>
        <IonButton slot="end" color="danger" onClick={() => onDelete(item.id)}>
          Delete
        </IonButton>
      </IonItem>
    ))}
  </IonList>
);

export default TodoList;
