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
  classroom
) {
  const newCourse = create('/course', {
    id: getNewId(),
    title,
    description,
    image,
    teacher,
    classroom,
  });

  return newCourse;
}

export async function apiUpdateCourse(
  courseId,
  title,
  description,
  image,
  teacher,
  classroom
) {
  const updatedCourse = edit(`/course/${courseId}`, {
    title,
    description,
    image,
    teacher,
    classroom,
  });

  return updatedCourse;
}
