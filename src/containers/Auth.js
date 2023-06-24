import React, { useState } from 'react';


function Auth(props) {

    const [authtype, setauthtype] = useState('login');
    const [forget, setforget] = useState(false);


    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    {
                        forget ? <h2>Reset Password</h2> :
                            authtype === 'login' ? <h2>Login</h2> : <h2>Signup</h2>
                    }

                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
                        Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
                </div>
                <form action method="post" role="form" className="php-email-form">
                    <div className="row justify-content-center ">
                        {
                            authtype === 'signup' ?
                                <div className="col-md-7 form-group">
                                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                    <div className="validate" />
                                </div> : null
                        }

                        <div className="col-md-7 form-group mt-3 mt-md-0">
                            <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                            <div className="validate" />
                        </div>
                        {
                            !forget ? <div className="col-md-7 form-group mt-3 mt-md-0">
                                <input type="password" className="form-control" name="password" id="password" placeholder="Your Password" data-rule="minlen:4" data-msg="Please enter a valid password" />
                                <div className="validate" />
                            </div> : null
                        }

                        <div className="text-center m-2">
                            {
                                forget ? null :
                                    authtype === 'login' ? <a href='#' onClick={() => setforget(true)}>Forgot password?</a>
                                        : null
                            }
                        </div>
                    </div>
                    {
                        // authtype === 'login' ? <div className="text-center"><button type="submit">Login</button></div>
                        // : authtype === 'signup' ? <div className="text-center"><button type="submit">Signup</button></div>
                        // : <div className="text-center"><button type="submit">Send OTP</button></div>

                        forget ? <div className="text-center"><button type="submit">Send OTP</button></div>
                            : authtype === 'login' ? <div className="text-center"><button type="submit">Login</button></div>
                                : <div className="text-center"><button type="submit">Signup</button></div>

                    }
                    <div className="text-center m-2">
                        {
                            forget ? <span>Already have an account? <a href='#' onClick={() => { setauthtype('login'); setforget(false) }}>Login</a></span>
                                : authtype === 'login' ? <span>Don't have an account <a href='#' onClick={() => { setauthtype('signup'); setforget(false) }}>Signup</a></span>
                                    : <span>Already have an account? <a href='#' onClick={() => { setauthtype('login'); setforget(false) }}>Login</a></span>
                        }
                    </div>
                </form>
            </div>
        </section>

    );
}

export default Auth;