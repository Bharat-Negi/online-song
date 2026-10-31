import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignupPage() {

    const [id, idchange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter ';

        if (id === null || id.trim() === '') {
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
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            isproceed = false;
            toast.warning('Please enter the valid email');
        }

        return isproceed;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { id: id.trim(), password, email };
        // console.log(regobj);
        if (IsValidate()) {
            fetch("http://localhost:8000/user/" + encodeURIComponent(regobj.id)).then((res) => {
                if (res.ok) {
                    throw new Error('Username already exists');
                }
                return fetch("http://localhost:8000/user", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(regobj)
                });
            }).then((res) => {
                if (!res.ok) {
                    throw new Error('Server responded with ' + res.status);
                }
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

                        <form onSubmit={handlesubmit}>
                            <div className="form-group">
                                <input type="text" placeholder="User Name" className="form-control rounded input-lg text-center no-border" value={id} onChange={e => idchange(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Email Id" className="form-control rounded input-lg text-center no-border" value={email} onChange={e => emailchange(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Password" className="form-control rounded input-lg text-center no-border" value={password} onChange={e => passwordchange(e.target.value)} />
                            </div>

                            <button type="submit" className="btn btn-lg btn-warning lt b-white b-2x btn-block btn-rounded w-100"><i className="icon-arrow-right pull-right"></i><span className="m-r-n-lg">Sign up</span></button>
                            <div className="line line-dashed"></div>
                            <p className="text-muted text-center"><small>Already have an account?</small></p>
                            <Link className="btn btn-lg btn-info btn-block btn-rounded w-100" to={'/login'}>Sign in</Link>

                        </form>
                        
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