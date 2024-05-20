import React from 'react'
import { useState } from 'react'
import './Compare.css'
import Select from './Select.js'
import axios from 'axios'

export default function Compare() {
    const [view, setView] = useState(false)
    const [mileage, setMileage] = useState('')
    const [dailyDistance, setDailyDistance] = useState('')
    const [petrolPrice, setPetrolPrice] = useState('')
    const [extraExpenses, setExtraExpenses] = useState('')
    const [totalExpensesV, setTotalExpensesV] = useState('')
    const [totalExpensesM, setTotalExpensesM] = useState('')
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [fare, setFare] = useState('')

    const handleMilage = (e) => {
        setMileage(e.target.value)
    }
    const handleDailyDistance = (e) => {
        setDailyDistance(e.target.value)
    }
    const handlePetrolPrice = (e) => {
        setPetrolPrice(e.target.value)
    }

    const handleExtraExpenses = (e) => {
        setExtraExpenses(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const totalExpenses = (dailyDistance / mileage) * petrolPrice
        setTotalExpensesV(totalExpenses)
        try{
            const response = await axios.get(`https://metro-murex.vercel.app/path/${source}/${destination}`)
            const fareValue = response.data.fare;
            setFare(fareValue)
            setTotalExpensesM(parseInt(fareValue) + parseInt(extraExpenses))
            setView(true)
        }
        catch(error){
            console.error('Error fetching data:', error)
        }
    }

    return (
        <div className='exp '>
            <div className="container ">
                <div className="form_area">
                    <p className="title">Compare expenses</p>
                    <form className='p-5' onSubmit={handleSubmit}>
                        <div className='d-flex'>
                            <div>
                                <h3 className='mb-4'>Vehicle</h3>
                                <div className="form_group">
                                    <label className="sub_title">Mileage (in km)</label>
                                    <input placeholder="Enter Vehicle Mileage" onChange={handleMilage} className="form_style" type="number" />
                                </div>
                                <div className="form_group">
                                    <label className="sub_title">Daily Distance Travel (in km)</label>
                                    <input placeholder="Enter distance of daily travel" onChange={handleDailyDistance} className="form_style" type="number" />
                                </div>
                                <div className="form_group">
                                    <label className="sub_title">Petrol Price (in rupees)</label>
                                    <input placeholder="Enter Petrol Price in your area" onChange={handlePetrolPrice} className="form_style" type="number" />
                                </div>
                                {view && <div className="form_group">
                                    <p className="sub_title">Total Expenses : {totalExpensesV}</p>
                                </div>
                                }
                            </div>
                            <div className='ms-5' style={{ marginLeft: 10 }}>
                                <h3>Metro</h3>
                                <div>
                                    <Select transition={false} setSource={setSource} setDestination={setDestination}/>
                                </div>
                                <div className="form_group">
                                    <label className="sub_title" htmlFor="name">Extra expenses(if any)</label>
                                    <input placeholder="Expenses for other transport" onChange={handleExtraExpenses} className="form_style" type="text" />
                                </div>
                                {view && <div className="form_group">
                                    <p className="sub_title">Fare : {fare}</p>
                                    <p className="sub_title">Total Expenses : {totalExpensesM}</p>
                                </div>
                                }
                            </div>
                        </div>
                        <div>
                            <button className="btn1">Check</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
