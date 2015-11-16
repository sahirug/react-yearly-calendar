# React-yearly-calendar

[React](http://facebook.github.io/react/) calendar component with yearly view.

[![npm version](https://badge.fury.io/js/react-yearly-calendar.svg)](https://badge.fury.io/js/react-yearly-calendar)

```bash
$ npm install react-yearly-calendar
```

# Demo
**[http://belkalab.github.io/react-yearly-calendar/](http://belkalab.github.io/react-yearly-calendar)**

Or taste an example usage below:
```js
var ReactDOM = require('react-dom');
var {Calendar, CalendarControls} = require('react-yearly-calendar');

function onDatePicked(date) {
  alert(date);
}

ReactDOM.render(
  <Calendar
    onPickDate={onDatePicked}
  />,
  document.getElementById('calendar')
);
```

## Options

#### Calendar

- **year: React.PropTypes.number.isRequired**: current year number [*default: current year*],
- **selectedDay: moment.js object**: selected day [*default: today*],
- **forceFullWeeks: React.PropTypes.bool**: match calendar row end with row start [*default: false*],
- **showDaysOfWeek: React.PropTypes.bool**: show days of week table header [*default: true*]

#### CalendarControls

-  **year: React.PropTypes.number.isRequired**: current year number [*default: current year*],
-  **showTodayButton: React.PropTypes.bool**: show `today` button on top left [*default: true*]

## Callbacks

#### Calendar

- **onPickDate: React.PropTypes.func**: *func(selectedDay)* called when user clicks on a day

#### CalendarControls

-  **onPrevYear: React.PropTypes.func**: *func()* called on user clicking `«` (*previous year button*),
-  **onNextYear: React.PropTypes.func**: *func()* called on user clicking `»` (*next year button*),
-  **goToToday: React.PropTypes.func**: *func()* called on user clicking the `today` button

## Styling guide
The calendar is rendered as an html `table` element, to ensure proper displaying even in case the style isn't being loaded.

Take a look at the css file in `examples/basic/style.css`. Here are some head-ups if you want to style it yourself.

 - `table.calendar`: the main element that renders the calendar
 - `table.calendar thead`: renders the week day names
 - `table.calendar thead th.bolder`: adds `bolder` class to Sundays
 - `table.calendar td.month-name`: first column in table body, showing month names
 - `table.calendar td.prev-month`, `table.calendar td.next-month`: classes applied to the days of the previous and next month showed in a month's row to fill it up. Day numbers and callbacks are present even in these cells, so we suggest to play with text color to make days less intrusive and add `pointer-events: none` to prevent clicking.
 - `table.calendar td.selected`: the currently selected day
 - `table.calendar td.bolder`: the days which are Sundays


 - `div.calendar-controls`: the main CalendarControls container
 - `div.calendar-controls .current-year`: the current year
 - `div.calendar-controls .controls`: applies to *next* and *previous* arrows and to *today* button
 - `div.calendar-controls .today`: the *today* button

## Build it yourself

Clone and run

```bash
$ npm install
```

## License
react-yearly-calendar is Copyright (c) 2015 Belka, srl. It is free software, and may be redistributed under the terms specified in the LICENSE file.  

## About Belka
![Alt text](http://s2.postimg.org/rcjk3hf5x/logo_rosso.jpg)

[Belka](http://belka.us/en) is a Digital Agency specialized in design, mobile applications development and custom solutions.
We love open source software! You can [see our projects](http://belka.us/en/portfolio/) or look at our case studies.

Interested? [Hire us](http://belka.us/en/contacts/) to help build your next amazing project.

[www.belka.us](http://belka.us/en)
