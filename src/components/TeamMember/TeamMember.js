import React from 'react';
import PropTypes from 'prop-types';
import './TeamMember.css';
import CodelitEmptyAvatar from '../../assets/codelit_empty_avatar.svg';
import axios from "axios";
import {Field, Form, Formik, useField} from "formik";

const MyTextArea = ({label, ...props}) => {
  const [field] = useField(props);
  return (
      <>
        <textarea className="text-area" {...field} {...props} />
      </>
  );
};

class TeamMember extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
    story: PropTypes.string,
    favoriteColor: PropTypes.string
  };
  static defaultProps = {
    photoUrl: CodelitEmptyAvatar,
    story: null,
    favoriteColor: '#3466F2'
  };
  state = {showForm: false}

  showForm = () => {
    return (
        <Formik
            initialValues={{
              firstName: "",
            }}
            onSubmit={async (values) => {
              if (!values.firstName || !values.lastName || !values.story || !values.title) {
                alert("First Name, Last Name, Title and Story are required");
              } else {
                await axios.post('/create', {values: values});
                this.setState({
                  showForm: false
                });
                this.props.updateFromChild();
              }
            }}
        >
          <Form>
            <Field name="firstName" placeholder="First Name" type="text"/>
            <Field name="lastName" placeholder="Last Name" type="text"/>
            <br/> <br/>
            <Field name="title" placeholder="Title" type="text"/><br/> <br/>
            <MyTextArea
                      name="story"
                      rows="6"
                      placeholder="Story"/>
            <br/> <br/>

            <Field name="favoriteColor" placeholder="Favorite Color" type="text"/>
            <Field name="photoUrl" placeholder="Photo Url" type="text"/> <br/>
            <br/>

            <button type="submit">Submit</button>
          </Form>
        </Formik>
    );
  }

  render() {
    return (
        <div className="container">
          <header>
            <div className="avatar-container">
              <img
                  className="avatar"
                  src={this.props.photoUrl}
                  alt={this.props.name}
              />
            </div>
            <h2 className="title">{this.props.title}</h2>
            <button className="name" onClick={() => this.setState({showForm: true})}>{this.props.name}</button>
            {this.state.showForm ? this.showForm() : null}
          </header>
          <div className="body">{this.props.story}</div>
          <footer style={{backgroundColor: this.props.favoriteColor}}>
            <div className="full-width-flex-box">
              <div className="one-third-flex-box stat">9.0</div>
              <div className="one-third-flex-box stat bordered">9.0</div>
              <div className="one-third-flex-box stat">9.0</div>
            </div>
            <div className="full-width-flex-box">
              <div className="one-third-flex-box">CANDID</div>
              <div className="one-third-flex-box">LEARNING</div>
              <div className="one-third-flex-box">GRIT</div>
            </div>
          </footer>
        </div>
    );
  }
}

export default TeamMember;
