import React from 'react'

interface Types {
    name: string
    exerciseCount: number
}

interface Content {
    courseParts: Array<Types>
}
const Content: React.FC<Content> = ({ courseParts }) => {
    return (
        <div>
            { courseParts.map((content) => (
                <div key={content.name}>
                    <p>{ content.name }{ content.exerciseCount }</p>
                </div>   
            ))}
        </div>
    )
}

export default Content