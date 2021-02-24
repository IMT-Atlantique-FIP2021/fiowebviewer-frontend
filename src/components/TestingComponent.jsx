import { Component } from "react";
import { ChevronRight, ChevronDown } from "react-feather";

export default function TestingComponent() {
    return (
        <div className="mt-5">
            <div className="container mx-auto px-5">
                <div className="flex flex-row space-x-5">
                    <Table className="w-full flex-auto" name="Menu 1"/>
                    <Table className="w-full flex-auto" name="Menu 3"/>
                    <Table className="w-full flex-auto" name="Menu 2"/>
                </div>
            </div>
        </div>
    );
}

class Table extends Component {
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
                    {this.props.name}
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





function TableTestnameHeader(props) {
    return (
        <tr className="bg-green-600 text-white text-left border">
            <th className="text-center">
            </th>
            <th className="py-4 px-4 w-64">Job Name</th>
            <th className="py-4 px-4">Tags</th>
        </tr>
    )
}