import React from 'react'


interface Types {
    name: string
    exerciseCount: number
}

interface Content {
    exerciseCount: Array<Types>
}
const Total: React.FC<Content> = ({ exerciseCount }) => {
    const exercisesCount = exerciseCount.map((exercise) => exercise.exerciseCount )
    return (
        <div>
            <p>Total Exercises:
            { exercisesCount.reduce((acc: number, current: number) => acc + current )}</p>
        </div>
    )
}

export default Total