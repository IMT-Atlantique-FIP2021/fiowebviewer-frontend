import ResultListTest from "../assets/resultList.json";
import ResultExplorer from './ResultExplorer'
import { Component } from "react";
import { ChevronRight, ChevronDown } from "react-feather";

export default function Result() {
    return (
        <div className="mt-5">
            <div className="container mx-auto px-5">
                <div className="flex flex-row space-x-5">
                    <TableTest />
                    <TableJobs />

                </div>
            </div>
        </div>
    );
}


function TableTest() {
    return (
        <table className="shadow-md bg-white flex-auto ">
            <TableTestnameHeader />
        </table>
    )
}

function TableTestnameHeader() {
    return (
        <tr className="bg-green-600 text-white text-left border">
            <th className="text-center"><ChevronToggle />
            </th>
            <th className="py-4 px-4 w-64">Job Name</th>
            <th className="py-4 px-4">Tags</th>
        </tr>
    );
}

function ExpandTableTestname(){
    return(
        <div></div>
    );
}



function TableJobs() {
    return (
        <table className="shadow-md bg-white flex-auto ">
            <TableJobsHeader />
        </table>
    )
}

function TableJobsHeader() {
    return (
        <tr class="bg-green-600 text-white text-left border">
            <th class="w-10 text-center">
                <input type="checkbox" class="h-4 w-4" />
            </th>
            <th class="py-4 px-4 w-64">JOBS</th>
        </tr>
    );
}





class ChevronToggle extends Component {
    constructor(props) {
        super(props);
        this.handleClosedMenu = this.handleClosedMenu.bind(this);
        this.handleOpenedMenu = this.handleOpenedMenu.bind(this);
        this.state = { isOpen: false };
    }

    handleClosedMenu() {
        this.setState({ isOpen: false });
    }

    handleOpenedMenu() {
        this.setState({ isOpen: true});
    }

    render() {
        const btnClass = "p-2 text-white opacity-80 hover:opacity-100 focus:outline-none";
        const theme = this.state.currentTheme;

        if (this.state.isOpen) {
            return (
                <button onClick={this.handleClosedMenu} className={btnClass}>
                    <ChevronDown/>
                </button>
            );
        } else {
            return (
                <button onClick={this.handleOpenedMenu} className={btnClass}>
                    <ChevronRight/>
                </button>
            );
        }
    }
}