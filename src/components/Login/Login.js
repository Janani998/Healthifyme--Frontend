import React,{Component} from "react";
import "./Login.css";

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
            emailError : "",
            passwordError : "",
            successMessage : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.validate = this.validate.bind(this);
    }


    handleChange(event){
        this.setState({[event.target.name] : event.target.value});
        this.setState({emailError : ""});
        this.setState({passwordError : ""});
    }

    validate(){
        const {email, password} = this.state;
        const emailReg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/; 
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/;
        if(!email){
            this.setState({emailError : "This is a required field"});
        }
        if(!password){
            this.setState({passwordError : "This is a required field"});
            return;
        }

        if(!(emailReg.test(email))){
            this.setState({emailError : "Enter valid Email"});
            return;
        }
        if(email.length < 6){
            this.setState({emailError : "Email should contain atleast 6 characters"});
            return;
        }
        if(password.length < 6){
            this.setState({passwordError : "Password should contain atleast 6 characters"});
            return;
        }
        if(!(passwordReg.test(password))){
            this.setState({passwordError : "Enter valid password"});
        }
        return true;

    }

    handleLogin(){
        const {email,password} = this.state;
        if(this.validate()){
            fetch('http://www.mocky.io/v2/5d9d9219310000153650e30b').then((response) =>{
                if(response.status === 200){
                    window.localStorage.setItem('login', JSON.stringify(response.data))
                    this.setState({successMessage : "Login Successfull"})
                }
            })
        }
    }

    render(){
        return(
            <div className = "mainContainer">
                <header className = "header">
                    <img src = "https://s3.ap-south-1.amazonaws.com/tpng-images/random/original/6be52f0b-56bf-4fdc-abd3-0bec9e58610c.png" alt = "logo" className = "logo"/>
                    <div className = "verticalLine"></div>
                    <div className = "title">Accounts</div>
                </header>
                {this.state.successMessage && <div>{this.state.successMessage}</div>}
                <div className = "container">
                    <div className = "loginContainer">
                        <img src = "https://s3.ap-south-1.amazonaws.com/tpng-images/random/original/6be52f0b-56bf-4fdc-abd3-0bec9e58610c.png" alt = "logo" className = "logo"/>
                        <div style ={{fontSize : "32px"}} >Signin</div>
                        <div style ={{fontSize : "22px"}}>Use Your Healthifyme Account</div>
                        <input type = "text" name= "email" placeholder = "Enter your Email"  onChange = {this.handleChange} className = {this.state.emailError ? "errorBox" : "box"} />
                        {this.state.emailError && <div className = "text">{this.state.emailError}</div>}
                        <input type = "password" name= "password" placeholder = "Enter your password"  onChange = {this.handleChange} className ={this.state.passwordError ? "errorBox" : "box"} />
                        {this.state.passwordError && <div className = "text">{this.state.passwordError}</div>}
                        <button className = "box btn" onClick = {this.handleLogin} >Login</button>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Login;