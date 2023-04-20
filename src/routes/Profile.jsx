import { useRef, useState } from "react";

//  Redux
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from "../features/user/userSlice";

//  Components
import { Container } from "../components/Container";
import { FormControl } from "../components/FormControl";
import { Paragraph } from "../components/Paragraph";
import { Button } from "../components/Button";
import { Subtitle } from "../components/Subtitle";
import { Title } from "../components/Title";
import { Alert } from "../components/Alert";

//  React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//  Icons
import { BsPencilFill } from "react-icons/bs";
import { MdAlternateEmail } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillLike, AiFillDislike } from "react-icons/ai";

//  Profile validation schema
import { profileSchema } from "../utils/validationSchemas";

export const Profile = () => {
    //  Form handling
    const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(profileSchema) });
    const { errors } = formState;

    //  Redux state
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser[0]);
    const userInfo = useSelector(state => {
        return state.user.users.filter(u => u.id === user?.id)[0];
    });

    //  To show alert
    const alertContainer = useRef(null);
    const [editSuccess, setEditSuccess] = useState(null);

    //  Converts picture to url
    const pictureToUrl = (picFile) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(picFile);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    };

    const handleRegister = async (formValues) => {
        //  Pic conversion 
        pictureToUrl(formValues.picture[0]).then(data => {
            formValues.picture = data;
            dispatch(editUser({ id: user.id, edited: formValues }));
            setEditSuccess(true);
        });
        //  Show alert
        alertContainer?.current.classList.remove("opacity-0");
        //  Hide alert
        setTimeout(() => {
           alertContainer?.current.classList.add("opacity-0");
        }, 1500);
    }
    return (
        <Container>
            {<div className="flex justify-center opacity-0" ref={alertContainer}>
                <Alert isError={!editSuccess} text={!editSuccess ? "Error! Unable to update your profile." : "Successfully updated your profile!"} />
            </div>}
            {user && (<>
                <Title>{user.firstName}'s Profile</Title>

                <div className="grid grid-cols-2 place-content-center gap-5">
                    <div className="avatar justify-self-end">
                        {userInfo.picture ?
                            <div className="w-48 rounded">
                                <img src={userInfo.picture} />
                            </div>
                            :
                            <div className="bg-neutral-focus text-neutral-content rounded w-48">
                                <div className="grid place-content-center h-full">
                                    <Paragraph>No picture</Paragraph>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="w-48">
                        <Paragraph><span className="text-neutral font-bold">First Name:</span> {user.firstName}</Paragraph>
                        <Paragraph><span className="text-neutral font-bold">Last Name:</span> {user.lastName}</Paragraph>
                        <Paragraph><span className="text-neutral font-bold">Username:</span> {user.username}</Paragraph>
                        <Paragraph><span className="text-neutral font-bold">Email:</span> {user.email}</Paragraph>
                        <Paragraph><span className="text-neutral font-bold">Likes:</span> {userInfo.likes}</Paragraph>
                        <Paragraph><span className="text-neutral font-bold">Dislikes:</span> {userInfo.dislikes}</Paragraph>
                        <Button><label htmlFor="my-modal-4" className="w-full">Edit</label></Button>
                    </div>
                </div>
                <form onSubmit={handleSubmit(handleRegister)} noValidate>
                    <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                    <label htmlFor="my-modal-4" className="modal cursor-pointer">
                        <label className="modal-box relative" htmlFor="">
                            <Subtitle>Edit your profile</Subtitle>
                            <div className="mb-5">
                                <FormControl error={errors["firstName"]} name="firstName" register={register} label={"First name"} type={"text"} value={user.firstName} icon={<BsPencilFill />} />
                                <FormControl error={errors["lastName"]} name="lastName" register={register} label={"Last name"} type={"text"} value={user.lastName} icon={<BsPencilFill />} />
                                <FormControl error={errors["username"]} name="username" register={register} label={"Username"} type={"text"} value={user.username} icon={<FaUserAlt />} />
                                <FormControl error={errors["email"]} name="email" register={register} label={"Email"} type={"email"} value={user.email} icon={<MdAlternateEmail />} />
                                <FormControl error={errors["likes"]} name="likes" register={register} label={"Likes"} type={"text"} value={userInfo.likes ? userInfo.likes : ""} icon={<AiFillLike />} />
                                <FormControl error={errors["dislikes"]} name="dislikes" register={register} label={"Dislikes"} type={"text"} value={userInfo.dislikes ? userInfo.dislikes : ""} icon={<AiFillDislike />} />
                                <div className="form-control gap-2 my-2">
                                    <span className="label-text font-['Croissant_One'] text-lg">Profile picture</span>
                                    <input {...register("picture")} type="file" name="picture" className="file-input file-input-bordered w-full max-w-xs" />
                                    <div className="font-['Inconsolata'] text-red-500 ">{errors["picture"]?.message}</div>
                                </div>
                            </div>
                            <Button type="submit">Save</Button>
                        </label>
                    </label>
                </form>
            </>
            )}
        </Container>
    );
};