class LocationDropDown extends Component {
    state = {
        locations: [],
        selectedLocation: "",
        validationError: ""
    };

    componentDidMount() {
        fetch("https://localhost:44349/api/HVACEquipmentLocations")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let locationsFromApi = data.map(location => {
                    return { value: location, display: location }
                });
                this.setState({
                    location: [{ value: '', display: '(Select the location of your item)' }].concat(locationsFromApi)
                });
            }).catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <select
                    value={this.state.selectedLocation}
                    onChange={e => this.setState({ selectedLocation: e.target.value, validationError: e.target.value === "" ? "You must select a location" : "" })}
                >
                    {this.state.locations.map((location) => <option key={location.LocationId} value={team.LocationName}>{location.Province}</option>)}
                </select>


                <div style={{ color: 'red', marginTop: '5px' }}>
                    {this.state.validationError}
                </div>
            </div >
        )
    }
}