import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <>
      <div className="main-footer">
        <p>
          @{new Date().getFullYear()} vidya-Repository. All rights reserved.
        </p>
      </div>
    </>
  );
}
