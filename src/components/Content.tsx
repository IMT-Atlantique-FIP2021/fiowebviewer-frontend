import ResultListTest from "../assets/resultList.json";
import ResultExplorer from './ResultExplorer'

export default function Content() {
    return (
        <div id="CONTENT" className="mt-5">
            <div className="container mx-auto px-5">
                <ResultExplorer results={ResultListTest}/>
            </div>
        </div>
    );
}
