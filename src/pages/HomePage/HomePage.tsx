import React, { useState, useEffect } from 'react'
import "./HomePage.css"
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from "axios"


const HomePage = () => {
    const [selected, setSelected] = useState<any>();
    const [selected2, setSelected2] = useState<any>();
    const [text1, setText1] = useState<number>(1);
    const [text3, setText3] = useState()
    const [text2, setText2] = useState()
    const [enable2, setEnable2] = useState<boolean>(true)
    const [enable, setEnable] = useState<boolean>(true)
    const [country, setCountry] = useState([])
    const [country2, setCountry2] = useState([])
    const access_key = "cDrn3fB8BVWHORUWjhPdTXnupFv6JXI1"

    const handleChange = (e: any) => {
        setSelected(e.label);
    }
    const handleChange1 = (e: any) => {
        setSelected2(e.label);
    }

    const navigate = useNavigate()
    useEffect(() => {
        getData();
    }, []);
    const getData = () => {
        axios.get(`https://api.apilayer.com/fixer/latest?apikey=${access_key}`)
            .then((res: any) => {
                //console.log(res.data);
                setCountry(res.data.rates)
                setCountry2(res.data.rates)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const convert = () => {
        axios.get(`https://api.apilayer.com/fixer/convert?apikey=${access_key}&from=${selected}&to=${selected2}&amount=${text1}`)
            .then((response) => {
                // console.log(response.data)
                setText3(response.data.result)
                setText2(response.data.result)
                setEnable2(false)
                setEnable(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (

        <div className="wrapper">
            <div className="sticky-nav">
                <div className={`first-option`}>
                    <button className="btn1" onClick={() => navigate("/details")}>EUR-USD Details</button>
                    <button className="btn2" onClick={() => navigate("/details")}>EUR-GBP Details</button>
                </div>
            </div>
            <h2 className="currency">Currency Exchanger</h2>
            <div className="second-option">
                <div className="amount">Amount</div>

                <input
                    type="text"
                    className="amount-input"
                    autoComplete="off"
                    value={text1}
                    onChange={(e: any) => setText1(e.target.value)}
                >
                </input>
                <div className="from">From</div>

                <div>
                    <Select
                        className="select1"
                        onChange={handleChange}
                        options={Object.keys(country).map((data, index) => {
                            return {
                                value: index,
                                label: data
                            }
                        })}
                    />
                </div>
                <div className="arrow-9"></div>
                <div className="to">To</div>
                <Select
                    className="select2"
                    onChange={handleChange1}
                    options={Object.keys(country2).map((data, index) => {
                        return {
                            value: index,
                            label: data
                        }
                    })}
                />

                <div><button onClick={convert} className="convert">Convert</button></div>

                <input
                    type="text"
                    className="second-input"
                    value={text2}
                    onChange={(e: any) => setText2(e.target.value)}
                    disabled={enable2}
                ></input>
                <input
                    type="text"
                    className="input-3"
                    value={text3}
                    onChange={(e: any) => setText3(e.target.value)}
                    disabled={enable}

                >
                </input>
                <button className="more-details" onClick={() => navigate("/details")}>More Details</button>
            </div>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <h3>Card 1</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <h3>Card 2</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <h3>Card 3</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <h3>Card 3</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <h3>Card 3</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <h3>Card 3</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <h3>Card 3</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <h3>Card 3</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <h3>Card 3</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomePage
