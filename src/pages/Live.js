import React, { Component } from "react";
import { db, auth } from "../services/firebase";
import { CURRENT_DAY_DB_PATH } from "../services/utils";
import Center from "../components/Center";
import Box from "ui-box"
import { Pie } from "react-chartjs-2";
import { Paragraph, Heading } from "evergreen-ui";

export default class Live extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  async componentDidMount() {
    // alert(auth.currentUser)
    if (!auth.currentUser) { // this is for both CE members and general public
        // this is needed as only authenicated users can read from db
        // if CE member goes to this this page first and then goes to sign in,
        // their normal password account should repalce it
        await auth.signInAnonymously();
        // alert("signed in");
    } else {
        console.log("Already signed in", auth.currentUser.isAnonymous);
    }

    db.ref(CURRENT_DAY_DB_PATH).on("value", (students) => {
        
    //   console.log(students.exists());
    
      if (!students.exists()) return;

      // if (!students.exists()) {
      //     this.setState({ data: null });
      // }
      const data = {};
      students.forEach((snapshot) => {
        const student = snapshot.val();
        // console.log(student)
        const { house } = student;
        if (!data[house]) {
          data[house] = { number: 1, color: this.getHouseColor(house) };
        } else {
          data[house].number += 1;
        }
      });
      console.log(data);
      this.setState({ data: this.formatData(data) });
    });
  }

  formatData(data) {
    console.log(Object.values(data).map((house) => house.number));
    return {
      labels: Object.keys(data).map((house) => this.getHouseName(house)),
      datasets: [
        {
          data: Object.values(data).map((house) => house.number),
          backgroundColor: Object.values(data).map((house) => house.color),
        },
      ],
    };
  }

  getHouseColor = (house) => {
    switch (house) {
      case "A":
        return "yellow";
      case "C":
        return "red";
      case "N":
        return "green";
      case "W":
        return "blue";

      default:
        return "#F9F9FB";
    }
  };

  getHouseName = (house) => {
    switch (house) {
      case "A":
        return "Alexander";
      case "C":
        return "Connaught";
      case "N":
        return "New";
      case "W":
        return "Woollcombe";

      default:
        return "#F9F9FB";
    }
  };
  render() {
    return (
      <Center>
        {this.state.data ? (
          <Box textAlign="center">
              <Heading marginBottom="1rem" fontWeight="bold" size={900} color="#47B881" >Live DD4C Results</Heading>
            <Pie data={this.state.data} height={300}/>
          </Box>
        ) : (
          <Paragraph fontSize="1rem" color="muted">
            There is no data to show yet.
          </Paragraph>
        )}
      </Center>
    );
  }
}
