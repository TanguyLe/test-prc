import React from "react";

import { ListGroup } from 'react-bootstrap';

const Footer = () => {
  return <div className="Footer">
            <ListGroup horizontal="md">
                <ListGroup.Item className="list-group-item">
                    <a href="www.test-prc.fr">www.test-prc.fr</a> ne sauvegarde ou ne
                    partage aucune de vos infomations personnelles ou données de navigation.
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item">
                    <a href="https://github.com/TanguyLe/test-prc">
                        <img src="GitHub-Mark-32px.png" alt="Github" style={{width: "20px", height: "20px"}}/>
                    </a>
                </ListGroup.Item>
            </ListGroup>
  </div>
};

export default Footer;
