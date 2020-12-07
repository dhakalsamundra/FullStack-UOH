import React from 'react'

interface Type {
    title: string
}
const Header: React.FC<Type> = ({ title }) => {
    return (
        <div>
            <h1>{ title }</h1>
        </div>
    )
}

export default Header