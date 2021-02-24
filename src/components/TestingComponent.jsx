import { Component } from "react";
import { ChevronRight, ChevronDown } from "react-feather";

export default function TestingComponent() {
    return (
        <div className="mt-5">
            <div className="container mx-auto px-5">
                <div className="flex flex-row space-x-5">
                    <TableParent className="w-full flex-auto"/>
                    <TableParent className="w-full flex-auto"/>
                    <TableParent className="w-full flex-auto"/>
                </div>
            </div>
        </div>
    );
}

class TableParent extends Component {
    constructor(props) {
        super(props);
        this.onVisibilityChange = this.onVisibilityChange.bind(this)
        this.state = { isReduced: true }
    }

    onVisibilityChange() {
        this.setState({ isReduced: !this.state.isReduced });
    }

    render() {
        return (
            <div className="flex flex-col">
                <div className="bg-red-500 w-full">
                    FIRST
                    <TableHeader isReduced={this.state.isReduced} callbackHandler={this.onVisibilityChange} />
                </div>
                {
                    !this.state.isReduced && 
                    <div className="bg-blue-500 w-full">SECOND</div>
                }
            </div>
        )
    }
}

class TableHeader extends Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    onClickHandler() {
        this.props.callbackHandler();
    }

    render() {
        const btnClass = "align-bottom";
        const isReduced = this.props.isReduced;

        if (isReduced) {
            return (
                <button onClick={this.onClickHandler} className={btnClass}>
                    <ChevronRight/>
                </button>
            );
        } else {
            return (
                <button onClick={this.onClickHandler} className={btnClass}>
                    <ChevronDown/>
                </button>
            );
        }

        
    }
}
