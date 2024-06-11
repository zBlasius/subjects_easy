import React from "react";
import "./index.scss"

export default function CardCenter({ children, className }: { children: React.ReactNode, className?:string }) {
  const cardStyle = `text-black card-main ${className}`
  return (
    <section className="vh-100 gradient-custom">
      <div className="card-body p-3 text-center h-100">
        <div className="container-fluid py-3 h-100" >
          <div className="row d-flex justify-content-center align-items-center h-100" >
          {/* style={{height:"90%" }} */}
            <div className="col-12 col-md-8 col-lg-6 col-xl-5" > 
            {/* height:"100%" */}
              <div className={cardStyle} style={{ borderRadius: "1rem"}}>
                <div style={{justifyContent:'space-around'}} className="card-body p-3 text-center container d-flex flex-column align-items-center">
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
