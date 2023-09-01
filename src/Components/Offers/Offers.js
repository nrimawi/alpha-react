import { Fragment } from "react";

import OffersSummary from "./OffersSummary";
import AvailableOffers from "./AvailableOffers";

const Offers = () => {
  return (
    <Fragment>
      <OffersSummary />
      <AvailableOffers />
    </Fragment>
  );
};

export default Offers;
