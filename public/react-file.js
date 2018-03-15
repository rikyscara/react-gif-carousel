class Gifs extends React.Component {

  constructor() {
    super();
    this.state = {
      // instanciate states
      isLoading: false,
      gifs: [],
      index: 0,
      limit: 10,
      maxGifSize: 100000,
    };
  }
  fetchGifs = () => {
    // after loading of component
    fetch('API/giphy-connect.php?limit=' + this.state.limit + '&size=' + this.state.maxGifSize,
      {
        method: 'GET',
      }
    ).then(result => {
      return result.json()
    }).then(data => {
      let gifs = data.map(function (gif, index) {
        return (

          <div className="carousel-item active" key={index}>
            <video loop autoPlay>
              <source src={gif} type="video/mp4" />
            </video>
          </div>

        )
      });
      this.setState({
        isLoading: false,
        gifs: gifs,
      });
      console.log("gifs", this.state.gifs);
    })
      .catch((error) => {
        console.error(error);
      });
  }

  goToPrevSlide(e) {
    e.preventDefault();

    let index = this.state.index;
    --index;

    this.setState({
      index: index
    });
  }

  goToNextSlide(e) {
    e.preventDefault();

    let index = this.state.index;
    /* let { slides } = this.props; */
    /* let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    } */

    ++index;

    this.setState({
      index: index
    });
  }

  componentWillMount() {
    // preloading
    this.setState({
      isLoading: true,
    });
  }

  componentDidMount() {
    this.fetchGifs();
  }

  render() {

    const isLoading = this.state.isLoading;
    const arrowLeft = this.state.index == 0 || isLoading ? '' : (
      <a
        href="#"
        className="carousel__arrow carousel__arrow--left"
        onClick={e => this.goToPrevSlide(e)}
      >
        <span className="fa fa-2x fa-angle-left" />
      </a>
    );
    const arrowRight = this.state.index == this.state.limit - 1 || isLoading ? '' : (
      <a
        href="#"
        className="carousel__arrow carousel__arrow--right"
        onClick={e => this.goToNextSlide(e)}
      >
        <span className="fa fa-2x fa-angle-right" />
      </a>
    );
    const headerText = (
      <div className="header__text">
        {isLoading ? 'Your gifs are loading' : 'Here\'s a gifs carousel'}
      </div>
    );
    const loadingGif = <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' alt='Loading gifs...' />;

    return (

      <div className="carousel">
        {headerText}
        {arrowLeft}
        <div className="carousel__slide">
          {isLoading ? loadingGif : ''}
          {this.state.gifs[this.state.index]}
        </div>
        {arrowRight}
      </div>

    );
  }
}

ReactDOM.render(
  <Gifs />,
  document.getElementById('root')
);