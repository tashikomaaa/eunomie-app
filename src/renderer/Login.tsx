import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import React, { Component } from 'react'

export default class Login extends Component<{}, {
    email: string,
    password: string
}> {

    constructor(props:{}) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    async handleLogin() {
        await fetch('http://172.232.54.227:3000/api/user/login', {
            method: 'POST',
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password
            })
        }).then((res) => res.json()).then((data) => {
            console.log('%cLogin.tsx line:35 data', 'color: #007acc;', data);
            if(data.resultCode === "00047") {
                localStorage.setItem('ACCESS_TOKEN', data.accessToken);
                localStorage.setItem('REFRESH_TOKEN', data.refreshToken);
                window.location.href = "/home"
            }
        })
    }

    render() {
        return (
            <div>
                <Card title="Login">
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignContent: "center",
                        flexWrap: "nowrap",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}>
                        <InputText style={{margin: "5%"}} value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} type="text" className="p-inputtext-lg" placeholder="Email" />
                        <InputText style={{margin: "5%"}} value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} type="password" className="p-inputtext-lg" placeholder="password" />
                        <Button style={{margin: "5%"}} onClick={async () => await this.handleLogin()} label="LOGIN" rounded />
                    </div>
                </Card>
            </div>
        )
    }
}
function getCurrentWindow() {
    throw new Error('Function not implemented.')
}

