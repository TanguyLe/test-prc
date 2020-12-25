import React from "react";

import {VERSION} from "../utils";

const Footer = () => {
    return <div className="App-footer">
            <div style={{borderWidth: "0 1px 0 0"}} className="App-footer-element">
                <div>
                    <a href="www.test-prc.fr">www.test-prc.fr</a> ne sauvegarde ou ne
                    partage aucune de vos infomations personnelles ou données de navigation.
                </div>
            </div>
            <div className="App-footer-element">
                Version {VERSION.split('.')[0]} des questions.
            </div>
        </div>
};

export default Footer;
