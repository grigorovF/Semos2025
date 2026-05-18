import { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await fetch("http://localhost:9002/api/v1/courses");

    const data = await res.json();

    setCourses(data.data.courses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>

      {courses.map((course) => (
        <div key={course._id}>
          <h3>{course.title}</h3>

          <p>{course.description}</p>

          <p>{course.price}$</p>
        </div>
      ))}
    </div>
  );
}

export default Courses;
