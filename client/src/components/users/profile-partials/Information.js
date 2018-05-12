import React, { Component } from 'react';

class Information extends Component {
    render() {
        return (
            <dl className="user-info dl-horizontal">
            <dt>
                    Full Name
                </dt>
                <dd>
                    {this.props.user.first_name} {this.props.user.last_name}
                </dd>
                <dt>
                    Username
                </dt>
                <dd>
                    {this.props.user.username}
                </dd>
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
                    {this.props.user.birth_date.split('T')[0]}
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
                     {this.props.user.selectedLanguages.map(language =>
                        <span key={language.label}>{language.label} </span>
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
                    {this.props.user.selectedGenres.map(genre =>
                        <span key={genre.label}>{genre.label} </span>
                    )}
                </dd>
            </dl>
        )
    }
}

export default Information;