import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import './ErrorPage.css'
import { faCog } from '@fortawesome/free-solid-svg-icons'

const ErrorPage = props => {
  const [isLoading, setLoading] = useState(false);

  // useEffect triggers a re-render as soon as the page loads
  // by setting the isLoading state to true using setLoading(true).

  // The useEffect hook is passed an empty dependency array [] so
  // that it only runs once on the initial render
  
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="notFoundTxt">Oops! Page not found</h2>
        <h1>
          <span className="num">4 </span>
          <FontAwesomeIcon icon={faCog} spin={isLoading} className={isLoading ? 'fa-spin' : ''}/>
          <span className="num"> 4</span>
        </h1>
        <p className="pageTxt">We can't find the page you're looking for.</p>
        <a href="/"> Go back home</a>
      </div>
    </>
  )
}
export default ErrorPage;
