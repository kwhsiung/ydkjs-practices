const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime,durationMinutes) {
  durationMinutes = +durationMinutes
  const [meetingTimeStartHour, meetingTimeStartMinute] = startTime.split(':')
  const [meetingTimeEndHour, meetingTimeEndMinute] = calcMeetingTimeEnd()
  const meetingTimeStart = `${formatToString(meetingTimeStartHour)}:${formatToString(meetingTimeStartMinute)}`
  const meetingTimeEnd = `${formatToString(meetingTimeEndHour)}:${formatToString(meetingTimeEndMinute)}`

  // NOTE: since expressions are all strings,
  // comparisons here are alphabetic, but it's
  // safe here since they're fully qualified
  // time strings (ie, "07:15" < "07:30")
  const result = (dayStart <= meetingTimeStart) && (meetingTimeEnd <= dayEnd)
  console.log(result)

  function calcMeetingTimeEnd() {
    let meetingTimeEndHour = meetingTimeStartHour
    let meetingTimeEndMinute = +meetingTimeStartMinute + durationMinutes
    if (meetingTimeEndMinute >= 60) {
      meetingTimeEndHour = +meetingTimeStartHour + Math.floor(meetingTimeEndMinute / 60)
      meetingTimeEndMinute -= Math.floor((meetingTimeEndMinute / 60)) * 60
    }
    return [meetingTimeEndHour, meetingTimeEndMinute]
  }

  function formatToString(number) {
    return number.toString().padStart(2, '0')
  }
}

scheduleMeeting("7:00",15);     // false
scheduleMeeting("07:15",30);    // false
scheduleMeeting("7:30",30);     // true
scheduleMeeting("11:30",60);    // true
scheduleMeeting("17:00",45);    // true
scheduleMeeting("17:30",30);    // false
scheduleMeeting("18:00",15);    // false