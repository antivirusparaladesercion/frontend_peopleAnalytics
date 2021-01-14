import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, user1, ...rest }) => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={user1.picture} />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
            align="center"
          >
            {user1.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`Actualizado`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${user1.updated_at}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
