import React, { Component } from 'react';
import { Link } from 'react-router'
import ProfileCanvas from './profileCanvas.jsx'
import CommentComponent from './CommentComponent.jsx'
import {connect} from 'react-redux'


const ProfileDoodle = (props) => {
  const masterpiece = props.masterpiece;
  const profile = props.profile;

  const masterpieceVersion = props.versions[masterpiece.versions[0]];
  const comments = masterpiece.comments;

  return (
   <div className="row big-doodle">
      <div className="big-doodle-border">
        <div className="col-xs-12">
          <div className="col-xs-12 col-md-4">
            <hr className="divider-rule"/>
            <h3>{ masterpiece && masterpiece.name }</h3>
   {/*
            <h3><Link to={`/profile/${profile.id}`}>{ profile.firstName } { profile.lastName }</Link></h3>
    */}
          </div>
          <Link to="/masterpiece">
            <div className="col-xs-12 col-md-8">
              <div className="masterpiece-container">
                <ProfileCanvas height="450" width="450" json={ masterpieceVersion && masterpieceVersion.data} />
              </div>
            </div>
          </Link>
        </div>
        <div className="col-xs-12">
          <CommentComponent masterpiece={props.masterpiece} profile={props.profile}/>
          <div className="col-xs-12">
            {comments ?
            <h3>Comments:</h3>
            :null
            }
          </div>
          <div className="col-xs-3">
            { comments && comments.map(comment => {
                return (
                  <div>
                  <h4><Link to={`/profile/${comment.users[0].id}`}>{comment.users[0].fullName}</Link></h4>
                    <ProfileCanvas json={comment.versions[0].data} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    versions: state.versions
  }
}

export default connect(mapStateToProps)(ProfileDoodle)
