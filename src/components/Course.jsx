export default function Course({
  id,
  title = 'Título do card',
  description = 'Descrição do card, que pode conter mais palavras que o título',
  image = 'teste.jpg',
  teacher = 'Peter',
  classroom = 'googlemeet',
  showCourseTitle = true,
  onToggleCourse = null,
}) {
  function handleCardClick() {
    if (onToggleCourse) {
      onToggleCourse(id);
    }
  }

  const fontSizeClassName = showCourseTitle ? 'text-xl' : 'text-sm';

  return (
    <div
      className={`shadow-lg p-4 m-2 w-80 h-72 cursor-pointer
                  flex flex-col items-center justify-center
                  font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      onClick={handleCardClick}
    >
      {showCourseTitle ? (
        <img src={image} alt=""></img>
      ) : (
        [
          <img src={image} alt=""></img>,
          ' Descrição: ',
          description,
          ' Professor: ',
          teacher,
          <a href={classroom}>Sala</a>,
        ]
      )}
    </div>
  );
}
