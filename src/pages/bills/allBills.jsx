import React, { Component } from "react";
import { connect } from "react-redux";
import { firestore } from "../../firebase";
import { Bar } from "react-chartjs-2";
import Main from "../../components/monthBox/MonthBox";


class AllBills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateValue: this.props.value,
      bills: [],
      email: "",
      sumTotal: 0,
      labels: [],
      datasets: [
        {
          label: "",
          backgroundColor: "#f6be4c",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [],
        },
      ],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.renderPosts();
    }, 3000);
  }

  renderPosts = async () => {
    try {
      let res = await firestore
        .collection("users")
        .doc(this.props.currentUser.currentUser.id)
        .get();
      let posts = res.data();
      console.log(posts.bills);

      this.setState({
        bills: posts.bills,
        email: posts.email,
        sumTotal: posts.sumTotal,
      });

      this.state.bills.map((bill) =>
        this.setState({
          labels: [...this.state.labels, JSON.stringify(bill.name)],
          label: [...this.state.labels, JSON.stringify(bill.name)],
        })
      );

      const data = this.state.datasets[0].data;

      this.state.bills.map((bill, i) => {
        let billTotal = bill.total;
        let stringTotal = "";
        stringTotal += billTotal;
        data.push(stringTotal);
      });
      data.push(0);
      this.setState({
        data: [...data],
      });

      console.log(this.state.datasets[0].data);
    } catch (err) {
      console.log(err);
    }
    console.log(this.state);
  };

  

  handleForm = (value) => {
    firestore
      .collection("users")
      .doc(this.props.currentUser.currentUser.id)
      .update({
        dateValue: this.state.dateValue,
      });
    console.log();
  };

  render() {
    console.log(this.state.dateValue);
    return (
      <div>
        {this.state.email ? (
          <div>
            {this.state.email}
            <div className="sum draw">TOTAL:{this.state.sumTotal}</div>
            <Bar
              redraw={true}
              key={Math.random()}
              data={this.state}
              width={50}
              height={40}
              options={{
                title: {
                  display: true,
                  text: "Expense per month",
                  fontSize: 10,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
            <div className="container">
              <div className="d-flex justify-content-center">
                <form>
                  <Main
                    currentUser={this.props.currentUser}
                    ref={this.formRef}
                  />
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="d-flex justify-content-center">
              <img
                style={{
                  width: "500px",
                  height: "400px",
                }}
                src="https://cdn.dribbble.com/users/1698559/screenshots/3790348/___.gif"
              />
              <span></span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(AllBills);
