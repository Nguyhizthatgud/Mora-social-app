import React from 'react'
import { Form, Input, Button, Checkbox, Flex, Row, Col, Divider } from "antd"
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons"
import { GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { useLoginformStore } from '@/stores/useLoginformStore.js'
import loginlogo from "@/assets/logo/loginlogo.svg"
import { FaArrowRightToBracket } from "react-icons/fa6"
import { useAuthStore } from '@/stores/useAuthStore.js'

const Loginform = () => {
    const loginForm = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const registerForm = useForm({
        defaultValues: {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: ""
        }
    });

    const { signUp } = useAuthStore();
    const { signIn } = useAuthStore();
    const navigate = useNavigate();
    const signUpAnim = useLoginformStore((state) => state.signUpAnim);
    const setSignUpAnim = useLoginformStore((state) => state.setSignUpAnim);
    const signInAnim = useLoginformStore((state) => state.signInAnim);
    const setSignInAnim = useLoginformStore((state) => state.setSignInAnim);
    const isFlipped = useLoginformStore((state) => state.isFlipped);
    const setIsFlipped = useLoginformStore((state) => state.setIsFlipped);
    const toggleFlip = useLoginformStore((state) => state.toggleFlip);


    const onLoginSubmit = async (data) => {
        // backend called for login
        const { username, password } = data;
        await signIn(username, null, password);
        navigate("/");
        console.log('Login:', data);
    };

    const onRegisterSubmit = async (data) => {
        const { username, password, email, firstName, lastName } = data;
        // backend called for signup
        const success = await signUp(username, password, email, firstName, lastName);
        if (success) {
            setIsFlipped(false);
            registerForm.reset(); // clear the form
        }
        console.log('Register:', data);
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        toggleFlip();
    };

    const handleBackToLogin = (e) => {
        e.preventDefault();
        toggleFlip();
    };

    return (
        <div className="flip-card-container" style={{ perspective: '1000px' }}>
            <div
                className={`flip-card ${isFlipped ? 'flipped' : ''} `}
                style={{
                    position: 'relative',
                    width: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* login from - front side */}
                <div
                    style={{
                        position: isFlipped ? 'absolute' : 'relative',
                        width: '100%',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                >
                    <Form
                        size="large"
                        onFinish={loginForm.handleSubmit(onLoginSubmit)}
                        initialValues={{ remember: true }}
                        style={{ display: "flex", flexDirection: "column", maxWidth: "400px", margin: "0 auto", paddingTop: "20px" }}
                    >
                        <Form.Item>
                            <img src={loginlogo} alt="Login Logo" className="mx-auto w-auto p-4 bg-gray-200/50 rounded-2xl backdrop-blur-md" />
                        </Form.Item>
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-start mb-4">Sign-In</h2>
                            <h2
                                className={`sign-up text-xl font-bold mb-4 text-gray-400 flex items-center gap-2 select-none cursor-pointer transition-all duration-500 ease-out will-change-transform
                                    ${signUpAnim ? '-translate-x-3 opacity-50' : 'opacity-0'}`}
                            >
                                <FaArrowRightToBracket className="transition-transform duration-500" />
                                <span>Sign-up</span>
                            </h2>
                        </div>

                        <Controller
                            name="username"
                            control={loginForm.control}
                            rules={{
                                required: "Username required!",
                                minLength: { value: 3, message: "Username must be at least 3 characters!" }
                            }}
                            render={({ field }) => (
                                <Form.Item
                                    validateStatus={loginForm.formState.errors.username ? "error" : ""}
                                    help={loginForm.formState.errors.username?.message}
                                >
                                    <Input {...field} prefix={<UserOutlined />} placeholder="username or your email"
                                        className="rounded-lg" />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name="password"
                            control={loginForm.control}
                            rules={{
                                required: "password required!",
                                minLength: { value: 6, message: "Password must be at least 6 characters!" }
                            }}
                            render={({ field }) => (
                                <Form.Item
                                    validateStatus={loginForm.formState.errors.password ? "error" : ""}
                                    help={loginForm.formState.errors.password?.message}
                                >
                                    <Input.Password {...field} prefix={<LockOutlined />} placeholder="password" className="rounded-lg" />
                                </Form.Item>
                            )}
                        />

                        <Form.Item>
                            <Flex justify="space-between" align="center">
                                <Controller
                                    name="remember"
                                    control={loginForm.control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                        <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                                            Remember me
                                        </Checkbox>
                                    )}
                                />
                                <a href="#forgot">Forgot password</a>
                            </Flex>
                        </Form.Item>

                        <Form.Item>
                            <Button block
                                style={{
                                    background: "linear-gradient(-135deg , #00C1EC, #4170DA, #4700DF)",
                                    border: 'none', color: 'white',
                                }}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                onMouseOver={(e) =>
                                    e.currentTarget.style.background = "linear-gradient(-135deg , #00A1CC, #3150BA, #3500BF)"
                                }
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = "linear-gradient(-135deg , #0081AC, #213070, #2500AF)"
                                }}
                                type="primary"
                                htmlType="submit"
                            >
                                Log In!
                            </Button>
                            <div style={{ textAlign: "center", marginTop: "10px" }}>
                                or <a
                                    href="#register"
                                    onClick={handleRegisterClick}
                                    onMouseOver={() => setSignUpAnim(true)}
                                    onMouseOut={() => setSignUpAnim(false)}
                                    tabIndex={0}
                                >
                                    Register now!
                                </a>
                            </div>
                        </Form.Item>
                        <Form.Item className="flex justify-end items-center gap-2">
                            <a href="https://github.com/" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="hover:text-gray-900 transition" title="GitHub">
                                <GithubOutlined className="text-xl" />
                            </a>
                            <Divider type="vertical" />
                            <a href="https://x.com/" target="_blank" rel="noreferrer noopener" aria-label="Twitter / X" className="hover:text-gray-900 transition" title="Twitter / X">
                                <TwitterOutlined className="text-xl" />
                            </a>
                            <Divider type="vertical" />
                            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="hover:text-gray-900 transition" title="LinkedIn">
                                <LinkedinOutlined className="text-xl" />
                            </a>
                        </Form.Item>
                        <Form.Item>
                            <p className="text-center text-xs text-gray-500">
                                © 2025 Mora Community. For portfolio/demo purposes only. Not affiliated with Threads or Meta.
                            </p>
                        </Form.Item>
                    </Form>
                </div>

                {/* register form - back side*/}
                <div
                    style={{
                        position: isFlipped ? 'relative' : 'absolute',
                        width: '100%',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        top: 0,
                    }}
                >
                    <Form
                        size="large"
                        onFinish={registerForm.handleSubmit(onRegisterSubmit)}
                        style={{ display: "flex", flexDirection: "column", maxWidth: "400px", margin: "0 auto", paddingTop: "20px" }}
                    >
                        <Form.Item>
                            <img src={loginlogo} alt="Register Logo" className="mx-auto w-auto p-4 bg-gray-200/50 rounded-2xl backdrop-blur-md" />
                        </Form.Item>
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-start mb-4">Sign-Up</h2>
                            <h2
                                className={`sign-up text-xl font-bold mb-4 text-gray-400 flex items-center gap-2 select-none cursor-pointer transition-all duration-500 ease-out will-change-transform
                                    ${signInAnim ? '-translate-x-3 opacity-50' : 'opacity-0'}`}
                            >
                                <FaArrowRightToBracket className="transition-transform duration-500" />
                                <span>Sign-Up</span>
                            </h2>
                        </div>

                        <Controller
                            name="username"
                            control={registerForm.control}
                            rules={{
                                required: "Username is required!",
                                minLength: { value: 3, message: "At least 3 characters!" }
                            }}
                            render={({ field }) => (
                                <Form.Item
                                    validateStatus={registerForm.formState.errors.username ? "error" : ""}
                                    help={registerForm.formState.errors.username?.message}
                                >
                                    <Input {...field} prefix={<UserOutlined />} placeholder="Username" className="rounded-lg" />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name="email"
                            control={registerForm.control}
                            rules={{
                                required: "Email is required!",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email!" }
                            }}
                            render={({ field }) => (
                                <Form.Item
                                    validateStatus={registerForm.formState.errors.email ? "error" : ""}
                                    help={registerForm.formState.errors.email?.message}
                                >
                                    <Input {...field} prefix={<MailOutlined />} placeholder="Email" className="rounded-lg" />
                                </Form.Item>
                            )}
                        />

                        <Row gutter={8}>
                            <Col span={12}>
                                <Controller
                                    name="firstName"
                                    control={registerForm.control}
                                    rules={{ required: "First name required!" }}
                                    render={({ field }) => (
                                        <Form.Item
                                            validateStatus={registerForm.formState.errors.firstName ? "error" : ""}
                                            help={registerForm.formState.errors.firstName?.message}
                                        >
                                            <Input {...field} placeholder="First Name" className="rounded-lg" />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                            <Col span={12}>
                                <Controller
                                    name="lastName"
                                    control={registerForm.control}
                                    rules={{ required: "Last name required!" }}
                                    render={({ field }) => (
                                        <Form.Item
                                            validateStatus={registerForm.formState.errors.lastName ? "error" : ""}
                                            help={registerForm.formState.errors.lastName?.message}
                                        >
                                            <Input {...field} placeholder="Last Name" className="rounded-lg" />
                                        </Form.Item>
                                    )}
                                />
                            </Col>
                        </Row>

                        <Controller
                            name="password"
                            control={registerForm.control}
                            rules={{
                                required: "Password is required!",
                                minLength: { value: 6, message: "At least 6 characters!" }
                            }}
                            render={({ field }) => (
                                <Form.Item
                                    validateStatus={registerForm.formState.errors.password ? "error" : ""}
                                    help={registerForm.formState.errors.password?.message}
                                >
                                    <Input.Password {...field} prefix={<LockOutlined />} placeholder="Password" className="rounded-lg" />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name="confirmPassword" setIsFlipped
                            control={registerForm.control}
                            rules={{
                                required: "Confirm password!",
                                validate: (value) => value === registerForm.watch('password') || "Passwords don't match!"
                            }}
                            render={({ field }) => (
                                <Form.Item
                                    validateStatus={registerForm.formState.errors.confirmPassword ? "error" : ""}
                                    help={registerForm.formState.errors.confirmPassword?.message}
                                >
                                    <Input.Password {...field} prefix={<LockOutlined />} placeholder="Confirm Password" className="rounded-lg" />
                                </Form.Item>
                            )}
                        />

                        <Form.Item>
                            <Button block
                                style={{
                                    background: "linear-gradient(-135deg , #00C1EC, #4170DA, #4700DF)",
                                    border: 'none', color: 'white',
                                }}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                onMouseOver={(e) =>
                                    e.currentTarget.style.background = "linear-gradient(-135deg , #00A1CC, #3150BA, #3500BF)"
                                }
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = "linear-gradient(-135deg , #0081AC, #213070, #2500AF)"
                                }}
                                type="primary"
                                htmlType="submit"
                            >
                                Create Account
                            </Button>
                            <div style={{ textAlign: "center", marginTop: "10px" }}>
                                Already have an account? <a
                                    onClick={handleBackToLogin}
                                    onMouseEnter={() => setSignInAnim(true)}
                                    onMouseLeave={() => setSignInAnim(false)}
                                    tabIndex={0}
                                >
                                    Login here
                                </a>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <p className="text-center text-xs text-gray-500">
                                © 2025 Mora Community. For portfolio/demo purposes only. Not affiliated with Threads or Meta.
                            </p>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Loginform
