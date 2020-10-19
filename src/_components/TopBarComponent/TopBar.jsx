import React from 'react';
import style from './style.css';

function TopBar() {
   function setLanguage() { console.log("Language setting button has been clicked") }
    return(
        <div className="container">
            <ul className="settingsPanel">
                <li>
                    <a className="link" href="/help">Help &amp; FAQs</a>
                </li>
                <li>
                    <button className="btn-settings-panel" type="button" aria-label="Shopping from: United Kongdom. Choose Contry." onClick={setLanguage}>
                        <img className="img-settings-panel" src="/static/img/flags/gb.png" alt="United Kingdom"/>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export { TopBar };