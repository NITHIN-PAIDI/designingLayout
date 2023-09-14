import {AiOutlineDown} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import {v4 as uuidv4} from 'uuid'
import Picker from 'emoji-picker-react'
import {Component} from 'react'
import './index.css'

const colorPalette = [
  'rgba(207, 223, 255, 1)',
  'rgba(156, 199, 255, 1)',
  'rgba(45, 127, 249, 1)',
  'rgba(0, 103, 255, 1)',
  'rgba(0, 84, 209, 1)',
  'rgba(208, 240, 253, 1)',
  'rgba(119, 209, 243, 1)',
  'rgba(24, 191, 255, 1)',
  'rgba(64, 131, 172, 1)',
  'rgba(11, 118, 183, 1)',
  'rgba(194, 245, 233, 1)',
  'rgba(114, 221, 195, 1)',
  'rgba(32, 217, 210, 1)',
  'rgba(123, 200, 195, 1)',
  'rgba(6, 160, 155, 1)',
  'rgba(255, 179, 200, 1)',
  'rgba(255, 140, 173, 1)',
  'rgba(255, 140, 173, 1)',
  'rgba(255, 0, 73, 1)',
  'rgba(218, 2, 64, 1)',
  'rgba(255, 227, 175, 1)',
  'rgba(255, 214, 140, 1)',
  'rgba(255, 197, 92, 1)',
  'rgba(253, 178, 43, 1)',
  'rgba(232, 149, 0, 1)',
  'rgba(255, 159, 242, 1)',
  'rgba(254, 103, 233, 1)',
  'rgba(246, 56, 220, 1)',
  'rgba(255, 0, 220, 1)',
  'rgba(214, 0, 184, 1)',
  'rgba(255, 181, 152, 1)',
  'rgba(255, 158, 121, 1)',
  'rgba(255, 120, 68, 1)',
  'rgba(255, 71, 0, 1)',
  'rgba(197, 55, 0, 1)',
  'rgba(175, 181, 255, 1)',
  'rgba(142, 150, 255, 1)',
  'rgba(107, 118, 255, 1)',
  'rgba(49, 64, 255, 1)',
  'rgba(0, 19, 255, 1)',
  'rgba(131, 204, 139, 1)',
  'rgba(97, 199, 108, 1)',
  'rgba(32, 201, 51, 1)',
  'rgba(0, 181, 20, 1)',
  'rgba(51, 138, 23, 1)',
  'rgba(238, 238, 238, 1)',
  'rgba(204, 204, 204, 1)',
  'rgba(172, 172, 172, 1)',
  'rgba(102, 102, 102, 1)',
  'rgba(68, 68, 68, 1)',
]
class Display extends Component {
  state = {
    TableName: 'my-table',
    TableIcon: '',
    TableColor: '#234539',
    showPicker: false,
    RepectiveSegementId: '',
  }

  submitFormdata = event => {
    event.preventDefault()
    const {TableName, TableColor, TableIcon, RepectiveSegementId} = this.state
    const {handleAddTableClick} = this.props
    const Details = {
      id: uuidv4(),
      TableName,
      TableColor,
      TableIcon,
      RepectiveSegementId,
    }
    handleAddTableClick(Details)
  }

  storeTableName = event => {
    this.setState({TableName: event.target.value})
  }

  storeIcon = event => {
    this.setState({TableIcon: event.emoji})
  }

  TogglePicker = () => {
    this.setState(prevState => ({showPicker: !prevState.showPicker}))
  }

  setRespectiveSegmentId = segmentId => {
    console.log(segmentId)
    this.setState({RepectiveSegementId: segmentId})
  }

  render() {
    const {TableName, TableColor, TableIcon, showPicker} = this.state
    const {segementArray, Alltables} = this.props
    return (
      <div className="displaySection">
        <div className="Functionality-tool-bar">
          <div className="filter-dropDown">
            <img
              src="https://res.cloudinary.com/nithinpaidi-ccbp-tech/image/upload/v1694516461/Vector_asf0ux.png"
              className="icon-logo"
              alt="icon"
            />
            <img
              src="https://res.cloudinary.com/nithinpaidi-ccbp-tech/image/upload/v1694516482/Vector_1_uz9dci.png"
              className="Vector"
              alt="Vector-logo"
            />
            <img
              src="https://res.cloudinary.com/nithinpaidi-ccbp-tech/image/upload/v1694516506/image_3_aacbh6.png"
              className="functionalIcons"
              alt="icons"
            />
          </div>
        </div>
        <div className="display-segements-sections">
          <div>
            <ul className="segments-list-2">
              {segementArray.length > 0 &&
                segementArray.map(eachItem => (
                  <div>
                    <li className="listItem" key={eachItem.segementId}>
                      <p className="segement-size">{eachItem.icon}</p>
                      <h1 className="segement-tittle">{eachItem.name}</h1>
                      <AiOutlineDown className="icon" />
                    </li>
                    {
                      <Popup
                        modal
                        trigger={
                          <div className="all-the-tables">
                            {Alltables.filter(
                              each =>
                                each.RepectiveSegementId ===
                                eachItem.segementId,
                            ).map(each => (
                              <div className="tableDetails">
                                <div
                                  className="icons-container"
                                  style={{
                                    border: `2px solid ${each.TableColor}`,
                                  }}
                                >
                                  <h1>{each.TableIcon}</h1>
                                </div>
                                <h1 className="tableTittle">
                                  {each.TableName}
                                </h1>
                              </div>
                            ))}

                            <div className="tables-container">
                              <button
                                type="button"
                                className="add-table-section"
                                onClick={() =>
                                  this.setRespectiveSegmentId(
                                    eachItem.segementId,
                                  )
                                }
                              >
                                <h1>+</h1>
                              </button>
                            </div>
                          </div>
                        }
                      >
                        {close => (
                          <form
                            className="Add-segement-Popup"
                            onSubmit={this.submitFormdata}
                          >
                            <div className="top-section">
                              <h1 className="heading-of-pop-up">Add a Table</h1>
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
                                value={TableName}
                                onChange={this.storeTableName}
                                id="name"
                              />
                            </div>
                            <label className="labelElement" htmlFor="name">
                              Icon
                            </label>
                            <div className="input-emoji-container">
                              <input
                                className="input-container"
                                value={TableIcon}
                                onChange={this.storeIcon}
                              />
                              <img
                                src="https://res.cloudinary.com/nithinpaidi-ccbp-tech/image/upload/v1694516482/Vector_1_uz9dci.png"
                                alt="vector"
                                className="vector-icon"
                                onClick={this.TogglePicker}
                              />
                            </div>
                            <div className="emojis">
                              {showPicker && (
                                <Picker
                                  pickerStyle={{width: '100%'}}
                                  onEmojiClick={this.storeIcon}
                                />
                              )}
                            </div>
                            <label className="labelElement" htmlFor="color">
                              color
                            </label>
                            <div className="input-emoji-container">
                              <input
                                type="color"
                                className="color-element"
                                id="color"
                                list="colorOptions"
                                value={TableColor}
                                onChange={event =>
                                  this.setState({
                                    TableColor: event.target.value,
                                  })
                                }
                              />
                              <datalist id="colorOptions">
                                {colorPalette.map(color => (
                                  // eslint-disable-next-line jsx-a11y/control-has-associated-label
                                  <option
                                    className="color-box"
                                    key={color}
                                    htmlFor="id"
                                    name="color"
                                    value={color}
                                  />
                                ))}
                              </datalist>
                            </div>

                            <div className="buttons-container">
                              <button type="submit" className="buttons">
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
                    }
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Display
