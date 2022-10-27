import { React } from 'react';

import './Terms.css';

const Refund = () => {
  return (
    <div className="terms">
      <h2>Refund Policy</h2>
      <h5>Unutilised Wallet Balance</h5>
      <p>
        "Unutilised Wallet Balance" is defined as the net amount remaining in your account after
        deducting all charges you have incurred for utilising our service.
      </p>
      <p>
        Any "unutilised wallet balance" in your account can be refunded to your original payment
        method on request, after deduction of transaction charges levied by the payment gateway or
        bank, if any. Transaction charges vary depending upon your mode of payment, and will
        generally be between 0-3%.
      </p>
      <h5>Packages</h5>
      <p>A package is defined as a one time purchase of large number of teaching hours.</p>
      <p>
        Once a package is purchased, it cannot be refunded. However, if you have unused "package
        hours" left in your account, the monetary value of the same could be used to purchase other
        services on the Online guru platform.
      </p>
      <p>Package hours will expire after 365 days of date of purchase.</p>
      <h5>Courses</h5>
      <p>A course once purchased, cannot be cancelled or refunded.</p>
    </div>
  );
};

export default Refund;
