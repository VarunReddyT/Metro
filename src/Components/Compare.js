import React from 'react'
import './Compare.css'
export default function Compare() {
    return (
        <div>
            <div class="container">
                <div class="form_area">
                    <p class="title">SIGN UP</p>
                    <form>
                        <div class="form_group">
                            <label class="sub_title" for="name">Name</label>
                            <input placeholder="Enter your full name" class="form_style" type="text" />
                        </div>
                        <div class="form_group">
                            <label class="sub_title" for="email">Email</label>
                            <input placeholder="Enter your email" id="email" class="form_style" type="email" />
                        </div>
                        <div class="form_group">
                            <label class="sub_title" for="password">Password</label>
                            <input placeholder="Enter your password" id="password" class="form_style" type="password" />
                        </div>
                        <div>
                            <button class="btn1">SIGN UP</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
