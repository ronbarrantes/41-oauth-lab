import React from 'react'

let emptyState = {
  bio: '',
  firstName: '',
  lastName: '',
  donationGoal: '',
  city: '',
  state: '',
  bioDirty: false,
  bioError: 'Bio required',
}

class ProfileForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.profile ? { ...emptyState, ...props.profile } : emptyState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(props) {
    if (props.profile)
      this.setState(props.profile)
  }

  handleChange(e) {
    let { name, value, type } = e.target
    value = type === 'number' ? Number(value) : value
    this.setState({
      [name]: value,
      bioDirty: true,
      bioError: value ? null : emptyState.bioError,
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState(emptyState)
  }

  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}>

        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          value={this.state.firstName}
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
          value={this.state.lastName}
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='city'
          placeholder='City'
          value={this.state.city}
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='state'
          placeholder='State'
          value={this.state.state}
          onChange={this.handleChange}
        />

        <input
          type='number'
          name='donationGoal'
          placeholder='Donation Goal'
          value={this.state.donationGoal}
          onChange={this.handleChange}
        />

        <textarea
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
        />

        <button type='submit' >
          {this.props.profile ? 'update' : 'create'} profile
        </button>
      </form>
    )
  }
}

export default ProfileForm