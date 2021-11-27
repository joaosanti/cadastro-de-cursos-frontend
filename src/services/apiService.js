import { read, exclude, create, edit } from './httpService';
import { getNewId } from './idService';

export async function apiGetAllCourses() {
  const allCourses = await read('/course');
  return allCourses;
}

export async function apiDeleteCourse(courseId) {
  await exclude(`/course/${courseId}`);
}

export async function apiCreateCourse(
  title,
  description,
  image,
  teacher,
  classroom,
  dateCreate,
  dateUpdate,
) {
  const newCourse = create('/course', {
    id: getNewId(),
    title,
    description,
    image,
    teacher,
    classroom,
    dateCreate,
    dateUpdate,
  });

  return newCourse;
}

export async function apiUpdateCourse(
  courseId,
  title,
  description,
  image,
  teacher,
  classroom,
  dateCreate,
  dateUpdate,
) {
  const updatedCourse = edit(`/course/${courseId}`, {
    title,
    description,
    image,
    teacher,
    classroom,
    dateCreate,
    dateUpdate,
  });

  return updatedCourse;
}
