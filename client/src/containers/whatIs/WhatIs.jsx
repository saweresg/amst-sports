import React from "react";
import "./whatIs.css";
import Feature from "../../components/feature/Feature";
import church from "../../assets/church.png";
import map from "../../assets/map.png";

const WhatIs = () => {
  return (
    <div className="amst__www">
      <div className="amst__www-what">
        <h1>What Do We Offer?</h1>
        <div className="amst__www-what__features">
          <Feature
            title={"Court Rentals"}
            text={
              "our indoor gym can be rented for soccer, basketball, volleyball, handball. Whether its a group of friends or a team training, everyone is welcome. "
            }
          />
          <Feature
            title={"Leagues"}
            text={
              "we have a competitive mens futsal league as well as a coed volleyball league. Team Register as a team or an individual"
            }
          />
          <Feature
            title={"Kids Programs"}
            text={
              "we offer soccer and basketball training programs for kids from age 6 to age 13 where they develop their skills while having fun and learning discipline "
            }
          />
        </div>
      </div>

      <div className="amst__www-who">
        <h1>Who Are We?</h1>
        <div className="amst__www-who__features">
          <Feature
            title={"The Church of Archangel Michael and St.Tekla"}
            text={
              "AMST for short! We are a Coptic Orthodox Church located in Brampton, Ontario. Along with being a church we also have a gymnasium for our congregation and for the surrounding community"
            }
          />
          <div className="amst__www-who__features-image">
            <img src={church} alt="church" />
          </div>
        </div>
      </div>

      <div className="amst__www-where">
        <h1>Where Are We?</h1>
        <div className="amst__www-where__features">
          <div className="amst__www-where__features-text">
            <Feature
              title={"12091 Hurontario St, Brampton, ON L6Z 4P8"}
              text={
                "AMST for short! We are a Coptic Orthodox Church located in Brampton, Ontario. Along with being a church we also have a gymnasium for our congregation and for the surrounding community"
              }
            />
          </div>
          <div className="amst__www-where__features-image">
            <img src={map} alt="map" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIs;
