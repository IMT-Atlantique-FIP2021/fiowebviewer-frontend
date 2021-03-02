import { Component, FC, PureComponent, ReactNode } from "react";
import { ChevronRight, ChevronDown } from "react-feather";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, XAxisProps } from 'recharts';
import testData from "../assets/testList.json"

var randomColor = require('randomcolor');


export default function ResultSummary() {
    return (
        <div className="px-5 py-3">
            <div className="container mx-auto px-5">
                <div className="grid grid-cols-2 space-x-5">
                    <div className="space-y-5">
                        <Table tableName="FIO Test Name">
                            <Table tableName="FIO user args" subMenu>{TableTestNameUserArgsValue()}</Table>
                            <Table tableName="Output" subMenu>{TableTestNameOutputValue()}</Table>
                            <Table tableName="CSV" subMenu>{TableTestCsvValue()}</Table>
                        </Table>

                        <Table tableName="User Args"></Table>
                    </div>
                    <div>
                        <Table tableName="Jobs">
                            <TableJobs />
                        </Table>
                    </div>
                </div>

            </div>
        </div >
    );
}

type TableProps = {
    subMenu?: boolean,
    tableName: string,
}

class Table extends Component<TableProps> {
    state: { isReduced: boolean };
    subMenu: boolean;
    tableName: string;

    constructor(props: TableProps) {
        super(props);
        this.onVisibilityChange = this.onVisibilityChange.bind(this);
        this.subMenu = props.subMenu || false;
        this.state = { isReduced: false };
        this.tableName = this.props.tableName || "";

    }

    onVisibilityChange() {
        this.setState({ isReduced: !this.state.isReduced });
    }

    render() {
        if (!this.subMenu) {  // FIXME
            return (
                <div className="flex-none rounded shadow-lg bg-white">
                    <div className="bg-blue-ovh-light h-1 rounded-t" />
                    <div className="font-bold py-3 border-b">
                        {TableHeader(this.tableName, this.state.isReduced, this.onVisibilityChange)}
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
                        {TableHeader(this.tableName, this.state.isReduced, this.onVisibilityChange)}
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
}

function TableHeader(tableName: string, isReduced: boolean, callbackHandler: any) {
    return (
        <div className="flex px-5">
            <button onClick={callbackHandler} className="align-bottom">
                {isReduced ? <ChevronRight /> : <ChevronDown />}
            </button>
            {tableName}
        </div>
    )
}


function TableTestNameUserArgsValue() {
    return (
        <div className="px-5 text-xs">
            ./fio-webviewer.sh --webviewer-tag FIO-READ-WRITE --webviewer-name FIO-TESTRW --name=randwrite --iodepth=1 --rw=randwrite --bs=4k --direct=0 --size=512M --numjobs=2 --runtime=240 --output=~/fioviewer/test.txt
        </div>
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

function TableTestCsvValue() {
    return (
        <div flex-none className="px-5 text-s  text-blue-ovh-light underline hover:text-blue-ovh-dark ">
            <a href="https://guigui.io/" >Download all as tar.gz</a>
        </div>
    );
}

//CONTENT FOR Jobs Table
function TableJobsName(props: any) {
    return (
        <div>{props.title || "Jobs"}</div>
    );
}

function RandomColor() {
    return randomColor({
        luminosity: 'bright',
        hue: 'random',
    })
}

type testListType = {
    id: string
    color: string, 
    activated: boolean
}

const testList: testListType[] = [
    { id: "average", color: RandomColor(), activated: true },
    { id: "uv", color: RandomColor(), activated: true },
    { id: "pv", color: RandomColor(), activated: true },
    { id: "amt", color: RandomColor(), activated: true }
];

//Define the Table Jobs Content
class TableJobs extends Component {
    state: {
        data: unknown[],
        activatedValue: testListType[],
    }

    constructor(props: any) {
        super(props);
        this.state = this.initState();
    }

    initState() {
        return { data: testData, activatedValue: testList };
    }

    handleOnChange(id: string) {
        console.log("CLICK ON " + id)
        
        let newActivatedValue: testListType[] = this.state.activatedValue;
        newActivatedValue.filter((obj) => (obj.id === id)).map((obj) => (obj.activated = !obj.activated))
        console.log(newActivatedValue)

        this.setState({...this.state, activatedValue: newActivatedValue })
    }

    render() {
        return (
            <div className="grid grid-cols-4 auto-layout">
                <div className="col-span-1 border-r-2 p-2">

                    {this.state.activatedValue.map((test) => {
                        const id_input="RE_TestResult_Cb_" + test.id;
                        return (
                            <div>
                                <input id={test.id} checked={test.activated} type="checkbox" className="rounded ml-2 mr-2" onChange={this.handleOnChange.bind(this, test.id)}/>
                                <label htmlFor={test.id}>{test.id}</label>
                            </div>
                        );
                    })
                    }
                </div>
                <div className="col-span-3">
                    <Graph testList={this.state.activatedValue} data={this.state.data} title="bw" xLabel="MB/s" />
                    <Graph testList={this.state.activatedValue} data={this.state.data} title="iops" xLabel="iops" />
                    <Graph testList={this.state.activatedValue} data={this.state.data} title="lat" xLabel="ms" />
                    <Graph testList={this.state.activatedValue} data={this.state.data} title="slat" xLabel="ms" />
                    <Graph testList={this.state.activatedValue} data={this.state.data} title="clat" xLabel="ms" />
                </div>
            </div>
        );
    }

}

type GraphProps = {
    title: string;
    xLabel: XAxisProps["label"];
    data: any;          // FIXME
    testList: any;      // FIXME
}

function Graph(props: GraphProps) {
    return (
        <div className="h-60 p-5" >
                <div className="text-center">
                    {props.title}
                </div>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={props.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" label={props.xLabel} />
                        <YAxis label="t|s]" />
                        <Tooltip />
                        <Legend />
                        {props.testList.map((testName: any) => {
                            if (testName.activated) {
                                return (<Line type="linear" dataKey={testName.id} stroke={testName.color} activeDot={{ r: 5 }} />);
                            }
                        })}
                    </LineChart>
                </ResponsiveContainer>
            </div>
    )
}
