import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LoginPage() {
    return (
        <>
            <section id="content" className="m-t-lg wrapper-md animated fadeInUp">
                <div className="container aside-xl">
                    <a className="navbar-brand block" href="index.html"><span className="h1 font-bold">Online Song</span></a>
                    <section className="m-b-lg">
                        <header className="wrapper text-center">
                            <strong>Sign in to get in touch</strong>
                        </header>

                        <Form>
                            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                                <Form.Control type="email" placeholder="name@example.com" className="rounded no-border" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                <Form.Control type="password" placeholder="Password" className="rounded no-border" />
                            </FloatingLabel>
                            <button type="submit" className="btn btn-lg btn-warning lt b-white b-2x btn-block btn-rounded w-100"><i className="icon-arrow-right pull-right"></i><span className="m-r-n-lg">Sign in</span></button>
                            <div className="text-center m-t m-b"><a href="#"><small>Forgot password?</small></a></div>
                            <div className="line line-dashed"></div>
                            <p className="text-muted text-center"><small>Do not have an account?</small></p>                            
                            <a href="#" className="btn btn-lg btn-info btn-block rounded btn-lg w-100">Create an account</a>
                        </Form>

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