import React from "react";
import { Navbar } from "../components";
import Account from "../containers/account/Account";
import { Footer } from "../containers";

function AccountPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <Account />
      <Footer />
      {/* <h1>My Bookings</h1> */}
    </div>
  );
}

export default AccountPage;
