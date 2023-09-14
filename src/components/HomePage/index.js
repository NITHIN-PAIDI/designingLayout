import {Component} from 'react'
import Popup from 'reactjs-popup'
import Picker from 'emoji-picker-react'
import {v4 as uuidv4} from 'uuid'
import Display from '../DisplaySection'
import ProfileInformation from '../profile Information'
import './index.css'

const intialList = [
  {
    segementId: uuidv4(),
    name: 'segement 1',
    icon: '🎃',
    tables: [],
    description: 'segementDescription',
  },
]

class HomePage extends Component {
  state = {
    SegementSearch: '',
    SegementName: '',
    segementArray: intialList,
    inputStr: '',
    Alltables: [],
    segementDescription: '',
    showPicker: false,
  }

  addSegement = () => {
    const {SegementName} = this.state
    console.log(SegementName)
    this.setState()
  }

  StoreInput = event => {
    this.setState({SegementSearch: event.target.value})
  }

  setInputString = event => {
    this.setState({inputStr: event.target.value})
  }

  onEmojiClick = event => {
    console.log(event)
    this.setState({inputStr: event.emoji})
  }

  TogglePicker = () => {
    this.setState(prevState => ({showPicker: !prevState.showPicker}))
  }

  storeDescription = event => {
    this.setState({segementDescription: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {SegementName, inputStr, segementDescription} = this.state
    const newItem = {
      segementId: uuidv4(),
      name: SegementName,
      icon: inputStr,
      tables: [],
      description: segementDescription,
    }
    console.log(newItem)
    this.setState(prevState => ({
      segementArray: [...prevState.segementArray, newItem],
    }))
  }

  storeName = event => {
    this.setState({SegementName: event.target.value})
  }

  handleAddTableClick = data => {
    this.setState(prevState => ({Alltables: [...prevState.Alltables, data]}))
  }

  handleSearchInputChange = event => {
    this.setState({SegementSearch: event.target.value})
  }

  render() {
    const {
      SegementSearch,
      SegementName,
      segementDescription,
      segementArray,
      inputStr,
      showPicker,
      Alltables,
    } = this.state

    const filteredSegments = segementArray.filter(eachItem =>
      eachItem.name.toLowerCase().includes(SegementSearch.toLowerCase()),
    )

    const ToggleClass = !showPicker && 'rotateImg'

    return (
      <div className="Home-page-container">
        <ProfileInformation />
        <div className="Prospector-container">
          <div>
            <h1 className="heading">Prospector</h1>
            <input
              placeholder="Search for a table or a segment"
              className="search-bar"
              type="search"
              value={SegementSearch}
              onChange={this.handleSearchInputChange}
            />
            <ul className="segments-list">
              {filteredSegments.length > 0 &&
                filteredSegments.map(eachItem => (
                  <li className="listItem" key={eachItem.id}>
                    <p className="icon-size">{eachItem.icon}</p>
                    <p className="segement-name">{eachItem.name}</p>
                  </li>
                ))}
            </ul>
          </div>
          <Popup
            modal
            trigger={
              <button className="add-button" type="button">
                + Add a Segement
              </button>
            }
          >
            {close => (
              <form className="Add-segement-Popup" onSubmit={this.submitForm}>
                <div className="top-section">
                  <h1 className="heading-of-pop-up">Add a Segement</h1>

                  <button
                    type="button"
                    className="close-pop-up-button"
                    data-testid="closeButton"
                    onClick={() => close()}
                  >
                    X
                  </button>
                </div>
                <label className="labelElement" htmlFor="Name">
                  Name*
                </label>
                <div className="input-emoji-container">
                  <input
                    type="text"
                    placeholder="Ex: Computer Software"
                    className="input-container"
                    value={SegementName}
                    onChange={this.storeName}
                    id="Name"
                  />
                </div>
                <label className="labelElement" htmlFor="Name">
                  Icon
                </label>
                <div className="input-emoji-container">
                  <input
                    className="input-container"
                    value={inputStr}
                    onChange={this.setInputString}
                  />
                  <img
                    src="https://res.cloudinary.com/nithinpaidi-ccbp-tech/image/upload/v1694516482/Vector_1_uz9dci.png"
                    alt="vector"
                    className="vector-icon "
                    onClick={this.TogglePicker}
                  />
                </div>
                <div className="emojis">
                  {showPicker && (
                    <Picker
                      pickerStyle={{width: '100%'}}
                      onEmojiClick={this.onEmojiClick}
                    />
                  )}
                </div>
                <label className="labelElement" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="description"
                  value={segementDescription}
                  onChange={this.storeDescription}
                >
                  Enter the description Here...
                </textarea>

                <div className="buttons-container">
                  <button
                    type="submit"
                    className="buttons"
                    onClick={this.addSegement}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="buttons cancelButton"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Popup>
        </div>

        <Display
          segementArray={segementArray}
          handleAddTableClick={this.handleAddTableClick}
          Alltables={Alltables}
        />
      </div>
    )
  }
}

export default HomePage
