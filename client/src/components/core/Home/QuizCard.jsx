
import { useEffect, useState } from 'react';
import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';

const QuizCard = ({ quiz }) => {
    const [attempted, setAttempted] = useState(false)
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        setAttempted(user?.attemptedQuizzes?.includes(quiz._id) ? true : false)
    }, [user])

    return (
        <Link to={`/quiz/${quiz._id}`} className='border border-slate-600 bg-slate-900 p-3 rounded-lg relative overflow-hidden'>
            <h2 className='text-xl line-clamp-2 border-b border-slate-600 pb-3 mb-2'>{quiz.title}</h2>
            <span className='font-thin'>
                <p className='line-clamp-2'>{quiz.description}</p>
                <div className='flex flex-wrap gap-2 mt-2 text-sm'>
                    <span className='bg-blue-600 px-2 py-1 rounded'>Semester {quiz.semester}</span>
                    <span className='bg-purple-600 px-2 py-1 rounded'>{quiz.type}</span>
                </div>
                <span className='flex gap-3 mt-2'>
                    <p>{quiz.createdBy.username}</p>
                    |
                    <p>{formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}</p>
                </span>
            </span>

            <span className='absolute top-[10%] right-[-10%] rotate-[30deg]'>
                {
                    attempted && (
                        <span className='bg-green-600 text-white px-10 py-1 text-sm'>Completed</span>
                    )
                }
            </span>
        </Link>
    )
}

export default QuizCard