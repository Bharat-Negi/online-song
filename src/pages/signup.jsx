import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SignupPage() {
    return (
        <>
            <section id="content" className="m-t-lg wrapper-md animated fadeInDown">
                <div className="container aside-xl">
                    <a className="navbar-brand block" href="index.html"><span className="h1 font-bold">Online Song</span></a>
                    <section className="m-b-lg">
                        <header className="wrapper text-center">
                            <strong>Sign up to find interesting thing</strong>
                        </header>

                        <Form>
                            <FloatingLabel label="Name" className="mb-3">
                                <Form.Control type="text" placeholder="" className="rounded no-border" />
                            </FloatingLabel>
                            <FloatingLabel label="Email" className="mb-3">
                                <Form.Control type="text" placeholder="Email" className="rounded no-border" />
                            </FloatingLabel>
                            <FloatingLabel label="Password" className="mb-3">
                                <Form.Control type="password" placeholder="Password" className="rounded no-border" />
                            </FloatingLabel>
                            <Form.Check type="checkbox" id="custom-checkbox" label="Remember Password" className='pl-2' /> 
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