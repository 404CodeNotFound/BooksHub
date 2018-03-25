import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="footer-containertent">
                        <ul className="footer-social-info">
                            <li>
                                <a href="https://www.facebook.com"><i className="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="https://www.twitter.com"><i className="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="https://www.pinterest.com/"><i className="fa fa-pinterest"></i></a>
                            </li>
                            <li>
                                <a href="https://plus.google.com"><i className="fa fa-google-plus"></i></a>
                            </li>
                        </ul>
                        <br /><br />
                        <p>Copyright © 2018 | Fullstack with Node.js and React application</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;