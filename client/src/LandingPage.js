import React from 'react';

import { Link } from 'react-router-dom';

const LandingPage = (props) => (
        <div>
            <p>Welcome to Pam's Fibonacci Calculator App!</p>
            <p>This was built while
                <a href="https://www.udemy.com/share/101WjM3@E0aQGu1Dp94xK2q0OQ3CaGW-Am2T41nSCoOAUlS42QP0X6x229hxIjycvvMnZ_t6/"> learning Docker </a>
            </p>
            <Link to="/calculator">Check Out Calculator</Link>
        </div>
);

export default LandingPage;
