import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import BaseCourseCard from './BaseCourseCard';
import Notification from './Notification';

const InProgressCourseCard = (props) => {
  const renderButtons = () => (
    <a className="btn btn-primary btn-block" href={props.linkToCourse}>Continue Learning</a>
  );

  const filteredNotifications = props.notifications.filter((notification) => {
    const now = moment();
    if (moment(notification.date).isBetween(now, moment(now).add('1', 'w'))) {
      return notification;
    }
    return false;
  });

  return (
    <BaseCourseCard buttons={renderButtons()} {...props}>
      {filteredNotifications.length > 0 && (
        <div className="notifications">
          <ul className="list-unstyled">
            {filteredNotifications.map(notificationProps => (
              <Notification key={notificationProps} {...notificationProps} />
            ))}
          </ul>
        </div>
      )}
    </BaseCourseCard>
  );
};

InProgressCourseCard.propTypes = {
  linkToCourse: PropTypes.string.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
};

export default InProgressCourseCard;
