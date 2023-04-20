import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

//  React router
import { useNavigate } from "react-router-dom";

//  React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//  Redux
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../features/user/userSlice";

//  Components
import { Button } from "../../components/Button";
import { FormControl } from "../../components/FormControl";
import { Title } from "../../components/Title";
import { Alert } from "../../components/Alert";
import { Container } from "../../components/Container";

//  Icons
import { FaPencilAlt } from "react-icons/fa";
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdAlternateEmail } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';

//  Validation schema
import { signUpSchema } from "../../utils/validationSchemas";

export const SignUp = () => {

    const navigate = useNavigate();
    //  Redux state
    const dispatch = useDispatch();
    const registrationError = useSelector(state => state.user.error);
    //  Form handling
    const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(signUpSchema) });
    const { errors } = formState;
    //  Credentials and login alert
    const [invalidRegistration, setInvalidRegistration] = useState(null);
    const alertContainer = useRef(null);

    const handleRegister = (formValues) => {
        //  Register
        dispatch(registerUser({ id: uuidv4(), ...formValues, favs: [] }));
        //  Show alert
        alertContainer.current.classList.remove("opacity-0");
        setTimeout(() => {
            //  Hide alert
            if (alertContainer.current) alertContainer.current.classList.add("opacity-0");
            //  Successful registration
            if (!invalidRegistration) navigate("/login");
        }, 1500);
    }
    //  When error changes
    useEffect(() => {
        if (registrationError.message !== undefined) {
            setInvalidRegistration(true);
        } else {
            setInvalidRegistration(false);
        };
    }, [registrationError])

    return (
        <Container>
            <div className="flex justify-center opacity-0" ref={alertContainer}>
                <Alert isError={invalidRegistration} text={invalidRegistration ? registrationError.message : "Successfully signed up!"} />
            </div>
            <div className="bg-neutral/25 w-fit backdrop-blur-xl p-5 drop-shadow-xl shadow-xl mx-auto">
                <Title>Sign Up</Title>
                <form onSubmit={handleSubmit(handleRegister)} noValidate>
                    <div className="grid md:grid-cols-2 place-content-center place-items-center md:gap-10">
                        <div className="justify-self-end">
                            <FormControl error={errors["firstName"]} name="firstName" register={register} label={"First name"} icon={<FaPencilAlt />} type={"text"} />
                            <FormControl error={errors["lastName"]} name="lastName" register={register} label={"Last name"} icon={<FaPencilAlt />} type={"text"} />
                            <FormControl error={errors["username"]} name="username" register={register} label={"Username"} icon={<FaUserAlt />} type={"text"} />
                        </div>
                        <div className="justify-self-start self-center">
                            <FormControl error={errors["email"]} name="email" register={register} label={"Email"} icon={<MdAlternateEmail />} type={"email"} />
                            <FormControl error={errors["password"]} name="password" register={register} label={"Password"} icon={<RiLockPasswordFill />} type={"password"} />
                        </div>

                    </div>

                    <div className="mt-4 md:w-1/4 w-1/2 mx-auto">
                        <Button type="submit">Register</Button>
                    </div>
                </form>
            </div>
        </Container>
    );
};