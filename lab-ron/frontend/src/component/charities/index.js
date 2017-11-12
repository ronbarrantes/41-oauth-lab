import React from 'react'
import { connect } from 'react-redux'
import * as util from '../../lib/util.js'
import CharityForm from '../charities-form'
import * as charitiesList from '../../action/charity'


class Charities extends React.Component {
  constructor(props) {
    super(props)



    this.handleUpdate = this.handleUpdate.bind(this)

  }

  componentDidMount() {
    // console.log('--> MOUNTING CHARITIES:', this.props)
    this.props.fetchCharities()
      .catch(console.error)
  }

  // componentWillReceiveProps() {
  //   console.log('--> RECEIVING CHARITIES:', this.props)
  // }

  handleUpdate() {
    this.props.fetchCharities()
    console.log('HANDLING UPDATES', this.state)
  }

  render() {
    // console.log('--> CHARITIES:', this.props)
    return (
      <div className='charities'>
        <p>charities here {this.props.hello}</p>
        <CharityForm onComplete={this.handleUpdate} />
      </div>
    )
  }
}
//TODO: fetching charities at some point in time 

const mapStateToProps = (state) => ({
  charities: state.charitiesList,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCharities: () => dispatch(charitiesList.fetch()),

})

export default connect(mapStateToProps, mapDispatchToProps)(Charities)