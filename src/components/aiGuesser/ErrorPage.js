import React, { Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {restart} from '../../redux/actions/aiGuesserActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        marginTop: '50px',
        display: 'block',
        margin: 'auto',
        width: 400,
        height: 100,
        fontSize: 40
    }
})

class ErrorPage extends Component {

    handleClick = () => {
        this.props.restart();
    }
    
    render() {
        const {classes, ai: {history}} = this.props;

        return (
            <div>
                 <Typography align= "center" variant="h4" colors ="textSecondary" color = "secondary">
                     Hmmm... the numbers don't seem to be adding up.
                </Typography>
                <Typography align= "center" variant="h5" colors ="textSecondary" color = "secondary">
                     Check out the previous guesses and the score you gave them below:
                </Typography>
                <Typography align= "center" variant="h5" colors ="textSecondary" color = "secondary">
                </Typography>
                {
                    history.map( ({guess,score}) => (
                        <div>
                             <Typography align= "center" variant="h5" colors ="textSecondary" color = "secondary">
                                {guess[0]}{guess[1]}{guess[2]}{guess[3]} . . . . . . {score[0]},{score[1]}
                            </Typography>
                        </div>
                    ))    
                }
                 <Button variant="contained" color = "secondary" className = {[classes.button]}
                onClick = {this.handleClick}
                >Try again</Button>
            </div>
        )
    }
}

ErrorPage.propTypes = {
    restart: PropTypes.func.isRequired,
    ai: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ai: state.ai
})

export default connect(mapStateToProps,{restart})(withStyles(styles)(ErrorPage))
