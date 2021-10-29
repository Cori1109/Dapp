import moment from "moment"

export const getFormatDate = (lastDate) => {
  let duration = moment.duration(lastDate.diff(moment(new Date())))
  let _seconds =  duration.asSeconds()
  let day_unit = 3600 * 24
  let hrs_unit = 3600
  let min_unit = 60
  let days = parseInt(_seconds  / day_unit)
  if (days < 0)
    days = 0
  let hrs = parseInt((_seconds  - (days * day_unit)) / hrs_unit)
  if (hrs < 0)
    hrs = 0
  let mins = parseInt((_seconds  - day_unit * days - hrs * hrs_unit) / min_unit)
  if (mins < 0)
    mins = 0
  let seconds = parseInt((_seconds  - day_unit * days - hrs * hrs_unit) % min_unit)
  if (seconds < 0)
    seconds = 0
  let result = ''
  if (days > 0) {
    result = (days + 'Days ' + hrs + 'Hours')
  } else {
    if (hrs > 0)
      result = (hrs + 'Hours ' + mins + 'Min')
    else {
      if (mins > 0)
        result = (mins + 'Min ' + seconds + 'Sec')
      else
        result = (seconds + 'Sec')
    }
  }

  return result 
}