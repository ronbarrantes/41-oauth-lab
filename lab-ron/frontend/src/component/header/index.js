import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as util from '../../lib/util.js'
import * as auth from '../../action/auth.js'

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>Charity Choice</h1>
        
        <nav>
          {util.renderIf(!this.props.loggedIn,
            <ul>
              <li> <Link to='/'>home</Link> </li>
              <li> <Link to='/login'>login</Link> </li>
              <li> <Link to='/signup'>signup</Link> </li>
            </ul>
          )}

          {util.renderIf(this.props.loggedIn,
            <ul>
              <li> <Link to='/dashboard'>dashboard</Link> </li>
              <li> <Link to='/charities'>charities</Link> </li>
              {/* <li> <Link to='/upload'>upload</Link> </li> */}
              <li> <Link to='/profile'>profile</Link> </li>
            </ul>
          )}
        </nav>
        {util.renderIf(this.props.loggedIn,
          <button onClick={this.props.logout}> logout </button>)}
      </header>
    )
  }
}

const mapStateToProps = state => ({ loggedIn: !!state.token })

const mapDispatchToProps = (dispatch) =>
  ({ logout: () => dispatch(auth.logout()) })

export default connect(mapStateToProps, mapDispatchToProps)(Header)
