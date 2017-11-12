import React from 'react'
import { connect } from 'react-redux'
import * as util from '../../lib/util.js'
import ProfileForm from '../profile-form'
import * as clientProfile from '../../action/client-profile.js'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    // console.log('--->> MY STATE', this.state)
  }

  componentDidMount() {
    this.props.fetchClientProfile()
      .catch(console.error)
  }

  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push('/dashboard')
      })
  }

  handleUpdate(profile) {
    this.props.profileUpdate(profile)
    this.setState({ editing: false })
  }

  render() {
    let { profile, profileCreate } = this.props
    // TODO: write the return 

    // console.log('--->> PROFILE:', profile)
    return (
      <div id='profile'>

        <h2> profile </h2>
        {profile ?
          <div>
            <h2> {profile.username} </h2>
            <h3> {profile.email} </h3>
            {this.state.editing ?
              <div>
                <ProfileForm profile={profile} onComplete={this.handleUpdate} />
                <button onClick={() => this.setState({ editing: false })}>
                  Cancel
                </button>
              </div>
              : // OR
              <div>
                <p>Welcome, {profile.firstName}!</p>
                <p> {profile.photo}</p>
                <p> First name: {profile.firstName}</p>
                <p> Last Name {profile.lastName}</p>
                {profile.city ? <p> City:  {profile.city}</p> : ''}
                {profile.state ? <p> State: {profile.state}</p> : ''}
                {profile.donationGoal ? <p> Donation goal: {profile.donationGoal}</p> : ''}
                {profile.moneySpent ? <p> Money spent {profile.moneySpent}</p> : ''}
                {profile.bio ? <p> Bio: {profile.bio}</p> : ''}
                <button onClick={() => this.setState({ editing: true })}>
                  Edit Bio
                </button>
              </div>
            }
          </div>
          : // OR
          <ProfileForm onComplete={this.handleCreate} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ profile: state.clientProfile })

const mapDispatchToProps = (dispatch) => ({
  fetchClientProfile: () => dispatch(clientProfile.fetch()),
  profileCreate: (profile) => dispatch(clientProfile.create(profile)),
  profileUpdate: (profile) => dispatch(clientProfile.update(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
