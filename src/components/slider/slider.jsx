import React, { Component } from "react";
import { firestore } from "../../firebase";
import { connect } from "react-redux";

import InputRange from "react-input-range";
import "./slider.scss";

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: this.props.image,
      name: this.props.name,
      total: this.props.total,
      show: this.props.show,
      showName: false,
      newValueName: [],
    };
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleNameSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await firestore
        .collection("users")
        .doc(this.props.currentUser.currentUser.id)
        .get();
      let posts = res.data();
      console.log(posts.bills);

     posts.bills.map((bill) =>
        this.setState({
            newValueName: [...this.state.newValueName, JSON.stringify(bill.name)],
        })
      );
    } catch (err) {
      console.log(err);
    }
    console.log(this.state);
  };

  handleChange = (event) => {
    const input = parseInt(event.target.value);
    if (isNaN(input) || input.length === 0) {
    }
    this.setState(
      {
        total: input,
      },
      this.updateLibraryCount
    );
  };

  handleSum(total) {
    this.setState(
      {
        total: total,
      },
      this.updateLibraryCount
    );
  }

  updateLibraryCount() {
    this.props.sumItAll(this.state);
  }

  changeName = (e) => {
    if (this.state.showName === false) {
      this.setState({
        showName: true,
      });
    } else {
      this.setState({
        showName: false,
      });
    }
  };

  render() {
    const { name, total, image } = this.state;
    return (
      <div className="container" style={{ height: "170px" }}>
        <div className="row">
          <div className="col-7 align-self-center">
            <InputRange
              maxValue={5000}
              value={isNaN(total) || 5000 < total ? 0 : total}
              onChange={(total) => this.setState({ total })}
              onChangeComplete={(total) => this.handleSum(total)}
            />
          </div>
          <div className="col  align-self-end">
            {this.state.showName ? (
              <div>
                <div>
                  <label style={{
                      float:"right",
                      display:"block",
                      position:"relative",
                      top:"-15px",
                      background:"white",
                      color:"#f78900",
                      border:"2px solid black",
                      padding:"10px",
                      borderRadius:"7px",
                      fontWeight: "bold"
                      

                  }}>
                  {this.state.name}
                  </label>
                </div>
              </div>
            ) : null}

            <br></br>

            <img src={image} onClick={({ name }) => this.changeName(name)} />
          </div>
        </div>
        <div className="container">
          <div className="row ">
            <div className=" ">
              <input
                maxLength="4"
                className="input"
                value={isNaN(total) || 5000 < total ? 0 : total}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Slider);
