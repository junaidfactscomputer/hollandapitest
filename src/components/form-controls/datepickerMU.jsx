import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

function DatepickerMU({ strDateDelivery }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //   const oneWeekFromNow = dayjs().add(7, "days");
  //   const minDate = dayjs();
  //   const maxDate = oneWeekFromNow;

  const currentDate = dayjs();
  const startOfWeek = currentDate.startOf("week"); // Sunday
  const endOfWeek = currentDate.endOf("week"); // Saturday
  const minDate = startOfWeek.add(2, "days"); // Tuesday
  const maxDate = endOfWeek.subtract(2, "days"); // Friday

  const shouldDisableDate = (date) => {
    // Disable all dates except the allowed date
    return !date.isSame(allowedDate, "day");
  };
  const allowedDate = new Date(strDateDelivery);

  //   const [value, setValue] = React.useState<Dayjs | null>(
  //     dayjs('2014-08-18T21:11:54'),
  //   );

  //   const handleChange = (newValue: Dayjs | null) => {
  //     setValue(newValue);
  //   };

  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    //   <DatePicker
    //     label="Select Date"
    //     value={selectedDate}
    //     onChange={handleDateChange}
    //     renderInput={(props) => <TextField {...props} />}
    //   />
    // </LocalizationProvider>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <MobileDatePicker
          label="Arrival Date"
          inputFormat="MM/DD/YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          // minDate={minDate}
          // maxDate={maxDate}
          shouldDisableDate={shouldDisableDate}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default DatepickerMU;
