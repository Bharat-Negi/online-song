import React, { Component } from 'react'

class LoginPage extends Component {
     constructor(props){
         super(props)
         this.state = {
             authKey:'',
             password:''
         }
     }
    render() {
        return (
            <div className='flex pa1 justify-between nowrap orange'>
                <div>
                    <input type="text" placeholder="type here" value={this.state.authKey}/>
                    <input type="text" placeholder="type here" value={this.state.password}/>
                    <input type="button" onClick={this.props.submit(this.state)}/>
                </div>
            </div>
        )
    }

}

export default LoginPage