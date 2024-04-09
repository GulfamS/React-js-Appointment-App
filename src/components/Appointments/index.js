import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    inputTitle: '',
    inputDate: '',
    isFilterActive: '',
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeTitleInput = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({inputDate: event.target.value})
  }

  onAddAppointmenet = event => {
    event.preventDefault()
    const {inputTitle, inputDate} = this.state
    const formatDate = inputDate
      ? format(new Date(inputDate), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: inputTitle,
      date: formatDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      inputTitle: '',
      inputDate: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {inputTitle, inputDate, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="bg-container">
        <div className="appointment-card">
          <div className="add-appointment-container">
            <form className="form" onSubmit={this.onAddAppointmenet}>
              <h1 className="heading">Add Appointment</h1>
              <label className="title-label" htmlFor="titleInput">
                TITLE
              </label>
              <input
                type="text"
                className="title-input"
                placeholder="Title"
                id="titleInput"
                value={inputTitle}
                onChange={this.onChangeTitleInput}
              />
              <label className="date-label" htmlFor="dateInput">
                DATE
              </label>
              <input
                type="date"
                className="date-input"
                id="dateInput"
                value={inputDate}
                onChange={this.onChangeDateInput}
              />
              <button
                type="button"
                className="add-appointment-btn"
                onClick={this.onAddAppointmenet}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <div>
            <hr className="line" />
            <div className="bottom-container">
              <h1 className="appointment-item-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
