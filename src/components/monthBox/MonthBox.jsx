import React, { Component } from "react";
import "./Demo.css";

import Picker from "react-month-picker";
import "react-month-picker/css/month-picker.css";

class MonthBox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.value || "N/A",
    };
    this._handleClick = this._handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || "N/A",
    });
  }
  render() {
    return (
      <div className="box" onClick={this._handleClick}>
        <label>{this.state.value}</label>
      </div>
    );
  }

  _handleClick(e) {
    this.props.onClick && this.props.onClick(e);
  }
}

class List extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      mvalue: { year: new Date().getFullYear(), month: new Date().getMonth() },
    };

    this.handleClickMonthBox = this.handleClickMonthBox.bind(this);
    this.handleAMonthChange = this.handleAMonthChange.bind(this);
    this.handleAMonthDissmis = this.handleAMonthDissmis.bind(this);
    
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || "N/A",
    });
  }

  render() {
    const pickerLang = {
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      from: "From",
      to: "To",
    };
    const mvalue = this.state.mvalue;

    const makeText = (m) => {
      if (m && m.year && m.month)
        return pickerLang.months[m.month - 1] + ". " + m.year;
      return "?";
    };

    return (
      <div>
        <br></br> <br></br>
        <div>
          <div className="edit">
            <label>
              <b>Pick A Month</b>
            </label>
            <Picker
              ref="pickAMonth"
              value={mvalue}
              years={[2019, 2020, 2021, 2022, 2023]}
              lang={pickerLang.months}
              onChange={this.handleAMonthChange}
              onDismiss={this.handleAMonthDissmis}
            >
              <MonthBox
                value={makeText(mvalue)}
                onClick={this.handleClickMonthBox}
              />
            </Picker>
          </div>
        </div>
      </div>
    );
  }

  handleClickMonthBox(e) {
    this.refs.pickAMonth.show();
  }
  handleAMonthChange(value, text) {
    const date2 = { year: value, month: text };

    this.refs.pickAMonth.dismiss();
    console.log(date2)
  }
  handleAMonthDissmis = (value) => {
    this.setState({ mvalue: value });
  };
}

class Main extends Component {
  constructor(props, context) {
    super(props, context);
   
    
    this.state = {
      value: this.props.value,
    };
    
 
  }

  

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    });

  }




  render() {
      
    return (
      <div className="list-area">
        <List />
      </div>
    );
  }
}

export default () => {
  return <Main />;
};
