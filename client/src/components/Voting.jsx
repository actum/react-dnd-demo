import React, { Component } from 'react';

class Voting extends Component {
    render() {
        return (
            <div className="voting">
                {this.props.winner ? <div ref="winner">Winner is {this.props.winner}!</div> 
                :
                this.props.pair.map(entry => 
                    <button key={entry}
                            disabled={!this.props.hasVoted}
                            onClick={ () => this.props.vote(entry) }>
                        <h1>{entry}</h1>
                        {this.props.hasVoted === entry ? <span className="label">Voted</span> : null}
                    </button>
                )}
            </div>
        );
    }
}
export default Voting;