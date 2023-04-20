import { useRef, useState, useEffect } from "react";

//  React router
import { NavLink, useNavigate } from "react-router-dom";

//  React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//  Redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../features/user/userSlice";

//  Components
import { Container } from "../../components/Container";
import { FormControl } from "../../components/FormControl";
import { Title } from "../../components/Title";
import { Paragraph } from "../../components/Paragraph";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Alert } from "../../components/Alert";

//  Icons
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserAlt } from 'react-icons/fa';

//  Validation schema
import { loginSchema } from "../../utils/validationSchemas";

export const Login = () => {
    //  Routing
    const navigate = useNavigate();

    //  Redux state
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);

    //  Form handling
    const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(loginSchema) });
    const { errors } = formState;

    //  Credentials validity and login alert
    const [invalidCredentials, setInvalidCredentials] = useState(null);
    const alertContainer = useRef(null);

    const handleLogin = (formValues) => {
        //  Login
        dispatch(loginUser(formValues));
        //  Show alert
        alertContainer.current.classList.remove("opacity-0");
        setTimeout(() => {
            //  Hide alert
            if (alertContainer.current) alertContainer.current.classList.add("opacity-0");
        }, 1500);
    };
    //  When current user changes
    useEffect(() => {
        if (user[0] === undefined) {
            setInvalidCredentials(true);
        } else {
            setInvalidCredentials(false);
            setTimeout(() => {
                navigate("/");
            }, 1500);
        };
    }, [user]);

    return (
        <Container>
            <div className="flex justify-center opacity-0" ref={alertContainer}>
                <Alert isError={invalidCredentials} text={invalidCredentials ? "Invalid username or password." : "Successfully logged in!"} />
            </div>
            <div className="bg-neutral/25 w-fit backdrop-blur-xl p-5 drop-shadow-xl shadow-xl mx-auto">
                <Title>Login</Title>
                <div className="grid place-content-center">
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <FormControl error={errors["username"]} name="username" register={register} label={"Username"} icon={<FaUserAlt />} type={"text"} />
                        <FormControl error={errors["password"]} name="password" register={register} label={"Password"} icon={<RiLockPasswordFill />} type={"password"} />
                        <Checkbox label={"Remember me"} />
                        <div className="mt-4">
                            <Button type="submit">Login</Button>
                        </div>
                    </form>
                    <div className="mt-4 grid place-content-center">
                        <Paragraph>Don't have an account? <NavLink to="/signup"><span className="underline text-neutral">Sign up</span></NavLink></Paragraph>
                    </div>
                </div>
            </div>
        </Container>
    );
};