import { Component, PureComponent } from "react";
import { ChevronRight, ChevronDown } from "react-feather";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
var randomColor = require('randomcolor');


export default function ResultSummary() {
    return (
        <div className="px-5 py-3">
            <div className="container mx-auto px-5">
                <div className="grid grid-cols-2 space-x-5">
                    <div className="space-y-5">
                        <Table tableHeader={<TableTestName />}>
                            <Table tableName="Sous Menu1" subMenu={true} tableHeader={<TableTestNameUserArgs />}>{TableTestNameUserArgsValue()}</Table>
                            <Table tableName="Sous Menu2" subMenu={true} tableHeader={<TableTestNameOutput />}>{TableTestNameOutputValue()}</Table>
                            <Table tableName="Sous Menu2" subMenu={true} tableHeader={<TableTestCsv />}>{TableTestCsvValue()}</Table>
                        </Table>

                        <Table tableHeader={<TableTestName />}></Table>
                    </div>
                    <div>
                        <Table tableHeader={<TableJobsName />}>
                            <TableJobs />
                        </Table>
                    </div>
                </div>

            </div>
        </div >
    );
}

class Table extends Component {
    constructor(props) {
        super(props);
        this.onVisibilityChange = this.onVisibilityChange.bind(this)
        this.state = { isReduced: false }
    }

    onVisibilityChange() {
        this.setState({ isReduced: !this.state.isReduced });
    }

    render() {
        const subMenu = this.props.subMenu

        if (!subMenu) {
            return (

                <div className="flex-none rounded shadow-lg bg-white">
                    <div className="bg-blue-ovh-light h-1 rounded-t" />
                    <div className="font-bold py-3 border-b">
                        <TableHeader tableHeader={this.props.tableHeader} isReduced={this.state.isReduced} callbackHandler={this.onVisibilityChange} />
                    </div>
                    {
                        !this.state.isReduced &&
                        <div>
                            {this.props.children}
                        </div>
                    }
                </div>
            )
        }
        else
            return (

                <div className="py-1 border-b">
                    <div>
                        <TableHeader tableHeader={this.props.tableHeader} isReduced={this.state.isReduced} callbackHandler={this.onVisibilityChange} />
                    </div>
                    {
                        !this.state.isReduced &&
                        <div className="">
                            {this.props.children}
                        </div>
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
        const btnClass = "outline-offset-none outline-none align-bottom";
        const isReduced = this.props.isReduced;

        if (isReduced) {
            return (
                <div className="flex px-5">
                    <button onClick={this.onClickHandler} className={btnClass}>
                        <ChevronRight />
                    </button>
                    {this.props.tableHeader}
                </div>
            );
        } else {
            return (
                <div className="flex px-5">
                    <button onClick={this.onClickHandler} className={btnClass}>
                        <ChevronDown />
                    </button>
                    {this.props.tableHeader}
                </div>
            );
        }

    }
}

//CONTENT FOR TEST NAME TABLE
function TableTestName(props) {
    return (
        <div>{props.title || "FIO Test Name"}</div>
    );
}

function TableTestNameUserArgs(props) {
    return (
        <div>{props.title || "User Args"}</div>
    );
}
function TableTestNameUserArgsValue() {
    return (
        <div className="px-5 text-xs">
            ./fio-webviewer.sh --webviewer-tag FIO-READ-WRITE --webviewer-name FIO-TESTRW --name=randwrite --iodepth=1 --rw=randwrite --bs=4k --direct=0 --size=512M --numjobs=2 --runtime=240 --output=~/fioviewer/test.txt
        </div>
    );
}
function TableTestNameOutput(props) {
    return (
        <div>{props.title || "Output"}</div>
    );
}
function TableTestNameOutputValue() {
    return (
        <div flex-none className="px-5 text-xs ">
            randread: (g=0): rw=randread, bs=(R) 4096B-4096B, (W) 4096B-4096B, (T) 4096B-4096B, ioengine=psync, iodepth=16
            ...
            fio-3.8
            Starting 4 processes
            randread: Laying out IO file (1 file / 512MiB)
            randread: Laying out IO file (1 file / 512MiB)
            randread: Laying out IO file (1 file / 512MiB)
            randread: Laying out IO file (1 file / 512MiB)

        </div>
    );
}
function TableTestCsv(props) {
    return (
        <div>{props.title || "CSV"}</div>
    );
}
function TableTestCsvValue() {
    return (
        <div flex-none className="px-5 text-s  text-blue-ovh-light underline hover:text-blue-ovh-dark ">
            <a href="https://guigui.io/" >Download all as tar.gz</a>
        </div>
    );
}

//CONTENT FOR 
function TableJobsName(props) {
    return (
        <div>{props.title || "Jobs"}</div>
    );
}



const data = [
    {
        name: '0',
        uv: 4000,
        pv: 2400,
        amt: 2400,
        average: 800,
    },
    {
        name: '1',
        uv: 3000,
        pv: 1398,
        amt: 2210,
        average: 300,
    },
    {
        name: '2',
        uv: 2000,
        pv: 9800,
        amt: 2290,
        average: 945,
    },
    {
        name: '3',
        uv: 2780,
        pv: 3908,
        amt: 2000,
        average: 1450,
    },
    {
        name: '4',
        uv: 1890,
        pv: 4800,
        amt: 2181,
        average: 289,
    },
    {
        name: '5',
        uv: 2390,
        pv: 3800,
        amt: 2500,
        average: 789,
    },
    {
        name: '6',
        uv: 3490,
        pv: 4300,
        amt: 2100,
        average: 987,
    },
];


function RandomColor(){
    return randomColor({
        luminosity: 'bright',
        hue: 'random',
    })
}

const testNamesList = [
    { id: 'average', color: RandomColor(), activated:true, },
    { id: 'uv', color: RandomColor(), activated:true, },
    { id: 'pv', color: RandomColor(), activated:true, },
];


class TableJobs extends Component {
    constructor(props) {
        super(props);
        this.data = data;
        this.testNamesList = testNamesList;
    }

    render() {

        const ActivatedTests = testNamesList;

        return (
            <div className="grid grid-cols-4 auto-layout">
                <div className="col-span-1 border-r-2 ">

                {this.testNamesList.map((testName) => {
                            return (
                               <div>{testName.id}</div> 
                            );
                        })}                   


                </div>
                <div className="col-span-3">
                    <Graph testNamesList={ActivatedTests} title="bw" data={data} xLabel="MB/s" />
                    <Graph testNamesList={ActivatedTests} title="iops" data={data} xLabel="iops" />
                    <Graph testNamesList={ActivatedTests} title="lat" data={data} xLabel="ms" />
                    <Graph testNamesList={ActivatedTests} title="slat" data={data} xLabel="ms" />
                    <Graph testNamesList={ActivatedTests} title="clat" data={data} xLabel="ms" />
                </div>
            </div>
        );
    }

}





class Graph extends PureComponent {
    constructor(props) {
        super(props);
        this.data = data;
        this.testNamesList = testNamesList;
    }
    static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';
    render() {
        return (
            <div className="h-60 p-5" >
                <div className="text-center">
                    {this.props.title}
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={this.props.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" label={this.props.xLabel} />
                        <YAxis label="t|s]" />
                        <Tooltip />
                        <Legend />
                        {this.testNamesList.map((testName) => {
                            if(testName.activated) {
                                return (<Line type="linear" dataKey={testName.id} stroke={testName.color} activeDot={{ r: 5 }} />);
                            }
                        })}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
