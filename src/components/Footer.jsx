import React from "react";

import {VERSION} from "../utils";

import {OverlayTrigger, Tooltip} from "react-bootstrap";

const Footer = () => {
    return <div className="App-footer">
            <div style={{borderWidth: "0 1px 0 0"}} className="App-footer-element">
                <div>
                    <a href="www.test-prc.fr">www.test-prc.fr</a> ne sauvegarde ou ne
                    partage aucune de vos infomations personnelles ou données de navigation.
                </div>
            </div>
            <OverlayTrigger overlay={
                <Tooltip>
                    Une nouvelle version indique un changement du contenu des questions ou du calcul des points.
                </Tooltip>
            }>
                <div className="App-footer-element">
                        v{VERSION.split('.')[0]}
                </div>
            </OverlayTrigger>
        </div>
};

export default Footer;
