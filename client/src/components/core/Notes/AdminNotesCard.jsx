

import React from 'react'
import { FaDownload, FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminNotesCard = ({ note, onDelete }) => {
    const navigate = useNavigate()
    const { token } = useSelector(state => state.auth)

    const handlePreview = () => {
        const baseServerUrl = import.meta.env.VITE_BASE_URL.replace('/api/v1', '');
        window.open(`${baseServerUrl}/${note.filePath}`, '_blank')
    }

    const handleDownload = async () => {
        try {
            const baseServerUrl = import.meta.env.VITE_BASE_URL.replace('/api/v1', '');
            const response = await fetch(`${baseServerUrl}/api/v1/notes/download/${note._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Download failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${note.title}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download error:', error);
        }
    }

    const handleEdit = () => {
        navigate(`/dashboard/edit-notes/${note._id}`, { state: { noteData: note } })
    }

    return (
        <div className='bg-slate-900 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-500 transition-all duration-300'>
            <div className='p-4'>
                <h3 className='text-xl font-semibold mb-2'>{note.title}</h3>
                <p className='text-slate-400 mb-3'>{note.description}</p>
                
                <div className='flex gap-2 mb-4'>
                    <span className='bg-blue-600 px-2 py-1 rounded text-sm'>
                        Semester {note.semester}
                    </span>
                    <span className='bg-purple-600 px-2 py-1 rounded text-sm'>
                        {note.type}
                    </span>
                </div>

                <div className='flex items-center justify-between text-sm text-slate-400'>
                    <p>Uploaded {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
                </div>
            </div>

            <div className='flex border-t border-slate-700'>
                {note.filePath && (  
                    <>
                        <button
                            onClick={handlePreview}
                            className='flex-1 flex items-center justify-center gap-2 py-3 hover:bg-slate-800 transition-all duration-300'
                        >
                            <FaEye /> Preview
                        </button>
                        <button
                            onClick={handleDownload}
                            className='flex-1 flex items-center justify-center gap-2 py-3 hover:bg-slate-800 transition-all duration-300 border-l border-slate-700'
                        >
                            <FaDownload /> Download
                        </button>
                    </>
                )}
                <button
                    onClick={handleEdit}
                    className='flex-1 flex items-center justify-center gap-2 py-3 hover:bg-slate-800 transition-all duration-300 border-l border-slate-700'
                >
                    <FaEdit /> Edit
                </button>
                <button
                    onClick={() => onDelete(note._id)}
                    className='flex-1 flex items-center justify-center gap-2 py-3 hover:bg-red-600 transition-all duration-300 border-l border-slate-700'
                >
                    <FaTrash /> Delete
                </button>
            </div>
        </div>
    )
}

export default AdminNotesCard