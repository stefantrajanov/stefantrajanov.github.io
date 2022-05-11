const buttontxt = "View Project"

const slideData = [
    {
        index: 0,
        headline: 'Sintehno',
        button: buttontxt,
        link: 'https://sintehno.com.mk/',
        src: '/images/Car.png'
    },
    {
        index: 1,
        headline: 'University',
        button: buttontxt,
        link: 'https://sintehno.com.mk/',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg'
    },
    {
        index: 2,
        headline: 'University',
        button: buttontxt,
        link: 'https://sintehno.com.mk/',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg'
    },
    {
        index: 3,
        headline: 'University',
        button: buttontxt,
        link: 'https://sintehno.com.mk/',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg'
    }
]


// =========================
// Slide
// =========================

class Slide extends React.Component {
    constructor(props) {
        super(props)

        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleSlideClick = this.handleSlideClick.bind(this)
        this.imageLoaded = this.imageLoaded.bind(this)
        this.slide = React.createRef()
    }

    handleMouseMove(event) {
        const el = this.slide.current
        const r = el.getBoundingClientRect()

        el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)))
        el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)))
    }

    handleMouseLeave(event) {
        this.slide.current.style.setProperty('--x', 0)
        this.slide.current.style.setProperty('--y', 0)
    }

    handleSlideClick(event) {
        this.props.handleSlideClick(this.props.slide.index)
    }

    imageLoaded(event) {
        event.target.style.opacity = 1
    }
    // onButtonClicked(event) {
    //     var win = window.open(slideData.link, '_blank')
    //     win.focus()
    // }

    render() {
        const { src, link, button, headline, index } = this.props.slide
        const current = this.props.current
        let classNames = 'slide'

        if (current === index) classNames += ' slide--current'
        else if (current - 1 === index) classNames += ' slide--previous'
        else if (current + 1 === index) classNames += ' slide--next'

        return (
            <li
                ref={this.slide}
                className={classNames}
                onClick={this.handleSlideClick}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
            >
                <div className="slide__image-wrapper" >
                    <img
                        className="slide__image"
                        alt={headline}
                        src={src}
                        onLoad={this.imageLoaded}
                    />
                </div>

                <article className="slide__content">
                    <button className="slide__action reactCybr-btn" data-aos="fade-in" data-aos-duration="2000">
                        <span aria-hidden class="reactCybr-btn__glitch">{button}</span>
                        <a href={link} target="_blank">{button}</a></button>
                </article>
            </li>
        )
    }
}


// =========================
// Slider control
// =========================

const SliderControl = ({ type, title, handleClick }) => {
    return (
        <button className={`btn btn--${type}`} title={title} onClick={handleClick}>
            <svg className="icon" viewBox="0 0 24 24">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
        </button>
    )
}


// =========================
// Slider
// =========================

class Slider extends React.Component {
    constructor(props) {
        super(props)

        this.state = { current: 0 }
        this.handlePreviousClick = this.handlePreviousClick.bind(this)
        this.handleNextClick = this.handleNextClick.bind(this)
        this.handleSlideClick = this.handleSlideClick.bind(this)
    }

    handlePreviousClick() {
        const previous = this.state.current - 1

        this.setState({
            current: (previous < 0)
                ? this.props.slides.length - 1
                : previous
        })
    }

    handleNextClick() {
        const next = this.state.current + 1;

        this.setState({
            current: (next === this.props.slides.length)
                ? 0
                : next
        })
    }

    handleSlideClick(index) {
        if (this.state.current !== index) {
            this.setState({
                current: index
            })
        }
    }

    render() {
        const { current, direction } = this.state
        const { slides, heading } = this.props
        const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`
        const wrapperTransform = {
            'transform': `translateX(-${current * (100 / slides.length)}%)`
        }

        return (
            <div className='slider' aria-labelledby={headingId}>
                <ul className="slider__wrapper" style={wrapperTransform}>
                    <h3 id={headingId} class="visuallyhidden">{heading}</h3>

                    {slides.map(slide => {
                        return (
                            <Slide
                                key={slide.index}
                                slide={slide}
                                current={current}
                                handleSlideClick={this.handleSlideClick}
                            />
                        )
                    })}
                </ul>
            </div>
        )
    }
}


ReactDOM.render(<Slider heading="Example Slider" slides={slideData} />, document.getElementById('app'));