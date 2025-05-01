import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function UserRow({ user, updateUser, deleteUser }) {
    return (
        <>
            <tr>
                <td className='image-cell'>
                    <img src={user.avatar} alt={user.name} className='table-image' />
                </td>
                <td className='name-cell'>
                    {user.name}
                </td>
                <td className="email-cell">
                    {user.email}
                </td>
                <td className="creation-cell">
                    {user.createdAt}
                </td>
                <td className="tools-cell">
                    <div className="icon-container">
                        <button className='btn' title='Editar' onClick={() => updateUser(user)}>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button className='btn delete' title='Eliminar' onClick={() => deleteUser(user._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}
