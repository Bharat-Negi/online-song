import React, { Component } from 'react'
import { graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {AUTH_TOKEN} from './../constants';
class LoginContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            authKey: '',
            password: '',
            errors: []
        }
    }
    render(){
        return(
            <div>
                <div className='flex flex-column mt3'>
                    <input
                        className='mb2'
                        value={this.state.authKey}
                        onChange={(e) => this.setState({ authKey: e.target.value })}
                        type='text'
                        placeholder='Email/User Name'
                    />
                    <input
                        className='mb2'
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        type='password'
                        placeholder='Password'
                    />
                </div>
                <button onClick={() => this._login()}> Submit</button>
            </div>
        );
    }
    _login = async ()=>{
        const {authKey, password}  = this.state;
        const  result = await this.props.loginMutation({
            variables: {
                authKey,
                password
            }
        })
        if(!result.data.signIn.errors[0]){
           const {token} = result.data.signIn;
           this._saveUserData(token);
           this.props.history.push(`/dashboard`)
        }
        else {
            this.setState({error:result.data.signIn.errors})
        }
    }
    _saveUserData = (token) => {
        localStorage.setItem(AUTH_TOKEN, token)
    }

}

const LOGIN_MUTATION = gql`
mutation loginMutation($authKey:String!, $password:String!){
  signIn(input:{userInput:$authKey, password:$password}){
    token,
    errors{
      key
      message
    }
  }
}
`
export default graphql(LOGIN_MUTATION, { name: 'loginMutation' })(LoginContainer);