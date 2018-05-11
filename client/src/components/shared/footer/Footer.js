import React from 'react';
import { Link } from 'react-router-dom';
import '../../../style/footer.css';

const Footer = () => {
    return (
        <section className="section-small-padding background-dark text-center">
            <div className="line">
                <div className="m-10 l-6 xl-4 center">
                    <div className="margin">
                        <div className="footer-containertent">
                            <div className="row text-center">
                                <ul className="footer-social-info center">
                                    <li>
                                        <Link to="/">
                                            <i className="fa fa-facebook"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <i className="fa fa-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <i className="fa fa-pinterest"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <i className="fa fa-google-plus"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row center">
                            <br /> Copyright © 2018
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;