import React from 'react';
import { Link } from 'react-router-dom';
import '../../../style/not.found.css';

const NotFoundPage = () => {
    return (
        <section className="section-small-padding background-green text-center">
            <div className="error-header"> </div>
            <div className="container ">
                <section className="error-container text-center">
                    <h1>404</h1>
                    <div className="error-divider">
                        <h2>SORRY...</h2>
                        <p className="description">We Couldn't Find This Page</p>
                    </div>
                    <Link to="/" className="return-btn"><i className="fa fa-home"></i>Home</Link>
                </section>
            </div>
        </section>
    );
};

export default NotFoundPage;