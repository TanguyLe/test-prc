import React from "react";

const Footer = () => {
  return <div className="Footer">
            <ul className="list-group list-group-horizontal list-group-flush">
                <li className="list-group-item">
                    <a href="www.test-prc.fr">www.test-prc.fr</a> ne sauvegarde ou ne
                    partage aucune de vos infomations personnelles ou données de navigation.
                </li>
                <li className="list-group-item">
                    <a href="https://github.com/TanguyLe/test-prc">
                        <img src="GitHub-Mark-32px.png" alt="Github" style={{width: "20px", height: "20px"}}/>
                    </a>
                </li>
                <li className="list-group-item">
                    Favicon made
                  by <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">
                      bqlqn
                  </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>.
                </li>
            </ul>
  </div>
};

export default Footer;
