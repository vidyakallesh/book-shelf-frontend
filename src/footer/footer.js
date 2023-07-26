import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <>
      <div className="main-footer">
        <p>
          @{new Date().getFullYear()} Harsh-Repository. All rights reserved.
        </p>
      </div>
    </>
  );
}
