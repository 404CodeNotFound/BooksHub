import React, { Component } from 'react';

class HomePage extends Component {
    render() {
        return (
            <div>
                <header className="section-top-padding background-image-main text-center main-header">
                    <h1 className="text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-40 margin-top-110">
                        Today a reader, tomorrow a leader.
                    </h1>
                    <p className="text-white">- Margaret Fuller</p>
                    <img className="arrow-object" src="img/arrow-object-white.svg" alt="" />
                </header>

                <section className="background-white statistics">
                    <div className="line text-center">
                        <i className="icon-sli-star text-primary text-size-40"></i>
                        <h2 className="text-dark text-size-50 text-m-size-40"><b>Join our huge community of readers</b></h2>
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
                                    <a className="text-more-info text-primary" href="login.html">Join us now</a>
                                </div>
                            </div>
                            <div className="s-12 m-6 l-4 margin-bottom-60">
                                <div className="float-left">
                                    <i className="icon-sli-book-open text-primary text-size-40 text-line-height-1"></i>
                                </div>
                                <div className="margin-left-60">
                                    <h3 className="text-strong text-size-40 text-line-height-1 margin-bottom-20">10000k</h3>
                                    <p>books to browse, rate, review and recommend to your friends</p>
                                    <a className="text-more-info text-primary" href="books.list.html">Browse books</a>
                                </div>
                            </div>
                            <div className="s-12 m-6 l-4 margin-bottom-60">
                                <div className="float-left">
                                    <i className="icon-placepin text-primary text-size-40 text-line-height-1"></i>
                                </div>
                                <div className="margin-left-60">
                                    <h3 className="text-strong text-size-40 text-line-height-1 margin-bottom-20">10000k</h3>
                                    <p>various literary events to browse, discuss and join</p>
                                    <a className="text-more-info text-primary" href="events.list.html">Browse events</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default HomePage;