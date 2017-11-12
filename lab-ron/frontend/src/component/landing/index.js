import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import AutoForm from '../auth-form'
import * as util from '../../lib/util.js'
import * as auth from '../../action/auth.js'
import * as clientProfile from '../../action/client-profile'

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleLogin(user) {
    this.props.login(user)
      .then(() => {
        this.props.history.push('/profile')
      })
      .catch('console.error')
  }

  handleSignup(user) {
    this.props.signup(user)
      .then(() => {
        this.props.history.push('/profile')
      })
      .catch(console.error)
  }

  render() {
    let { location } = this.props
    console.log('LANDING', this.props)

    return (
      <div className='landing'>
        {util.renderIf(location.pathname === '/',
          <div>
            <h2>Welcome to Charity Choice</h2>
            <p>Your one stop shop to donating in the US</p>
          </div>
        )}

        {util.renderIf(location.pathname === '/signup',
          <div>
            <h2>Sign Up</h2>
            <AutoForm onComplete={this.handleSignup} />
            <p>Already have an account?</p>
            <Link to='/login'>login</Link>
          </div>
        )}

        {util.renderIf(location.pathname === '/login',
          <div>
            <h2>login</h2>
            <AutoForm type='login' onComplete={this.handleLogin} />
            <p>Need an account?</p>
            <Link to='/signup'>signup</Link>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({ token: state.token })
const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(auth.signup(user)),
  login: user => dispatch(auth.login(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)