import React, { useEffect, useState } from 'react'
import "./AdminUser.css"
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UserRow from '../../components/UserRow/UserRow';

const URL = import.meta.env.VITE_API_URL;

export default function AdminUser({ users, setUsers }) {

    const [editUser, setEditUser] = useState(null);

    const {
            register,
            handleSubmit,
            setValue,
            setFocus,
            reset,
            watch,
            formState: { errors, isValid },
        } = useForm({
            mode: "onChange", // Valida mientras escribe el usuario
        });
    

    useEffect(() => {
		getUsers();
	}, []);

    async function getUsers() {
		try {
			const response = await axios.get(`${URL}/users`);
			const data = response.data.users;
            console.log(data)
			setUsers(data)
		} catch (error) {
			console.log("Error al obtener los usuarios: ", error);
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

    async function addUser(data) {
        if(editUser) {
            const id = editUser._id;

            const userToUpdate = {
                name: data.name,
                avatar: data.avatar,
                email: data.email
            };

            const response = await axios.put(`${URL}/users/${id}`, userToUpdate);

            const usersCopy = [...users];
            const index = usersCopy.findIndex((user) => user._id === id);
            usersCopy[index] = response.data;

            setUsers(usersCopy);

            setEditUser(null);

            Swal.fire({
                title: "Usuario actualizado",
                text: "El usuario se editó correctamente",
                icon: "success",
                theme: "dark"

            }
            );
        } else {
            
            const newUser = {
                name: data.name,
                avatar: data.avatar,
                email: data.email,
                password: data.password,
                createdAt: new Date().toLocaleString("es-ES", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }),
            };
    
            try {
                const response = await axios.post(`${URL}/users`, newUser);
    
                setUsers([...users, response.data.user]);
    
                reset();
    
                Swal.fire({
                    title: "Usuario creado",
                    text: "Se creó el nuevo usuario correctamente",
                    icon: "success",
                    theme: "dark"
                }
                );

                setFocus("name");
            } catch (error) {
                console.error("Error al registrar el usuario: ", error);
    
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al registrarte. Intentalo nuevamente",
                    icon: "error",
                    theme: "dark"
                }
                );
            }
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
					await axios.delete(`${URL}/users/${id}`);

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
                            {users.map((user) => (
                                <UserRow key={user._id} user={user} updateUser={updateUser} deleteUser={deleteUser} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}
