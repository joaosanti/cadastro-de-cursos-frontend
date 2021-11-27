import { useEffect, useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '../components/Button';
import Error from '../components/Error';
import Course from '../components/Course';
import CourseForm from '../components/CourseForm';
import CourseItem from '../components/CourseItem';
import Courses from '../components/Courses';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Main from '../components/Main';
import RadioButton from '../components/RadioButton';

import {
  apiCreateCourse,
  apiDeleteCourse,
  apiGetAllCourses,
  apiUpdateCourse,
} from '../services/apiService';

export default function CoursesPage() {
  // Back End
  const [allCourse, setallCourse] = useState([]);

  // Exclusivo para "Estudo"
  const [studycourses, setStudycourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    async function getallCourse() {
      try {
        const backEndallCourse = await apiGetAllCourses();

        setallCourse(backEndallCourse);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }

    getallCourse();
  }, []);

  useEffect(() => {
    setStudycourses(allCourse.map(course => ({ ...course, showTitle: true })));
  }, [allCourse]);

  function handleRadioShowDescriptionClick() {
    // prettier-ignore
    const updatedcourses =
      [...studycourses].map(course => ({ ...course, showTitle: false }));

    setStudycourses(updatedcourses);
    setRadioButtonShowTitle(false);
  }

  function handleRadioShowTitleClick() {
    // prettier-ignore
    const updatedcourses =
      [...studycourses].map(course => ({ ...course, showTitle: true }));

    setStudycourses(updatedcourses);

    setRadioButtonShowTitle(true);
  }

  function handleToggleCourse(courseId) {
    const updatedcourses = [...studycourses];
    const courseIndex = updatedcourses.findIndex(
      course => course.id === courseId
    );
    updatedcourses[courseIndex].showTitle =
      !updatedcourses[courseIndex].showTitle;

    setStudycourses(updatedcourses);
  }

  async function handleDeleteCourse(courseId) {
    try {
      // Back End
      await apiDeleteCourse(courseId);

      // Front End
      setallCourse(allCourse.filter(course => course.id !== courseId));

      setError('');
      toast.success('course excluído com sucesso!');
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditCourse(course) {
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedCourse(course);
  }

  function handleNewCourse() {
    setCreateMode(true);
    setSelectedCourse(null);
  }

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  let data = new Date();
  let dataFormatada = (data.getDate() + "/" + ((data.getMonth() + 1)) + "/" + (data.getFullYear()));


  async function handlePersist(title, description, image, teacher, classroom, dateCreate,
    dateUpdate) {
    if (createMode) {
      try {
        // Back End
        const newCourse = await apiCreateCourse(
          title,
          description,
          image,
          teacher,
          classroom,
          dateCreate,
          dateUpdate,
        );

        // Front End
        setallCourse([...allCourse, newCourse]);

        setError('');
        toast.success(`course "${title}" incluído com sucesso!`);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        // Back End
        await apiUpdateCourse(
          selectedCourse.id,
          title,
          description,
          image,
          teacher,
          classroom,
          dateCreate,
          dateUpdate = dataFormatada,
        );

        // Front End
        setallCourse(
          allCourse.map(course => {
            if (course.id === selectedCourse.id) {
              return {
                ...course,
                title,
                description,
                image,
                teacher,
                classroom,
                dateCreate,
                dateUpdate,
              };
            }
            return course;
          })
        );

        setSelectedCourse(null);
        setCreateMode(true);
        setError('');
        toast.success(`course "${title}" alterado com sucesso!`);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Cadastro de Cursos</Tab>
            <Tab>Novo Curso</Tab>
            <Tab>Cursos</Tab>
          </TabList>

          <TabPanel>
            {allCourse.map(Course => {
              return (
                <CourseItem
                  key={Course.id}
                  onDelete={handleDeleteCourse}
                  onEdit={handleEditCourse}
                >
                  {Course}
                </CourseItem>
              );
            })}
          </TabPanel>

          <TabPanel>
            <div className="my-4">
              <Button onButtonClick={handleNewCourse}>Novo Curso</Button>
            </div>

            <CourseForm createMode={createMode} onPersist={handlePersist}>
              {selectedCourse}
            </CourseForm>
          </TabPanel>

          <TabPanel>
            <div className="flex flex-row items-center justify-center space-x-4 m-4">
              <RadioButton
                id="radioButtonShowTitle"
                name="showInfo"
                buttonChecked={radioButtonShowTitle}
                onButtonClick={handleRadioShowTitleClick}
              >
                Curso
              </RadioButton>

              <RadioButton
                id="radioButtonShowDescription"
                name="showInfo"
                buttonChecked={!radioButtonShowTitle}
                onButtonClick={handleRadioShowDescriptionClick}
              >
                Descrição
              </RadioButton>
            </div>

            <Courses>
              {studycourses.map(
                ({
                  id,
                  title,
                  description,
                  image,
                  teacher,
                  classroom,
                  showTitle,
                }) => {
                  return (
                    <Course
                      key={id}
                      id={id}
                      title={title}
                      image={image}
                      teacher={teacher}
                      classroom={classroom}
                      description={description}
                      showCourseTitle={showTitle}
                      onToggleCourse={handleToggleCourse}
                    />
                  );
                }
              )}
            </Courses>
          </TabPanel>
        </Tabs>
      </>
    );
  }

  console.log(process.env.NODE_ENV);

  return (
    <>
      <ToastContainer />
      <Header>Cursos sobre Educação Financeira</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}
