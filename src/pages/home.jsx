import React, { Component } from "react";
import "./home.scss";
import Slider from "../components/slider/slider";

import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { firestore } from "../firebase";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: true,
      showSumValue: false,
      rangeValue: {
        from: { year: 2019, month: 5 },
        to: {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
        },
      },
      show: false,
      sumTotal: 0,
      bills: [
        {
          name: "חשמל",
          total: 0,
          image:
            "https://images-na.ssl-images-amazon.com/images/I/31hmgQRUgYL._AC_.jpg",
        },
        {
          name: "מים",
          total: 0,
          image:
            "data:image/png;base64,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",
        },
        {
          name: "שכירות",
          total: 0,
          image:
            "https://i.pinimg.com/originals/a7/aa/8d/a7aa8d645c25a065ce261d7741d5f73d.png",
        },
      ],
    };
    this.pickRange = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let sumi = 0;
    this.state.bills.map((bill, i) => {
      if (isNaN(bill.total)) {
        bill.total = 0;
      }
      sumi += bill.total;
    });
    this.setState({
      sumTotal: sumi,
    });
    const currentUser = this.props.currentUser;


    if (currentUser.currentUser === null || currentUser === null) {
      //
      this.setState({
        showSumValue: true,
      });
    } else {
      firestore
        .collection("users")
        .doc(currentUser.currentUser.id)
        .update({ bills: this.state.bills, sumTotal: sumi });
      this.props.history.push("/bills");
    }
  };

  sumItAll = (_State) => {
    const ObjNum = this.state.bills.findIndex(
      (_bill) => _bill.name === _State.name
    );
    //then update its value in the Library component


    this.state.bills[ObjNum].total = _State.total;
  };

  addSlider = () => {
    if (this.state.show === false) {

      this.setState({
        show: true,
        bills: [
          ...this.state.bills,
          {
            name: "הוצאה"+Math.floor((Math.random() * 100) + 1),
            total: 0,
            image:
              "https://png.pngtree.com/png-vector/20191108/ourmid/pngtree-business-cost-cut-expense-finance-money-flat-color-icon-vec-png-image_1966455.jpg",
          },
        ],
      });
    }
    this.setState({
      show: false,
    });
  };

  refreshPage() {
    this.setState({
      count: false,
    });
    if (this.state.count === false) {
      window.location.reload(false);
      this.setState({
        count: true,
      });
    }
  }

  componentWillMount() {
    this.refreshPage();
  }

  render() {
    const listItems = this.state.bills.map((bill, i) => (
      <Slider
        key={i}
        total={bill.total}
        image={bill.image}
        name={bill.name}
        sumItAll={this.sumItAll}
      />
    ));
    return (
        
      <div className="container">
        <div className="d-flex justify-content-center">
          <form onSubmit={this.handleSubmit}>
            <div className="d-flex justify-content-center"></div>
            <h1>חשבונות</h1>
            <br></br> <br></br>
            <div className="row">{listItems}</div>
            <div className="button">
              <br></br> <br></br>
              <div className="sum draw">
                {this.state.showSumValue ? (
                  <div>
                    {this.state.sumTotal + ':ש"ח'}
                    <br></br>
            
                  </div>
                ) : null}
              </div>
              <div className="row ">
                <button
                  style={{
                    width: "100%",
                  }}
                >
                  שמור
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="button">
          <button className="button" onClick={this.addSlider}>
            שורה חדשה
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Home);
