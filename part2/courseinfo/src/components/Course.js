import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
  </div>
)

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return <p><strong>total of {sum} exercises</strong></p>
}

const Course = ({ course }) => (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
)

export default Course;