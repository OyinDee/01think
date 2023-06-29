import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
export default function All() {
    const [a, setA] = useState(1000)
    const [b, setB] = useState(1000)
    const [c, setC] = useState(1000)
    const [d, setD] = useState(1000)
    useEffect(() => {
      axios.get('https://newsapp-dpv1.onrender.com').then((response)=>{
          console.log(response)
        setA(response.data.a)
        setB(response.data.b)
        setC(response.data.c)
        setD(response.data.d)
      })
    }, [])
    
    return (
        <>
        <section className="counter" id="about">
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="count-item decoration-bottom">
                            <strong>{a}</strong>
                            <span>Ideas</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="count-item decoration-top">
                            <strong>{b}</strong>
                            <span>Projects</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="count-item decoration-bottom">
                            <strong>{c}</strong>
                            <span>Developers</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="count-item">
                            <strong>{d}</strong>
                            <span>Thinkers</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}
