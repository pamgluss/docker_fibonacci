import React, { Component } from 'react';
import axios from 'axios';

class FibCalculator extends Component {
    state = {
        seenIndices: [],
        values: {},
        index: ''
    };

    componentDidMount(){
        this.fetchValues();
        this.fetchIndices();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({
            values: values.data
        })
    }

    async fetchIndices(){
        const indices = await axios.get('/api/values/all');
        this.setState({
            seenIndices: indices.data
        });
    };

    renderSeenIndices (){
        return(
            <div>
                <h3>Indices We Have Seen</h3>
                {this.state.seenIndices.map(({ number }) => number).join(', ')}
            </div>
        )
    }

    renderValues(){
        const entries = [];

        for(let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            )
        }

        return entries;
    }

    formSubmissionHandler = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index
        });

        this.setState({ index: '' });
    }

    render(){
        return(    
            <div className="FibCalculator">
                <form onSubmit={this.formSubmissionHandler}>
                    <label>
                        Enter Index to calculate
                    </label>
                    <input 
                        value={this.state.index}
                        onChange={event => this.setState({ index: event.target.value })}
                    />
                    <input type='submit' />
                </form>

                {this.renderSeenIndices()}

                <p>Previously Calculated Values</p>
                {this.renderValues()}

            </div>
        )
    };
};

export default FibCalculator;
