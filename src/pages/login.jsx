import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const LoginPage = () => {

    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLogin = (e) => {
        e.preventDefault();

        if (validate()) {
            // implentation
            // console.log('proceed');
            fetch("http://localhost:8000/user/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                // console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Please Enter valid username');
                } else {
                    if (resp.password === password) {
                        toast.success('Success');
                        sessionStorage.setItem('username', username);
                        // sessionStorage.setItem('userrole', resp.role);
                        usenavigate('/')
                    } else {
                        toast.error('Please Enter valid credentials');
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }

    return (
        <>
            <section id="content" className="m-t-lg wrapper-md animated fadeInUp">
                <div className="container aside-xl">
                    <a className="navbar-brand block" href="index.html"><span className="h1 font-bold">Online Song</span></a>
                    <section className="m-b-lg">
                        <header className="wrapper text-center">
                            <strong>Sign in to get in touch</strong>
                        </header>

                        <form onSubmit={ProceedLogin}>
                            <div className="form-group">
                                <input type="text" placeholder="User Name" className="form-control rounded input-lg text-center no-border" value={username} onChange={e => usernameupdate(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="password" placeholder="Password" className="form-control rounded input-lg text-center no-border" value={password} onChange={e => passwordupdate(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-lg btn-warning lt b-white b-2x btn-block btn-rounded">
                                <i className="icon-arrow-right pull-right"></i>
                                <span className="m-r-n-lg">Sign in</span>
                            </button>
                            {/* <div className="text-center m-t m-b"><a href="#"><small>Forgot password?</small></a></div> */}
                            <div className="line line-dashed"></div>
                            <p className="text-muted text-center"><small>Do not have an account?</small></p>
                            <Link className="btn btn-lg btn-info btn-block rounded btn-lg w-100" to={'/signup'}>Create an account</Link>
                        </form>
                    </section>
                </div>
            </section>
            {/* footer  */}
            <footer id="footer">
                <div className="text-center padder">
                    <p>
                        <small>Web app framework base on Bootstrap<br />&copy; 2014</small>
                    </p>
                </div>
            </footer>
        </>
    )
}

export default LoginPage;