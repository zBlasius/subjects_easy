import React from "react";
import "./index.scss"

export default function CardCenter({ children }: { children: React.ReactNode }) {
  return (
    <section className="vh-100 gradient-custom">
      <div className="card-body p-3 text-center h-100">
        <div className="container-fluid py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card text-black card-main" style={{ borderRadius: "1rem", background:"#FFFFFF" }}>
                <div className="card-body p-3 text-center container d-flex flex-column align-items-center justify-content-center">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
