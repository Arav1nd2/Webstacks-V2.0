import React, { Component } from 'react';
import defaultImage from '../../assets/fogg-searching-1.png';
import './Task.css';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: 0
        }
        this.handleSelect = (e) => {
            console.log(e);
            this.setState({
                task: e.target.value
            })
        }
    }

    render() {
        return(
            <div>
                <div className="task__title">
                <h4>It all starts with Passion</h4>
                <p>Do what you love and love what you do</p>
                </div>
                <div className="task__list">
                    <select onChange = {this.handleSelect} value = {this.state.task}>
                        <option value = {0}>---Task---</option>
                        <option value = {1}>Task1</option>
                        <option value = {2}>Task2</option>
                        <option value = {3}>Task3</option>
                        <option value = {4}>Task4</option>
                        <option value = {5}>Task5</option>
                    </select>
                </div>
                {this.state.task === 0 &&
                    <div>
                        <img src = {defaultImage} className="task__default-image" alt="" />
                    </div>
                }
                {this.state.task !== 0 &&
                    <div className="task__loader">
                        <div className="task__title-line"></div>
                        <div className="task__content-lines"></div>
                        <div className="task__content-lines"></div>
                        <div className="task__content-lines"></div>
                        <div className="task__content-lines"></div>
                        <div className="task__content-lines"></div>
                    </div>
                }
            </div>
        )
    }
}

export default Task