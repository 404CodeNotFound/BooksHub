import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const style = {
    backgroundImage: `url("img/banner.jpg")`
};

class HomePage extends Component {
    render() {
        return (
            [
                <header key="header" className="section-top-padding background-image-main text-center main-header" style={style}>
                    <h1 className="text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-40 margin-top-110">
                        Today a reader, tomorrow a leader.
                    </h1>
                    <p className="text-white">- Margaret Fuller</p>
                    <img className="arrow-object" src="img/arrow-object-white.svg" alt="" />
                </header>,
                <section key="statistics" className="background-white statistics">
                    <div className="line text-center">
                        <i className="icon-sli-star text-primary text-size-40"></i>
                        <h2 className="text-dark text-size-50 text-m-size-40">Join our huge community of readers</h2>
                        <hr className="break background-primary break-small break-center margin-bottom-50" />
                    </div>
                    <div className="line">
                        <div className="margin2x">
                            <div className="s-12 m-6 l-4 margin-bottom-60">
                                <div className="float-left">
                                    <i className="icon-users text-primary text-size-40 text-line-height-1"></i>
                                </div>
                                <div className="margin-left-60">
                                    <h3 className="text-strong text-size-40 text-line-height-1 margin-bottom-20">10000k</h3>
                                    <p>happy readers that browse tons of books and literary events</p>
                                    <Link className="text-more-info text-primary" to="/login">Join us now</Link>
                                </div>
                            </div>
                            <div className="s-12 m-6 l-4 margin-bottom-60">
                                <div className="float-left">
                                    <i className="icon-sli-book-open text-primary text-size-40 text-line-height-1"></i>
                                </div>
                                <div className="margin-left-60">
                                    <h3 className="text-strong text-size-40 text-line-height-1 margin-bottom-20">10000k</h3>
                                    <p>books to browse, rate, review and recommend to your friends</p>
                                    <Link className="text-more-info text-primary" to="/books">Browse books</Link>
                                </div>
                            </div>
                            <div className="s-12 m-6 l-4 margin-bottom-60">
                                <div className="float-left">
                                    <i className="icon-placepin text-primary text-size-40 text-line-height-1"></i>
                                </div>
                                <div className="margin-left-60">
                                    <h3 className="text-strong text-size-40 text-line-height-1 margin-bottom-20">10000k</h3>
                                    <p>various literary events to browse, discuss and join</p>
                                    <Link className="text-more-info text-primary" to="/events">Browse events</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ]
        )
    }
}

export default HomePage;