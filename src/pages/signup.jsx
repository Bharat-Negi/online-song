import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {

    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [gender, genderchange] = useState("male");
    const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("");
    const [address, addresschange] = useState("");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter ';

        if (name === null || name === '') {
            isproceed = false;
            errormessage += 'Name ';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += 'Email ';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += 'Password';
        }
        if (!isproceed) {
            toast.warning(errormessage);
        } else {
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }

        return isproceed;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { name, password, email, gender };
        // console.log(regobj);
        if (IsValidate()) {
            fetch("http://localhost:3000/user", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered Successfully');
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message)
            });
        }
    }

    return (
        <>
            <section id="content" className="m-t-lg wrapper-md animated fadeInDown">
                <div className="container aside-xl">
                    <a className="navbar-brand block" href="index.html"><span className="h1 font-bold">Online Song</span></a>
                    <section className="m-b-lg">
                        <header className="wrapper text-center">
                            <strong>Sign up to find interesting thing</strong>
                        </header>

                        <Form onSubmit={handlesubmit}>
                            <FloatingLabel label="Name" className="mb-3">
                                <Form.Control type="text" placeholder='' value={name} onChange={e => namechange(e.target.value)} className="rounded no-border" />
                            </FloatingLabel>
                            <FloatingLabel label="Email" className="mb-3">
                                <Form.Control type="email" placeholder='' value={email} onChange={e => emailchange(e.target.value)} className="rounded no-border" />
                            </FloatingLabel>
                            <FloatingLabel label="Password" className="mb-3">
                                <Form.Control type="password" placeholder='' value={password} onChange={e => passwordchange(e.target.value)} className="rounded no-border" />
                            </FloatingLabel>
                            <div className='mb-3'>
                                <Form.Label>Gender</Form.Label><br />

                                <Form.Check inline type="radio" checked={gender === 'male'} onChange={e => genderchange(e.target.value)} label="Male" name="gender" />
                                <Form.Check inline type="radio" checked={gender === 'female'} onChange={e => genderchange(e.target.value)} label="Female" name="gender" />
                            </div>

                            {/* <Form.Check type="checkbox" label="Remember Password" /> */}
                            <button type="submit" className="btn btn-lg btn-warning lt b-white b-2x btn-block btn-rounded w-100"><i className="icon-arrow-right pull-right"></i><span className="m-r-n-lg">Sign up</span></button>
                            <div className="line line-dashed"></div>
                            <p className="text-muted text-center"><small>Already have an account?</small></p>
                            <a href="signin.html" className="btn btn-lg btn-info btn-block btn-rounded w-100">Sign in</a>
                        </Form>
                    </section>
                </div>
            </section>

            <footer id="footer">
                <div className="text-center padder clearfix">
                    <p>
                        <small>Web app framework base on Bootstrap<br />&copy; 2014</small>
                    </p>
                </div>
            </footer>
        </>
    )
}