import React, { useEffect, useState } from 'react'
import "./AdminUser.css"
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UserRow from '../../components/UserRow/UserRow';
import { useAuth } from '../../components/context/AuthContext';

const URL = import.meta.env.VITE_API_URL;

export default function AdminUser({ users, setUsers }) {
    const { user: currentUser, logout } = useAuth();
    const [editUser, setEditUser] = useState(null);

    const {
            register,
            handleSubmit,
            setValue,
            reset,
            watch,
            formState: { errors, isValid },
        } = useForm({
            mode: "onChange", // Valida mientras escribe el usuario
        });

        const getAuthHeaders = () => {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            return {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`,
                }
            }
        }
    

    useEffect(() => {
		getUsers();
	}, []);

    async function getUsers() {
		try {
			const response = await axios.get(`${URL}/users?timestamp=${Date.now()}`, // Agregar un timestamp a la URL para evitar el caché
                                                getAuthHeaders());

            if(!response.data?.users) {
                setUsers([]);
                throw new Error("Formato de respuesta inesperado");
            }
			setUsers(response.data.users);
		} catch (error) {
            if(error.response?.status === 401) {
                Swal.fire("Sesión expirada", "Inicia sesión nuevamente", "error");
                logout();
                window.location.href = "/login";
            } else {
                console.log("Error al obtener los usuarios: ", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron cargar los usuarios",
                    icon: "error",
                    theme: "dark"
                });
                setUsers([])
            }
		}
	}

    useEffect(() => {
        if(editUser) {
            setValue("name", editUser.name);
            setValue("email", editUser.email);
            setValue("avatar", editUser.avatar);
        } else {
            reset()
        }

        document.getElementById("form").scrollIntoView({ behavior: "smooth" })

    }, [editUser])

    async function addUser(userData) {
        try {
            if(editUser) {
                const response = await axios.put(
                    `${URL}/users/${editUser._id}`,
                    userData,
                    getAuthHeaders()
                );

                setUsers(prevUsers => {
                    prevUsers.map(user =>
                        user._id === editUser.id ? response.data.user : user
                    )
                })

                Swal.fire("Usuario actualizado!", "", "success");
            } else {
                const response = await axios.post(
                    `${URL}/users`,
                    userData,
                    getAuthHeaders()
                );
                
                setUsers(prevUsers => [...prevUsers, response.data.user]);
                Swal.fire("Usuario creado!", "", "success");
            }
            
            setEditUser(null);
            reset();

            await getUsers();
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Error en la operación",
                icon: "error"
            });
        }
	}

    async function updateUser(user) {
        setEditUser(user);
    }

    function deleteUser(id) {
		try {
			Swal.fire({
				title: "¿Seguro que quieres eliminar este usuario?",
				text: "No volverá a estar disponible.",
				icon: "warning",
				showCancelButton: true,
				cancelButtonText: "Cancelar",
				confirmButtonText: "Eliminar",
				confirmButtonColor: "#F00",
				cancelButtonColor: "#ccc",
				reverseButtons: true,
				theme: "dark"
			}).then(async (result) => {
				if (result.isConfirmed) {
					await axios.delete(`${URL}/users/${id}`, getAuthHeaders());

					const usersWithoutDeleted = users.filter(
						(user) => user._id !== id
					);

					setUsers(usersWithoutDeleted);

					Swal.fire({
						title: "Usuario eliminado",
						text: "El usuario fue eliminado correctamente",
						icon: "success",
						theme: "dark"
					}
					);
				}
			});
		} catch (error) {
			Swal.fire({
				title: "No se pudo borrar el usuario",
				icon: "error",
				theme: "dark"
			});
			console.error(error);
		}
	}

    return (
        <>
            <main className="main-admin-user-container">
                <form className="admin-form" id="form" onSubmit={handleSubmit(addUser)}>
                    <div className="input-group">
                        <label htmlFor="name">Nombre del usuario</label>
                        <input type="text" {...register("name", {
                            required: "se requiere el nombre del usuario",
                            minLength: {
                                value: 6,
                                message: "El nombre debe tener al menos 6 caracteres."
                            },
                            maxLength: {
                                value: 30,
                                message: "El nombre no puede tener más de 30 caracteres."
                            },
                            pattern: {
                                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                message: "El nombre no puede contener caracteres especiales.",
                            },
                        })}
                        id='name'
                        placeholder='John Doe' 
                        />
                        {errors.name && (<span className='error'>{errors.name.message}</span>)}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" {...register("email", {
							required: "Se requiere un correo electrónico",
							minLength: {
								value: 8,
								message: "El correo debe tener al menos 8 caracteres.",
							},
						    maxLength: {
								value: 50,
								message: "El correo no puede tener mas de 50 caracteres",
							},
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: "El correo no es válido.",
							},
						})}
						id="email"
						placeholder="johndoe24@gmail.com"
    				    />
						{errors.email && (
							<span className="error">{errors.email.message}</span>
						)}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" {...register("password", {
                            required: "Se requiere una contraseña",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres."
                            }
                        })} 
                        id='password'
                        placeholder='********'
                        />
                        {errors.password && (<span className='error'>{errors.password.message}</span>)}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password2">Repetir contraseña</label>
                        <input type="password" {...register("password2", {
                            required: "Debes repetir la contraseña.",
                            validate: (value) => value === watch("password") || "Las contraseñas no coinciden."
                        })} 
                        id='password2'
                        placeholder='********'
                        />
                    </div>
                    <div className="input-group">
						<label htmlFor="avatar">Foto de perfil</label>
						<input type="url" {...register("avatar", {
							required: "Se requiere una foto de perfil."
						})}
						id="avatar"
						placeholder="URL de la imagen" 
                        />
					</div>
                    <button className="button" type="submit" disabled={!isValid}>
						{editUser ? "Actualizar usuario" : "Crear usuario"}
					</button>
                </form>
                
                <div className="table-responsive">
                    <table border={1} className='admin-table'>
                        <thead>
                            <tr>
                                <th>AVATAR</th>
                                <th>NOMBRE</th>
                                <th>CORREO</th>
                                <th>FECHA DE CREACION</th>
                            </tr>
                        </thead>
                        <tbody className='user-rows'>
                            {users?.map((user) => (
                                <UserRow key={user._id} user={user} updateUser={updateUser} deleteUser={deleteUser} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}
