var Header = React.createClass({
    render: function () {

        var catNameList = this.props.listItems.map(function (e, i) {
            var url = "#" + this.props.makeID(e);
            return (<li key={i}><a href={url}>{e}</a></li>)
        }.bind(this));

        return (
            <div className="Header">
                <h3>
                    Catspage
                </h3>
                <ul>
                    {catNameList}
                </ul>
            </div>
        )
    }
});

var Panel1 = React.createClass({
    render: function () {
        return (
            <div className="Panel1">
                <h3>
                    All about cats
                </h3>
            </div>
        )
    }
});


var Cat = React.createClass({

    render: function () {

        return (
            <div className="CatContainer">
                <div className="Cat" id={this.props.id}>
                    <h1>
                        {this.props.type}
                    </h1>
                    <img src={this.props.imgUrl} width="300" alt=""/>

                    <p>{this.props.description}</p>
                </div>
            </div>
        )
    }
});

var Footer = React.createClass({
    render: function () {
        return (
            <div className="Footer">Footer here</div>
        )
    }
});

var Main = React.createClass({

    getInitialState: function () {
        return {
            catNameList: [],
            catIdsList: [],
            catData: []
        }
    },

    setCatList: function () {
        $.getJSON('catsDetails.json', function (data) {

            var arr = [];
            var datArr = [];

            data.forEach(function (e) {
                arr.push(e.type);
                datArr.push(e);
            });

            this.setState({
                catNameList: arr,
                catData: datArr
            });

        }.bind(this));
        //
        //this.state.catData.forEach(function (e, i) {
        //    e.id = e.type;
        //});

    },

    componentDidMount: function () {
        this.setCatList();
    },

    makeID: function (str) {
        return str.toLowerCase().replace(/ /g, '');
    },

    render: function () {
        console.log('data:', this.state.catData);

        var cats = this.state.catData.map(function (e, i) {
            return <Cat id={this.makeID(e.type)} type={e.type} imgUrl={e.imgUrl} description={e.description} key={i}/>
        }.bind(this));

        return (
            <div className="Main">
                <Header listItems={this.state.catNameList} makeID={this.makeID}/>
                <Panel1 />
                {cats}
                <Footer />
            </div>
        )
    }
});

ReactDOM.render(<Main/>, document.getElementById('root'));
