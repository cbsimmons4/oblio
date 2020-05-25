import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {startGuessing} from '../../redux/actions/aiGuesserActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    gotIt: {
        marginTop: '50px',
        display: 'block',
        margin: 'auto',
        width: 200,
        height: 100,
        fontSize: 40
    },
    textContainer: {
        marginTop: '50px',
        margin: 'auto',
        width: '80%'
    }
});

class PlayerThinking extends Component {

    handleClick = () => {
        this.props.startGuessing();
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className ={classes.textContainer}>
                    <Typography className ={classes.title} align="center" variant="h4" colors ="textSecondary" color = "primary"> 
                        Think of a 4 digit number with no repeating digits
                    </Typography>
                    <Typography className ={classes.title} align="center" variant="body1" colors ="textSecondary" color = "primary"> 
                        Ex: 4289 or 7954 or 1234 or even 0157 are all possible choices!
                    </Typography>
                    <Typography className ={classes.title} align="center" variant="body1" colors ="textSecondary" color = "primary"> 
                        Note: numbers with leading zeros (ie. 0157) are ok!
                    </Typography>
                    <Typography className ={classes.title} align="center" variant="body1" colors ="textSecondary" color = "primary"> 
                        However, values like 4757, 0048, 9999, and 6556
                        are not valid options because they all have at least one repeating digit
                    </Typography>
                </div>
                
                <Button variant="contained" color="primary" className = {classes.gotIt}
                onClick = {this.handleClick}
                >Got it!</Button>
            </div>
        )
    }
}

PlayerThinking.propTypes = {
    startGuessing: PropTypes.func.isRequired,
    ai: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ai: state.ai
})

export default connect(mapStateToProps, {startGuessing} )(withStyles(styles)(PlayerThinking))
