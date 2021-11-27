import {
  AiOutlineEdit as EditIcon,
  AiOutlineDelete as DeleteIcon,
} from 'react-icons/ai';

export default function CourseItem({
  children: Course,
  onDelete = null,
  onEdit = null,
}) {
  const { title, description, image, teacher, classroom, dateCreate, dateUpdate } = Course;

  function handleDeleteIconClick() {
    if (onDelete) {
      onDelete(Course.id);
    }
  }

  function handleEditIconClick() {
    if (onEdit) {
      onEdit(Course);
    }
  }

  return (
    <div className="border p-2 m-2">
      <ul className="flex flex-col space-y-4">
        <li>
          <strong>Título:</strong> <span>{title}</span>
        </li>

        <li>
          <strong>Descrição:</strong> <span>{description}</span>
        </li>

        <li>
          <strong>Imagem:</strong> <span>{image}</span>
        </li>

        <li>
          <strong>Professor:</strong> <span>{teacher}</span>
        </li>

        <li>
          <strong>Sala:</strong> <span>{classroom}</span>
        </li>

        <li>
          <strong>Criado:</strong> <span>{dateCreate} - <strong>Atualizado: </strong> {dateUpdate}</span>
        </li>
      </ul>

      <div className="mt-4 flex flex-row items-center justify-end space-x-4">
        <EditIcon
          onClick={handleEditIconClick}
          className="cursor-pointer"
          size={24}
        />

        <DeleteIcon
          onClick={handleDeleteIconClick}
          className="cursor-pointer"
          size={24}
        />
      </div>
    </div>
  );
}
