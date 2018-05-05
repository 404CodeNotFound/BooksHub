import React, { Component } from 'react';

class Information extends Component {
    render() {
        return (
            <dl className="user-info dl-horizontal">
                <dt>
                    E-mail
                </dt>
                <dd>
                    {this.props.user.email}
                </dd>

                <dt>
                    Nationality
                </dt>
                <dd>
                    {this.props.user.nationality}
                </dd>

                <dt>
                    Gender
                </dt>
                <dd>
                    {this.props.user.gender}
                </dd>

                <dt>
                    Birthdate
                </dt>
                <dd>
                    {this.props.user.birth_date}
                </dd>

                <dt>
                    Age
                </dt>

                <dd>
                    {this.props.user.age}
                </dd>

                <dt>
                    Gender
                </dt>
                <dd>
                    {this.props.user.gender}
                </dd>

                <dt>
                    Languages
                </dt>
                <dd>
                    {this.props.user.languages.map(language =>
                        <p key={language.label}>{language.label}</p>
                    )}
                </dd>

                <dt>
                    Favourite Quote
                </dt>
                <dd>
                    {this.props.user.favourite_quote}
                </dd>

                <dt>
                    Favourite Genres
                </dt>
                <dd>
                    {this.props.user.favourite_genres.map(genre =>
                        <p key={genre}>{genre}</p>
                    )}
                </dd>
            </dl>
        )
    }
}

export default Information;