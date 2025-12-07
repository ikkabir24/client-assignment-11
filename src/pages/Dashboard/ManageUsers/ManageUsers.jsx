import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [modalType, setModalType] = useState("");
    const axiosSecure = useAxiosSecure();


    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const result = await axiosSecure('/users')
            return result.data;
        }
    });


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues:{
            role: selectedUser?.role,
        }
    });

    // modal opening
    const openModal = (user, type) => {
        setSelectedUser(user);
        setModalType(type);
        document.getElementById("manageUserModal").showModal();
    };

    // colse modal
    const closeModal = () => {
        document.getElementById("manageUserModal").close();
        reset();
        setSelectedUser(null);
    };

    // role update
    const onSubmitRole = (data) => {
        const role = {
            role: data.role,
        }
        closeModal()
        Swal.fire({
            title: "Are you sure you want to change the role of this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/${selectedUser._id}`, role)
                    .then(() => {
                        Swal.fire({
                            title: "Done!",
                            text: "User role has been changed.",
                            icon: "success"
                        });
                        refetch();
                    })
            }
        });
    };

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <h1 className="text-lg font-semibold p-3">Manage Users: {users.length}</h1>

      
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Name <span className='md:hidden'>& Email</span></th>
                            <th className='hidden md:table-cell'>Email</th>
                            <th>Current Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <div className="font-semibold">{user.name}</div>
                                    <p className='block md:hidden'>{user.email}</p>
                                </td>

                                <td className='hidden md:table-cell'>{user.email}</td>

                                <td>
                                    <span className="badge badge-primary">{user.role}</span>
                                </td>

                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-sm btn-info text-white"
                                        onClick={() => {openModal(user, "role"); setSelectedUser(user)}}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

       
            <dialog id="manageUserModal" className="modal">
                <div className="modal-box">
              
                    {modalType === "role" && (
                        <form onSubmit={handleSubmit(onSubmitRole)}>
                            <h3 className="text-xl font-bold mb-4">
                                Update Role for {selectedUser?.name}
                            </h3>

                            <select
                                {...register("role", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="borrower">Borrower</option>
                            </select>

                            {errors.role && (
                                <p className="text-red-500 text-sm">Role is required</p>
                            )}

                            <div className="modal-action">
                                <button
                                    type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                <button className="btn" type="button" onClick={closeModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default ManageUsers;