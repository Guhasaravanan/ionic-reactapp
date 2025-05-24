import React, { useState } from 'react';
import { IonItem, IonInput, IonButton } from '@ionic/react';

interface Props {
  onAdd: (todo: string) => void;
}

const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonItem>
        <IonInput
          placeholder="Add new todo"
          value={value}
          onIonChange={(e) => setValue(e.detail.value!)}
        />
        <IonButton type="submit">Add</IonButton>
      </IonItem>
    </form>
  );
};

export default TodoForm;
