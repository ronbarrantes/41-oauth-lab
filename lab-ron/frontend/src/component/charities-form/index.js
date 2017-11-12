/// Gotta create a form for searching charities
import React from 'react'
// import default from '../charities/index';

class CharityForm extends React.Component {
  constructor(props) {
    super(props)
    this.emptyState = {error: 'some error occurred'}
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onComplete(this.state)
  }

  render() {
    return (
      <form className='charity-form'
        onSubmit={this.handleSubmit}>
        <button type='submit' >
          search
        </button>

      </form>
    )
  }
}

export default CharityForm