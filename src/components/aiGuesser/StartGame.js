import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {startGame} from '../../redux/actions/aiGuesserActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    startButton: {
        marginTop: '100px',
        display: 'block',
        margin: 'auto',
        width: 200,
        height: 100,
        fontSize: 40
    }
});

class StartGame extends Component {

    handleClick = () => {
        this.props.startGame();
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" className = {classes.startButton}
                onClick = {this.handleClick}
                >Play!</Button>
            </div>
        )
    }
}

StartGame.propTypes = {
    startGame: PropTypes.func.isRequired,
    ai: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ai: state.ai
})

export default connect(mapStateToProps, {startGame} )(withStyles(styles)(StartGame))
