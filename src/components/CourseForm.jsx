import TextInput from './TextInput';
import TextArea from './TextArea';
import { useEffect, useState } from 'react';
import Button from './Button';
import Error from './Error';

export default function CourseForm({
  createMode = true,
  onPersist = null,
  children: Course = null,
}) {
  const [title, setTitle] = useState(Course?.title || '');
  const [description, setDescription] = useState(Course?.description || '');
  const [image, setImage] = useState(Course?.image || '');
  const [teacher, setTeacher] = useState(Course?.teacher || '');
  const [classroom, setClassroom] = useState(Course?.classroom || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (createMode) {
      setTitle('');
      setDescription('');
      setImage('');
      setTeacher('');
      setClassroom('');
    }
  }, [createMode]);

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function handleImageChange(newImage) {
    setImage(newImage);
  }
  function handleTeacherChange(newTeacher) {
    setTeacher(newTeacher);
  }
  function handleClassroomChange(newClassroom) {
    setClassroom(newClassroom);
  }

  function clearFields() {
    setTitle('');
    setDescription('');
    setImage('');
    setTeacher('');
    setClassroom('');
  }

  function validateForm() {
    return (
      title.trim() !== '' &&
      description.trim() !== '' &&
      image.trim() !== '' &&
      teacher.trim() !== '' &&
      classroom.trim() !== ''
    );
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      setError('');

      if (onPersist) {
        onPersist(title, description, image, teacher, classroom);
        clearFields();
      }
    } else {
      setError('Todos os campos são obrigatórios.');
    }
  }

  function handleFormReset() {
    clearFields();
  }

  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';

  return (
    <form
      className={`${backgroundClassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <h2 className="text-center font-semibold">Curso</h2>

      <TextInput
        labelDescription="Título:"
        inputValue={title}
        onInputChange={handleTitleChange}
      />
      <TextArea
        labelDescription="Descrição:"
        textAreaValue={description}
        onTextAreaChange={handleDescriptionChange}
      />

      <TextInput
        labelDescription="Image:"
        inputValue={image}
        onInputChange={handleImageChange}
      />

      <TextInput
        labelDescription="Professor:"
        inputValue={teacher}
        onInputChange={handleTeacherChange}
      />

      <TextInput
        labelDescription="Sala:"
        inputValue={classroom}
        onInputChange={handleClassroomChange}
      />

      <div className="flex items-center justify-between">
        {error.trim() !== '' ? <Error>{error}</Error> : <span>&nbsp;</span>}

        <div>
          <Button colorClass="bg-red-200" type="reset">
            Limpar
          </Button>

          <Button colorClass="bg-green-300" type="submit">
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
