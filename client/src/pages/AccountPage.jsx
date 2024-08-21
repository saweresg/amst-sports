import React from "react";
import { Navbar } from "../components";
import Account from "../containers/account/Account";
import { Footer } from "../containers";

function AccountPage() {
  return (
    <div>
      <Navbar />
      <Account />
      {/* <h1>My Bookings</h1> */}
    </div>
  );
}

export default AccountPage;
