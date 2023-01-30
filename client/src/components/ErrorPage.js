import React from 'react'
import './ErrorPage.css'

const ErrorPage = props => {
    return (
        <>
        <div className="container">
            <h2 className="notFoundTxt">Oops! Page not found</h2>

            <h1>
                <span className="num">4 </span>
                <i className="fas fa-cog"></i>
                <span className="num"> 4</span>
            </h1>

            <p className="pageTxt">We can't find the page you're looking for.</p>

        </div>
        </>
    )
}
export default ErrorPage;
