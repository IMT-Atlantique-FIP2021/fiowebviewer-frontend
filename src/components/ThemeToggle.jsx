import { Component } from "react";
import { Moon, Sun } from "react-feather";

export default class ThemeToggle extends Component {
    constructor(props) {
        super(props);
        this.handleLightModeClick = this.handleLightModeClick.bind(this);
        this.handleDarkModeClick = this.handleDarkModeClick.bind(this);
        this.state = { currentTheme: "light" };
    }

    handleLightModeClick() {
        this.setState({ currentTheme: "light" });
    }

    handleDarkModeClick() {
        this.setState({ currentTheme: "dark" });
    }

    render() {
        const btnClass = "p-2 text-white opacity-80 hover:opacity-100 focus:outline-none transition duration-500 ease-in-out transform hover:-rotate-180";
        const theme = this.state.currentTheme;

        if (theme === "light") {
            return (
                <button onClick={this.handleDarkModeClick} className={btnClass}>
                    <Sun />
                </button>
            );
        } else {
            return (
                <button onClick={this.handleLightModeClick} className={btnClass}>
                    <Moon />
                </button>
            );
        }
    }
}
