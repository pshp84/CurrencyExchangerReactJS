import React, { useState, useEffect } from 'react'
import "./DetailPage.css"
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from "axios"

const DetailPage = () => {
    const [selectedfirst, setSelectedFirst] = useState<any>();
    const [selectedsecond, setSelectedSecond] = useState<any>();
    const [input1, setInput1] = useState<number>(1);
    const [input2, setInput2] = useState()
    const [input3, setInput3] = useState()
    const [disable2, setDisable2] = useState<boolean>(true)
    const [disable3, setDisable3] = useState<boolean>(true)
    const [rate, setRates] = useState([])
    const [rate2, setRate2] = useState([])

    const navigate = useNavigate();
    const accessKey = "cDrn3fB8BVWHORUWjhPdTXnupFv6JXI1"

    const handleChangeFirst = (e: any) => {
        setSelectedFirst(e.label);
    }
    const handleChangeSecond = (e: any) => {
        setSelectedSecond(e.label);
    }
    useEffect(() => {
        getData();
    }, []);
    const getData = () => {
        axios.get(`https://api.apilayer.com/fixer/latest?apikey=${accessKey}`)
            .then((res) => {
                //console.log(res.data);
                setRates(res.data.rates)
                setRate2(res.data.rates)
            })
            .catch((err: any) => {
                console.log(err);
            });
    };
    const convertAmount = () => {
        axios.get(`https://api.apilayer.com/fixer/convert?apikey=${accessKey}&from=${selectedfirst}&to=${selectedsecond}&amount=${input1}`)
            .then((response: any) => {
                console.log(response.data)
                console.log(response.data.result)
                setInput2(response.data.result)
                setInput3(response.data.result)
                setDisable2(false)
                setDisable3(false)
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="sticky-nav1">
                <div className="first-div">
                    <button className="Usd-details">EUR-USD Details</button>
                    <button className="Gbp-details">EUR-GBP Details</button>
                </div>
            </div>
            <h2 className="eur">
                EUR-European Union Euro
            <button className="back-home" onClick={() => navigate("/")}>Back to Home</button>
            </h2>
            <div className="second-div">

                <div className="div-amount">Amount</div>

                <input
                    type="text"
                    className="div-amount-input"
                    value={input1}
                    onChange={(e: any) => setInput1(e.target.value)}
                >
                </input>
                <div className="div-from">From</div>
                <Select
                    className="div-select1"
                    onChange={handleChangeFirst}
                    options={Object.keys(rate).map((data, index) => {
                        return {
                            value: index,
                            label: data
                        }
                    })}
                />
                <div className="arrow"></div>
                <div className="div-to">To</div>
                <Select
                    className="div-select2"
                    onChange={handleChangeSecond}
                    options={Object.keys(rate2).map((data, index) => {
                        return {
                            value: index,
                            label: data
                        }
                    })}
                />
                <div>
                    <button onClick={convertAmount} className="div-convert">Convert</button>
                </div>
                <input
                    type="text"
                    className="div-second-input"
                    value={input2}
                    disabled={disable2}
                ></input>
                <input
                    type="text"
                    className="div-input-3"
                    value={input3}
                    disabled={disable3}
                ></input>
            </div>
            <div className="row1">
                <div className="column1">
                    <div className="card1">
                        <h3>Card 1</h3>
                        <p>Some text</p>
                        <p>Some text</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage
